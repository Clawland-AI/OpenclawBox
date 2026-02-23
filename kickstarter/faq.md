# ClawBox Kickstarter FAQ

## General

### What is ClawBox?

ClawBox is a personal AI appliance — a small, always-on device that sits on your desk and provides an OpenAI-compatible API to any application. It intelligently routes requests across 38+ AI models to optimize cost, reliability, and quality.

### Who is ClawBox for?

- **Tech enthusiasts** who want a personal AI that respects their privacy
- **Developers** building AI-powered apps who want a unified, cost-optimized API
- **Small teams** managing multiple AI devices across locations
- **Anyone** tired of expensive, unreliable cloud AI APIs

### Is ClawBox a standalone AI? Does it run models locally?

ClawBox routes requests to cloud AI providers (OpenAI, Anthropic, Google, etc.) via the smartest, cheapest path. It doesn't run large models locally by default — but the RK3588's 6 TOPS NPU can run quantized models like Llama 3 8B. Local model support is a stretch goal at $300K.

### Is this related to any other product called ClawBox?

**No.** ClawBox by Clawland Inc is an entirely independent project. It is not affiliated with, endorsed by, or connected to any other company, product, or brand. See our [non-affiliation disclaimer](https://github.com/Clawland-AI/OpenclawBox#non-affiliation-disclaimer).

---

## Software

### Do I need API keys to use ClawBox?

No. ClawBox ships in demo mode with a built-in mock provider. You can test the entire system immediately. For real AI usage, you can:
- Configure your own API keys (OpenAI, Anthropic, etc.)
- Use ClawRouter's USDC micropayment system (no accounts needed)

### Is the software open source?

Yes. The entire software stack — [OpenclawBox](https://github.com/Clawland-AI/OpenclawBox) — is open-source under Apache-2.0. The routing engine [ClawRouter](https://github.com/BlockRunAI/ClawRouter) is MIT licensed.

### Can I run the software without ClawBox hardware?

Absolutely. Run `curl -fsSL .../install.sh | bash` on any Linux or macOS machine. The hardware adds a purpose-built form factor with touchscreen, optimized enclosure, and always-on operation.

### What does the touchscreen show?

- Active routing profile and model
- Request count and estimated cost today
- Device health (CPU, memory, network)
- QR code for instant device pairing
- List of connected client devices

### Will there be software updates?

Yes. ClawBox supports over-the-air (OTA) updates via the Fleet management system. Updates are delivered automatically or on-demand from the Fleet Console.

---

## Hardware

### What are the specs?

See the [full specs table](specs.md). Key highlights:
- RK3588/RK3588S (8-core ARM, 6 TOPS NPU)
- 4GB or 8GB RAM
- 7.9" bar touchscreen (1280x400 IPS)
- WiFi 6 + Gigabit Ethernet
- ~140 x 100 x 35 mm matte black enclosure

### What's the difference between Starter and Pro?

| Feature | Starter | Pro |
|---|---|---|
| SoC | RK3588S | RK3588 |
| RAM | 4GB | 8GB |
| Storage | 32GB eMMC | 64GB eMMC + NVMe slot |
| Ethernet | 1x Gigabit | 2x Gigabit |
| USB | 2x USB-C, 1x USB-A | 3x USB-C (1x DP), 2x USB-A |
| Enclosure | Injection-molded | + Aluminum top plate |
| Extras | — | Developer tools included |

### Can I add more storage?

The Pro Edition has an M.2 NVMe slot for additional SSD storage (up to 2TB). The Starter Edition uses 32GB eMMC only.

### What's in the box?

- ClawBox device
- 12V/3A power adapter + cable
- Quick start card with QR code
- Ethernet cable (1m)

---

## Cost & Pricing

### How does the "up to 90% savings" work?

ClawRouter classifies each request by complexity (simple/medium/complex/reasoning) and routes it to the cheapest capable model. Simple queries go to free models, complex ones to premium. Since most real-world traffic is simple, the blended cost drops dramatically. See our [reproducible benchmarks](https://github.com/Clawland-AI/OpenclawBox/tree/main/benchmarks).

### What will the retail price be after Kickstarter?

- Starter: $249
- Pro: $349

Kickstarter backers save 20-28%.

### Are there ongoing subscription fees?

No. ClawBox has no subscription. You pay for AI model usage directly to providers (or via ClawRouter's pay-per-request system). The software and fleet management are free forever.

---

## Shipping & Fulfillment

### When will ClawBox ship?

Estimated delivery: **September 2026.** See the [timeline](timeline.md) for manufacturing milestones.

### Where do you ship?

Worldwide. Shipping costs:
- US: $8-12
- EU: $15-20
- Rest of world: $18-25

### Who pays customs/duties?

Backers are responsible for any local import taxes, duties, or VAT in their country. This is standard for international Kickstarter campaigns.

---

## Campaign

### What if the campaign doesn't reach its goal?

Per Kickstarter's all-or-nothing model, if we don't reach $100K, all pledges are refunded. No one is charged.

### Can I change my pledge tier after backing?

Yes. Kickstarter allows pledge changes anytime during the campaign.

### Will there be add-ons?

We plan to offer these as add-ons during the pledge manager phase:
- Extra power adapter
- GPIO breakout board
- Extended warranty (2 years)
- Additional ClawBox units at backer pricing
