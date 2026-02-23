---
sidebar_position: 7
---

# Benchmarks

ClawBox includes reproducible benchmarks that demonstrate cost savings from intelligent routing.

## Disclaimer

> Cost savings of **up to 90%** are achievable in certain workloads with specific routing
> policies and model mixes. Results vary based on traffic patterns, model availability,
> and query complexity. Always verify with your actual usage patterns.

## Running Benchmarks

```bash
# Ensure CheapRouter is running
cd packages/cheaprouter && npm start &

# Run all benchmark scenarios
python benchmarks/run_bench.py --requests 500

# Results saved to benchmarks/reports/
```

## Scenarios

### 1. Baseline: Single Premium Provider

All requests sent to Claude Opus ($5/$25 per million tokens) regardless of complexity.

### 2. ClawRouter Eco Profile

Routes to cheapest capable model per tier. Simple queries go to free models.

### 3. ClawRouter Auto Profile

Balanced routing. Mid-tier for most tasks, premium for complex/reasoning only.

### 4. Smart Model Mix

Realistic workload: 50% simple, 30% medium, 15% complex, 5% reasoning. Demonstrates maximum savings when most traffic is simple queries (common in production).

## Sample Results

| Scenario | Total Cost (500 req) | Cost/Request | Savings vs Baseline |
|---|---|---|---|
| Baseline (Opus) | $1.8750 | $0.003750 | — |
| Eco Profile | $0.0312 | $0.000062 | 98.3% |
| Auto Profile | $0.2840 | $0.000568 | 84.9% |
| Smart Mix | $0.0156 | $0.000031 | 99.2% |

*Results from simulated benchmark with mock pricing. Actual results depend on real model availability and pricing.*

## How the Cost Math Works

**Baseline**: Every request costs $5/$25 per M tokens (Claude Opus pricing).

**Smart Mix**: 50% of requests are simple → free model ($0). 30% are medium → $0.10/$0.40 per M tokens. Only 20% use paid models. Weighted average cost drops dramatically.

## Interpreting Results

The benchmark report (`benchmarks/reports/benchmark-report.md`) includes:

- **Total cost** per scenario
- **Average cost per request**
- **Success rate** (should be ~98% with mock provider)
- **P95 latency**
- **Category distribution** (simple/medium/complex/reasoning)
- **Models used**

## Plugging Real Pricing

1. Edit scenario files in `benchmarks/scenarios/` with current prices from your provider
2. Set `DEMO_MODE=false` and configure real provider access via [ClawRouter](https://github.com/BlockRunAI/ClawRouter)
3. Re-run: `python benchmarks/run_bench.py --requests 1000`

## Customizing Workload Distribution

Edit `benchmarks/scenarios/clawrouter_model_mix.json` to match your actual traffic pattern:

```json
{
  "workload_weights": {
    "simple": 0.60,
    "medium": 0.25,
    "complex": 0.10,
    "reasoning": 0.05
  }
}
```

Higher simple-query ratios yield larger savings.
