---
sidebar_position: 10
---

# FAQ

## General

### What is ClawBox?

ClawBox is an open-source platform for building personal AI appliances. It combines intelligent LLM routing (via ClawRouter), fleet device management, and one-click deployment.

### Is ClawBox a hardware product?

No. ClawBox is open-source software. It can run on any Linux/macOS machine, Raspberry Pi, mini PC, or cloud server. The "appliance" concept refers to a self-contained, always-on AI device that you can build with any compatible hardware.

### Is ClawBox affiliated with any other product or brand?

**No.** Clawland Inc and ClawBox are independent open-source projects with no affiliation to any third-party brand, product, or company.

### What license is ClawBox under?

Apache License 2.0. You can use, modify, and distribute it freely.

## Cost & Routing

### How does the "up to 90% cost reduction" work?

ClawRouter's smart routing classifies each request by complexity and routes it to the most cost-effective model. Simple queries (greetings, lookups) go to free or cheap models, while only complex reasoning tasks use expensive models. See [Benchmarks](/docs/benchmarks).

### Do I need API keys to try ClawBox?

No. Demo mode uses a built-in mock provider that simulates AI responses. You can test the entire system without any API keys.

### How do I use real AI providers?

Set `DEMO_MODE=false` and configure [ClawRouter](https://github.com/BlockRunAI/ClawRouter) with your provider credentials or USDC wallet for x402 micropayments.

## Fleet Management

### Can I manage multiple devices?

Yes. Fleet Server tracks all devices that run Fleet Agent. Use Fleet Console (web dashboard) to monitor status, push configuration, and trigger OTA updates.

### What is OTA?

Over-The-Air updates. Fleet Server can push version updates to devices remotely. In the current MVP, OTA is simulated (the agent logs the update steps). Future versions will support actual Docker image pulls.

### Is the Fleet Console secure?

The MVP Fleet Console has no built-in authentication. For production, deploy it behind a reverse proxy with authentication (e.g., nginx + basic auth or OAuth).

## Technical

### What are the system requirements?

- **Node.js**: >= 20
- **OS**: Linux, macOS, or Windows (WSL recommended)
- **RAM**: 512MB minimum for all services
- **Disk**: 100MB + space for audit logs

### Can I run it on a Raspberry Pi?

Yes. ClawBox runs on ARM64. The Node.js components are lightweight.

### Does it work without Docker?

Yes. You can run all services directly with Node.js. Docker is optional but recommended for production deployments.

### Where are logs stored?

- CheapRouter audit: `packages/cheaprouter/data/audit.sqlite`
- Fleet Server data: `packages/fleet-server/data/fleet.sqlite`
- Service logs: Check terminal output or `clawboxctl logs`
