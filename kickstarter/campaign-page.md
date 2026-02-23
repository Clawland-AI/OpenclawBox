# ClawBox — Your AI. Your Data. Your Device.

> A plug-and-play personal AI appliance that routes across 38+ models, auto-recovers from failures, and saves up to 90% on inference costs.

---

## The Problem

AI is powerful — but using it today is painful:

- **Expensive.** Premium models like Claude Opus cost $25 per million tokens. A busy developer burns through $100+/month easily.
- **Unreliable.** API outages, rate limits, and 429 errors happen weekly. Your app crashes when OpenAI goes down.
- **Privacy-invasive.** Every prompt goes through someone else's cloud. Your private data, your business logic, your conversations — all on third-party servers.
- **Fragmented.** Every provider has a different API, different pricing, different rate limits. Switching is a code rewrite.

You deserve an AI that's always on, always private, and always affordable.

---

## The Solution: ClawBox

ClawBox is a personal AI appliance that sits on your desk. Plug it in, scan the QR code on its touchscreen, and start talking to your AI.

One device. One API. 38+ models. Always on.

### How It Works

**Step 1 — Plug in.** Connect power and Ethernet (or WiFi). ClawBox boots in under 30 seconds.

**Step 2 — Scan.** The bar touchscreen displays a QR code. Scan it with your phone to pair instantly.

**Step 3 — Talk.** Send messages from any device, anywhere. ClawBox routes your request to the best model at the best price — automatically.

---

## Key Features

### Any Model, One API

ClawBox exposes a standard OpenAI-compatible endpoint. Any tool, library, or app that works with OpenAI works with ClawBox — zero code changes. Behind the scenes, ClawRouter's 14-dimension scorer routes each request to the optimal model across 38+ options from OpenAI, Anthropic, Google, DeepSeek, xAI, and more.

```python
from openai import OpenAI
client = OpenAI(base_url="http://clawbox.local:4000/v1", api_key="demo")
response = client.chat.completions.create(
    model="blockrun/auto",
    messages=[{"role": "user", "content": "Hello ClawBox!"}],
)
```

### Never Crash

Provider returns a 429? Server error? Timeout? ClawBox's fallback chain tries the next model automatically. Your application sees a successful response. Always.

### Save Up To 90%*

Smart routing classifies each request by complexity:
- **Simple queries** (greetings, lookups) → free or cheap models ($0/M tokens)
- **Medium tasks** (code generation, summaries) → mid-tier models ($0.10-$1.50/M)
- **Complex reasoning** (proofs, deep analysis) → premium models ($2-$12/M)

Instead of paying $25/M for everything, you pay based on what the task actually needs.

| Profile | Blended Cost | Savings vs Single Premium |
|---|---|---|
| Eco | ~$0.10/M tokens | 98% |
| Auto (default) | ~$2.05/M tokens | 92% |
| Premium | ~$25/M tokens | 0% |

*Up to 90% cost reduction in certain workloads with specific routing policies and model mixes. Results vary. See our reproducible [benchmarks](https://github.com/Clawland-AI/OpenclawBox/tree/main/benchmarks).*

### Fleet Ready

Managing multiple ClawBox devices? The built-in Fleet Console gives you:
- Real-time device status (online/offline, heartbeat)
- Remote configuration push
- Over-the-air (OTA) software updates
- Usage metrics and cost breakdown per device

---

## The Touchscreen

ClawBox features a 7.9" IPS bar touchscreen (1280x400) that shows you what your AI is doing — at a glance:

- Active model and routing profile
- Request count and cost today
- Device health and network status
- QR code for instant device pairing
- Connected devices list

No reaching for your phone. No opening a dashboard. Just look at your ClawBox.

---

## Specifications

| | Starter Edition | Pro Edition |
|---|---|---|
| **SoC** | RK3588S (8-core ARM, 6 TOPS NPU) | RK3588 (8-core ARM, 6 TOPS NPU) |
| **RAM** | 4GB LPDDR4x | 8GB LPDDR4x |
| **Storage** | 32GB eMMC | 64GB eMMC + M.2 NVMe slot |
| **Display** | 7.9" bar touchscreen (1280x400 IPS) | 7.9" bar touchscreen (1280x400 IPS) |
| **Network** | WiFi 6 + Gigabit Ethernet | WiFi 6 + 2x Gigabit Ethernet |
| **USB** | 2x USB-C, 1x USB-A | 3x USB-C (1x DP-out), 2x USB-A |
| **Enclosure** | Injection-molded, matte black | Same + aluminum top plate |
| **Software** | OpenclawBox pre-installed | OpenclawBox + Developer tools |
| **Power** | 12V/3A DC | 12V/3A DC |
| **Dimensions** | ~140 x 100 x 35 mm | ~140 x 100 x 35 mm |

---

## Reward Tiers

| Tier | Price | What You Get |
|---|---|---|
| **Digital Supporter** | $29 | Software license key + backer wall + Discord |
| **Early Bird Starter** | $179 | ClawBox Starter Edition (limited 300) |
| **Starter Edition** | $199 | ClawBox Starter Edition |
| **Early Bird Pro** | $269 | ClawBox Pro Edition (limited 200) |
| **Pro Edition** | $299 | ClawBox Pro Edition |
| **Developer Pack** | $349 | Pro + GPIO breakout board + dev docs |
| **Fleet Pack (3x)** | $499 | 3x Starter + Fleet Console license |
| **Fleet Pack (5x)** | $799 | 5x Starter + Fleet Console license |
| **Enterprise Pilot** | $1,499 | 10x Starter + 2x Pro + setup call |

Post-Kickstarter retail: Starter $249 / Pro $349. **Back now and save 20-28%.**

---

## Stretch Goals

| Funded At | Unlock |
|---|---|
| $100K | Base project ships: Starter + Pro editions |
| $150K | Free aluminum top plate upgrade for ALL Starter backers |
| $200K | Mobile companion app (iOS + Android) |
| $300K | On-device local LLM (Llama 3 8B quantized on NPU) |
| $400K | Second color: Pearl White |
| $500K | Home Assistant integration plugin |

---

## Open Source

ClawBox is powered by [OpenclawBox](https://github.com/Clawland-AI/OpenclawBox) — a fully open-source software stack (Apache-2.0). The routing engine is built on [ClawRouter](https://github.com/BlockRunAI/ClawRouter) by BlockRunAI (MIT license, 3.3k+ stars).

You can run the software on any machine today:

```bash
curl -fsSL https://raw.githubusercontent.com/Clawland-AI/OpenclawBox/main/scripts/install.sh | bash
```

The ClawBox hardware gives you a purpose-built, always-on device with a touchscreen, optimized enclosure, and fleet management built in.

---

## Timeline

| Date | Milestone |
|---|---|
| June 2026 | Kickstarter campaign launches |
| June 2026 | Engineering Validation Test (EVT) complete |
| July 2026 | Design Validation Test (DVT) — 50 units |
| July 2026 | Campaign ends, order quantities finalized |
| August 2026 | Production Validation Test (PVT) — 200 units |
| August 2026 | Mass production run |
| September 2026 | Final QC, packaging, ship to warehouse |
| September 2026 | Backer fulfillment begins |

---

## The Team

**Clawland Inc** is a team of developers, hardware engineers, and AI practitioners building tools that make AI accessible, affordable, and private.

We've shipped open-source software used by thousands of developers. ClawBox is our first hardware product, built on proven software that's already running in production.

---

## FAQ

See [full FAQ](faq.md) for detailed answers to common questions.

---

## Disclaimer

Clawland Inc and ClawBox are independent projects. **ClawBox is not affiliated with, endorsed by, or connected to any third-party hardware or software brand.** This is an original product designed and manufactured by Clawland Inc.

Cost savings claims are based on reproducible benchmarks using published model pricing. "Up to 90% cost reduction" applies to specific workloads with specific routing policies and model mixes. Individual results vary based on usage patterns, model availability, and query complexity.
