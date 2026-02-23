---
sidebar_position: 5
---

# Routing Strategies

ClawBox uses [ClawRouter's](https://github.com/BlockRunAI/ClawRouter) 14-dimension weighted scorer to intelligently route each request to the optimal model.

## How Routing Works

When a request arrives, ClawRouter analyzes it locally (no external API calls) across 14 dimensions:

1. **Reasoning markers** — keywords indicating chain-of-thought needs
2. **Code presence** — code blocks or programming keywords
3. **Math complexity** — mathematical expressions and symbols
4. **Creative writing** — literary or creative indicators
5. **Language** — multilingual detection
6. **Token count** — input length
7. **Structured output** — JSON/YAML requirements
8. **System prompt complexity** — instruction density
9. And 6 more dimensions...

Each dimension is weighted and scored, producing a tier classification:

| Tier | Score Range | Example Tasks |
|---|---|---|
| **SIMPLE** | < 0.3 | Greetings, simple lookups, translations |
| **MEDIUM** | 0.3 - 0.6 | Code generation, explanations, summaries |
| **COMPLEX** | 0.6 - 0.8 | Architecture design, multi-step analysis |
| **REASONING** | > 0.8 | Mathematical proofs, logic puzzles, deep analysis |

## Routing Profiles

### Eco (Maximum Savings)

Routes every request to the cheapest capable model per tier.

| Tier | Model | Input $/M | Output $/M |
|---|---|---|---|
| SIMPLE | gpt-oss-120b | FREE | FREE |
| MEDIUM | gemini-2.5-flash-lite | $0.10 | $0.40 |
| COMPLEX | gemini-2.5-flash-lite | $0.10 | $0.40 |
| REASONING | grok-4-fast | $0.20 | $0.50 |

### Auto (Balanced) — Default

Balances cost and quality. Best for general-purpose use.

| Tier | Model | Input $/M | Output $/M |
|---|---|---|---|
| SIMPLE | kimi-k2.5 | $0.60 | $3.00 |
| MEDIUM | grok-code-fast | $0.20 | $1.50 |
| COMPLEX | gemini-3.1-pro | $2.00 | $12.00 |
| REASONING | grok-4-fast | $0.20 | $0.50 |

### Premium (Best Quality)

Always uses the highest-quality model. No cost optimization.

| Tier | Model | Input $/M | Output $/M |
|---|---|---|---|
| All tiers | claude-opus-4.5 | $5.00 | $25.00 |

### Free (Zero Cost)

Only uses free-tier models.

| Tier | Model | Cost |
|---|---|---|
| All tiers | gpt-oss-120b | FREE |

## Switching Profiles

### Via API Header

Set the routing profile per-request:

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "blockrun/eco", "messages": [...]}'
```

### Via Fleet Configuration

Push a routing profile to a device remotely:

```bash
curl -X PUT http://localhost:4100/api/config/my-clawbox-001 \
  -H "Content-Type: application/json" \
  -d '{"routingProfile": "eco"}'
```

## Fallback Behavior

If the selected model fails (429, 500, timeout), ClawRouter automatically tries the next model in the fallback chain. See [Auto Failover](/docs/auto-failover) for details.
