# CheapRouter

CheapRouter is the AI routing layer for ClawBox. It wraps [ClawRouter](https://github.com/BlockRunAI/ClawRouter) (by BlockRunAI) with fleet-integrated rate limiting, audit logging, and a demo mode for zero-config testing.

## Features

- **OpenAI-compatible endpoint** -- `POST /v1/chat/completions`
- **Powered by ClawRouter** -- 14-dimension smart routing, 38+ models, fallback chains
- **Device-level rate limiting** -- per-device RPM and token limits via `X-Device-ID` header
- **Audit logging** -- metadata-only by default (no prompt content stored)
- **Demo mode** -- runs with a mock provider, no API keys or wallets required
- **Fleet integration** -- forwards metrics to Fleet Server, reads config remotely

## Quick Start

```bash
cd packages/cheaprouter
npm install
npm start
```

By default, starts in demo mode on port 4000.

## Test It

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-Device-ID: my-clawbox-001" \
  -d '{"model": "blockrun/auto", "messages": [{"role": "user", "content": "Hello!"}]}'
```

## Configuration

Copy `config.example.json` and set `CHEAPROUTER_CONFIG` env var, or use environment variables:

| Variable | Default | Description |
|---|---|---|
| `PORT` | 4000 | Server port |
| `DEMO_MODE` | true | Use mock provider (no API keys needed) |
| `FLEET_SERVER_URL` | http://localhost:4100 | Fleet server for metrics/config |

## Production Mode

To use real AI providers via ClawRouter, set `DEMO_MODE=false` and configure ClawRouter per its [documentation](https://github.com/BlockRunAI/ClawRouter).
