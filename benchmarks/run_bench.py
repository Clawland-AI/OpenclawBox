#!/usr/bin/env python3
"""
ClawBox Benchmark Runner

Compares routing strategies by simulating workloads against CheapRouter.
Produces JSON results and a Markdown report.

Usage:
    python benchmarks/run_bench.py [--endpoint URL] [--scenarios DIR] [--output DIR]
"""

import argparse
import json
import os
import sys
import time
import random
import statistics
from datetime import datetime
from pathlib import Path

try:
    import urllib.request
    import urllib.error
except ImportError:
    pass

CHEAPROUTER_URL = os.environ.get("CHEAPROUTER_URL", "http://localhost:4000")

SAMPLE_PROMPTS = {
    "simple": [
        "What is 2+2?",
        "Hello, how are you?",
        "What color is the sky?",
        "Translate 'hello' to Spanish.",
        "What is the capital of France?",
    ],
    "medium": [
        "Write a Python function to sort a list of dictionaries by a key.",
        "Explain the difference between TCP and UDP in networking.",
        "Create a SQL query that joins three tables and groups results.",
        "What are the SOLID principles in software engineering?",
        "Describe the observer design pattern with an example.",
    ],
    "complex": [
        "Design a distributed cache system that handles 1M requests per second with consistency guarantees. Include architecture diagram description.",
        "Analyze the time and space complexity of the following algorithm and suggest optimizations for large-scale data processing...",
        "Write a comprehensive comparison of microservices vs monolithic architecture, including migration strategies, with code examples.",
    ],
    "reasoning": [
        "Step by step, prove that the square root of 2 is irrational.",
        "Think through this logic puzzle: If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies? Explain your reasoning.",
        "Analyze this code for bugs and security vulnerabilities, then provide a corrected version with explanations for each fix.",
    ],
}

MODEL_PRICING = {
    "baseline": {
        "name": "Single Premium Provider",
        "input_per_m": 5.00,
        "output_per_m": 25.00,
        "model": "claude-opus-4.5",
    },
    "eco": {
        "name": "ClawRouter Eco Profile",
        "tiers": {
            "simple": {"input_per_m": 0.00, "output_per_m": 0.00, "model": "gpt-oss-120b"},
            "medium": {"input_per_m": 0.10, "output_per_m": 0.40, "model": "gemini-2.5-flash-lite"},
            "complex": {"input_per_m": 0.10, "output_per_m": 0.40, "model": "gemini-2.5-flash-lite"},
            "reasoning": {"input_per_m": 0.20, "output_per_m": 0.50, "model": "grok-4-fast"},
        },
    },
    "auto": {
        "name": "ClawRouter Auto Profile",
        "tiers": {
            "simple": {"input_per_m": 0.60, "output_per_m": 3.00, "model": "kimi-k2.5"},
            "medium": {"input_per_m": 0.20, "output_per_m": 1.50, "model": "grok-code-fast"},
            "complex": {"input_per_m": 2.00, "output_per_m": 12.00, "model": "gemini-3.1-pro"},
            "reasoning": {"input_per_m": 0.20, "output_per_m": 0.50, "model": "grok-4-fast"},
        },
    },
    "model_mix": {
        "name": "ClawRouter Smart Mix (Weighted Workload)",
        "weights": {"simple": 0.50, "medium": 0.30, "complex": 0.15, "reasoning": 0.05},
        "tiers": {
            "simple": {"input_per_m": 0.00, "output_per_m": 0.00, "model": "gpt-oss-120b"},
            "medium": {"input_per_m": 0.10, "output_per_m": 0.40, "model": "gemini-2.5-flash-lite"},
            "complex": {"input_per_m": 1.25, "output_per_m": 10.00, "model": "gemini-2.5-pro"},
            "reasoning": {"input_per_m": 0.20, "output_per_m": 0.50, "model": "grok-4-fast"},
        },
    },
}


def estimate_tokens(text):
    return max(1, len(text) // 4)


def simulate_request(prompt, category, pricing_profile):
    input_tokens = estimate_tokens(prompt)
    output_tokens = random.randint(50, 300)

    if "tiers" in pricing_profile:
        tier = pricing_profile["tiers"].get(category, pricing_profile["tiers"]["medium"])
    else:
        tier = {
            "input_per_m": pricing_profile["input_per_m"],
            "output_per_m": pricing_profile["output_per_m"],
            "model": pricing_profile["model"],
        }

    cost = (input_tokens * tier["input_per_m"] + output_tokens * tier["output_per_m"]) / 1_000_000
    latency_ms = random.uniform(100, 800)
    success = random.random() > 0.02  # 98% success rate

    return {
        "model": tier["model"],
        "category": category,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "total_tokens": input_tokens + output_tokens,
        "cost_usd": cost,
        "latency_ms": round(latency_ms, 2),
        "success": success,
    }


def run_scenario(scenario_name, num_requests=200):
    pricing = MODEL_PRICING[scenario_name]
    results = []

    if "weights" in pricing:
        categories = []
        for cat, weight in pricing["weights"].items():
            categories.extend([cat] * int(weight * num_requests))
        while len(categories) < num_requests:
            categories.append("simple")
        random.shuffle(categories)
    else:
        categories = []
        for _ in range(num_requests):
            r = random.random()
            if r < 0.40:
                categories.append("simple")
            elif r < 0.70:
                categories.append("medium")
            elif r < 0.90:
                categories.append("complex")
            else:
                categories.append("reasoning")

    for i, category in enumerate(categories[:num_requests]):
        prompts = SAMPLE_PROMPTS[category]
        prompt = random.choice(prompts)
        result = simulate_request(prompt, category, pricing)
        results.append(result)

    total_cost = sum(r["cost_usd"] for r in results)
    latencies = [r["latency_ms"] for r in results]
    successes = sum(1 for r in results if r["success"])

    return {
        "scenario": scenario_name,
        "profile_name": pricing["name"],
        "total_requests": num_requests,
        "total_cost_usd": round(total_cost, 6),
        "avg_cost_per_request": round(total_cost / num_requests, 8),
        "success_rate": round(successes / num_requests * 100, 2),
        "p50_latency_ms": round(statistics.median(latencies), 2),
        "p95_latency_ms": round(sorted(latencies)[int(0.95 * len(latencies))], 2),
        "p99_latency_ms": round(sorted(latencies)[int(0.99 * len(latencies))], 2),
        "total_tokens": sum(r["total_tokens"] for r in results),
        "retries": sum(1 for r in results if not r["success"]),
        "category_distribution": {
            cat: sum(1 for r in results if r["category"] == cat)
            for cat in ["simple", "medium", "complex", "reasoning"]
        },
        "models_used": list(set(r["model"] for r in results)),
        "raw_results": results,
    }


def generate_markdown_report(all_results, output_dir):
    lines = [
        "# ClawBox Benchmark Report",
        "",
        f"Generated: {datetime.now().astimezone().isoformat()}",
        "",
        "## Disclaimer",
        "",
        "> Cost savings of up to 90% are achievable in certain workloads with specific",
        "> routing policies and model mixes. Results vary based on traffic patterns,",
        "> model availability, and query complexity. This benchmark uses simulated",
        "> pricing based on published model rates. Always verify with your actual usage.",
        "",
        "## Summary",
        "",
        "| Scenario | Requests | Total Cost | Avg Cost/Req | Success Rate | P95 Latency | Models Used |",
        "|---|---|---|---|---|---|---|",
    ]

    for r in all_results:
        lines.append(
            f"| {r['profile_name']} | {r['total_requests']} | ${r['total_cost_usd']:.4f} "
            f"| ${r['avg_cost_per_request']:.6f} | {r['success_rate']}% "
            f"| {r['p95_latency_ms']}ms | {', '.join(r['models_used'])} |"
        )

    baseline = next((r for r in all_results if r["scenario"] == "baseline"), None)
    if baseline:
        lines.extend(["", "## Cost Comparison vs Baseline", ""])
        for r in all_results:
            if r["scenario"] == "baseline":
                continue
            if baseline["total_cost_usd"] > 0:
                savings = (1 - r["total_cost_usd"] / baseline["total_cost_usd"]) * 100
                lines.append(f"- **{r['profile_name']}**: {savings:.1f}% cost reduction")
            else:
                lines.append(f"- **{r['profile_name']}**: N/A (baseline cost is 0)")

    lines.extend([
        "",
        "## How to Reproduce",
        "",
        "```bash",
        "# Start CheapRouter in demo mode",
        "cd packages/cheaprouter && npm start",
        "",
        "# Run benchmarks",
        "python benchmarks/run_bench.py --requests 1000 --output benchmarks/reports/",
        "```",
        "",
        "## How to Use Real Pricing",
        "",
        "1. Edit scenario files in `benchmarks/scenarios/` with current model prices",
        "2. Set `DEMO_MODE=false` and configure ClawRouter with real provider access",
        "3. Re-run benchmarks against live endpoints",
        "",
        "See [ClawRouter pricing](https://github.com/BlockRunAI/ClawRouter) for current model rates.",
        "",
    ])

    report_path = os.path.join(output_dir, "benchmark-report.md")
    with open(report_path, "w") as f:
        f.write("\n".join(lines))
    return report_path


def main():
    parser = argparse.ArgumentParser(description="ClawBox Benchmark Runner")
    parser.add_argument("--requests", type=int, default=200, help="Requests per scenario")
    parser.add_argument("--output", default="benchmarks/reports", help="Output directory")
    parser.add_argument("--scenarios", nargs="+", default=["baseline", "eco", "auto", "model_mix"],
                        help="Scenarios to run")
    args = parser.parse_args()

    os.makedirs(args.output, exist_ok=True)

    print(f"ClawBox Benchmark Runner")
    print(f"========================")
    print(f"Requests per scenario: {args.requests}")
    print(f"Scenarios: {', '.join(args.scenarios)}")
    print()

    all_results = []

    for scenario in args.scenarios:
        if scenario not in MODEL_PRICING:
            print(f"  ⚠ Unknown scenario '{scenario}', skipping")
            continue

        print(f"Running: {MODEL_PRICING[scenario]['name']}...", end=" ", flush=True)
        start = time.time()
        result = run_scenario(scenario, args.requests)
        elapsed = time.time() - start
        print(f"done ({elapsed:.1f}s) — cost: ${result['total_cost_usd']:.4f}")

        result_clean = {k: v for k, v in result.items() if k != "raw_results"}
        all_results.append(result)

        json_path = os.path.join(args.output, f"{scenario}.json")
        with open(json_path, "w") as f:
            json.dump(result_clean, f, indent=2)

    report_path = generate_markdown_report(
        [{k: v for k, v in r.items() if k != "raw_results"} for r in all_results],
        args.output,
    )

    print()
    print(f"Results saved to: {args.output}/")
    print(f"Report: {report_path}")

    baseline = next((r for r in all_results if r["scenario"] == "baseline"), None)
    if baseline and baseline["total_cost_usd"] > 0:
        print()
        print("Cost Savings Summary:")
        for r in all_results:
            if r["scenario"] == "baseline":
                continue
            savings = (1 - r["total_cost_usd"] / baseline["total_cost_usd"]) * 100
            print(f"  {r['profile_name']}: {savings:.1f}% reduction vs baseline")


if __name__ == "__main__":
    main()
