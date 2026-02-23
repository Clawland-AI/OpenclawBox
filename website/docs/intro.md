---
sidebar_position: 1
slug: /
---

# Welcome to ClawBox

**ClawBox** is an open-source, plug-and-play AI appliance platform by [Clawland Inc](https://github.com/Clawland-AI). It combines intelligent LLM routing, fleet device management, and one-click deployment into a single, self-hosted solution.

## What is ClawBox?

ClawBox turns any compatible hardware into a personal AI assistant appliance. Inspired by the concept of always-on, touchscreen-equipped AI devices, ClawBox provides:

- **CheapRouter** — an OpenAI-compatible API gateway powered by [ClawRouter](https://github.com/BlockRunAI/ClawRouter), with 14-dimension smart routing across 38+ models
- **Clawland-Fleet** — device management with heartbeat monitoring, OTA updates, and usage auditing
- **One-click deploy** — `curl | bash` or `docker compose up` and you're running

## Core Values

| | Value | Description |
|---|---|---|
| **Cheaper** | Up to 90% cost reduction* | Smart routing sends simple queries to free/cheap models, reserving premium for complex tasks |
| **Reliable** | Auto-failover | Provider down? Rate limited? ClawBox switches automatically |
| **Governed** | Fleet-managed | Device monitoring, OTA, rate limiting, and audit trails built in |

*In certain workloads with specific routing policies and model mixes. See [Benchmarks](/docs/benchmarks).

## Who is this for?

- **Developers** building AI-powered products who want a unified, cost-optimized API
- **Teams** managing multiple AI devices/endpoints across locations
- **Hobbyists** who want a personal AI appliance running at home

## Non-Affiliation Disclaimer

Clawland Inc and ClawBox are independent open-source projects. ClawBox is **not affiliated with, endorsed by, or connected to any third-party hardware or software brand**. This repository provides open-source reference implementations and developer tools.

## Next Steps

- [Quickstart](/docs/quickstart) — Get running in 60 seconds
- [Architecture](/docs/architecture) — Understand the system design
- [Benchmarks](/docs/benchmarks) — See the cost savings data
