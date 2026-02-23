---
sidebar_position: 2
---

# Quickstart

Get ClawBox running in 60 seconds. No API keys required — demo mode is enabled by default.

## Option 1: One-Line Install (Linux/macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/Clawland-AI/OpenclawBox/main/scripts/install.sh | bash
```

This will:
1. Clone the repository
2. Install dependencies
3. Start all services in demo mode

## Option 2: Docker Compose

```bash
git clone https://github.com/Clawland-AI/OpenclawBox.git
cd OpenclawBox/deploy
cp env.example .env
docker compose up -d
```

## Option 3: Manual (Node.js)

```bash
git clone https://github.com/Clawland-AI/OpenclawBox.git
cd OpenclawBox

# Install dependencies
cd packages/cheaprouter && npm install && cd ../..
cd packages/fleet-server && npm install && cd ../..
cd packages/fleet-agent && npm install && cd ../..

# Start services (3 terminals)
DEMO_MODE=true node packages/cheaprouter/src/index.js    # Terminal 1
node packages/fleet-server/src/index.js                   # Terminal 2
node packages/fleet-agent/src/index.js                    # Terminal 3
```

## Verify It Works

### Test the API

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "blockrun/auto",
    "messages": [{"role": "user", "content": "Hello ClawBox!"}]
  }'
```

### Check Health

```bash
curl http://localhost:4000/health
# {"status":"ok","version":"0.1.0","demoMode":true}

curl http://localhost:4100/health
# {"status":"ok","service":"fleet-server","version":"0.1.0"}
```

### View Devices

```bash
curl http://localhost:4100/api/devices
```

## Services Overview

| Service | Port | Description |
|---|---|---|
| CheapRouter | 4000 | OpenAI-compatible API gateway |
| Fleet Server | 4100 | Device management & metrics |
| Fleet Console | 4200 | Web dashboard (Docker only) |
| Fleet Agent | — | Runs on each device |

## Next Steps

- [Architecture](/docs/architecture) — Understand how the pieces fit together
- [Routing Strategies](/docs/routing-strategies) — Configure cost optimization
- [Fleet Management](/docs/fleet-management) — Manage your devices
