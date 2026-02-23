# ClawBox Benchmarks

Reproducible cost and latency benchmarks comparing routing strategies.

## Quick Start

```bash
# Ensure CheapRouter is running in demo mode
cd packages/cheaprouter && npm start &

# Run all benchmarks
python benchmarks/run_bench.py --requests 500

# Results saved to benchmarks/reports/
```

## Scenarios

| Scenario | Description |
|---|---|
| `baseline` | All requests to a single premium model (Claude Opus @ $5/$25 per M tokens) |
| `eco` | ClawRouter eco profile: cheapest capable model per tier |
| `auto` | ClawRouter auto profile: balanced cost/quality |
| `model_mix` | Realistic workload distribution with smart tier routing |

## How It Works

The benchmark runner simulates a mix of simple, medium, complex, and reasoning requests. Each scenario applies different pricing based on ClawRouter's published model rates. Cost is calculated from token counts and per-model pricing.

## Disclaimer

> Cost savings of up to 90% are achievable in certain workloads with specific routing
> policies and model mixes. Results vary based on traffic patterns, model availability,
> and query complexity.

## Using Real Pricing

1. Edit files in `scenarios/` with current model prices from your provider
2. Set `DEMO_MODE=false` and configure real provider access
3. Run benchmarks against live CheapRouter endpoint:

```bash
CHEAPROUTER_URL=http://localhost:4000 python benchmarks/run_bench.py
```

## Output Format

Each scenario produces:
- `reports/<scenario>.json` -- detailed metrics
- `reports/benchmark-report.md` -- human-readable comparison table
