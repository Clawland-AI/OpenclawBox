---
sidebar_position: 3
---

# Architecture

ClawBox consists of four main components working together to provide a complete AI appliance platform.

## System Overview

```mermaid
graph TB
    subgraph device [ClawBox Device]
        CR[CheapRouter Wrapper]
        Engine["ClawRouter Engine"]
        Agent[Fleet Agent]
    end

    subgraph management [Management Layer]
        FS[Fleet Server]
        FC[Fleet Console]
    end

    subgraph providers [AI Providers]
        OpenAI[OpenAI]
        Anthropic[Anthropic]
        Google[Google Gemini]
        DeepSeek[DeepSeek]
        xAI[xAI Grok]
        Mock[Mock Provider]
    end

    Client[Any App / Client] -->|"POST /v1/chat/completions"| CR
    CR -->|"Rate limit + audit"| Engine
    Engine -->|"14-dim smart routing"| OpenAI
    Engine -->|"Fallback chain"| Anthropic
    Engine -->|"Auto-select"| Google
    Engine -.->|"Demo mode"| Mock
    CR -->|"Usage metrics"| FS
    Agent -->|"Heartbeat every 30s"| FS
    Agent -->|"Config poll + OTA"| FS
    FC -->|"REST API"| FS
```

## Components

### CheapRouter (`packages/cheaprouter/`)

A thin integration layer wrapping [ClawRouter](https://github.com/BlockRunAI/ClawRouter) (by BlockRunAI). ClawRouter provides the heavy lifting:

- **14-dimension weighted scoring** for intelligent model selection
- **38+ models** across 7 providers (OpenAI, Anthropic, Google, DeepSeek, xAI, Moonshot, MiniMax)
- **Routing profiles**: eco (cheapest), auto (balanced), premium (best quality), free (zero cost)
- **Fallback chains** with automatic retry on provider errors
- **Request deduplication** to prevent double-charging

CheapRouter adds on top:

- **Device-level rate limiting** via `X-Device-ID` header
- **Audit logging** to SQLite (metadata only by default)
- **Fleet metrics bridge** forwarding usage data to Fleet Server
- **Demo mode** with a built-in mock provider for testing

### Fleet Server (`packages/fleet-server/`)

Central management server for all ClawBox devices.

- **Heartbeat tracking**: knows which devices are online/offline
- **Configuration distribution**: push routing profiles and settings to devices
- **OTA management**: trigger firmware/software updates
- **Metrics aggregation**: collects usage data from all CheapRouter instances

### Fleet Agent (`packages/fleet-agent/`)

Runs on each ClawBox device.

- **Heartbeat**: reports status to Fleet Server every 30 seconds
- **Config polling**: checks for configuration changes and applies hot-reloads
- **OTA handler**: receives update commands and executes them
- **Device identity**: generates and persists a unique device ID

### Fleet Console (`packages/fleet-console/`)

Web dashboard for fleet administrators.

- **Device list**: online/offline status, last heartbeat times
- **Device detail**: configuration editor, OTA trigger
- **Metrics**: request counts, token usage, cost breakdown, latency

## Data Flow

```mermaid
sequenceDiagram
    participant App as Client App
    participant CR as CheapRouter
    participant Engine as ClawRouter
    participant Provider as AI Provider
    participant FS as Fleet Server
    participant Agent as Fleet Agent

    App->>CR: POST /v1/chat/completions
    CR->>CR: Rate limit check
    CR->>Engine: Route request
    Engine->>Engine: 14-dim scoring
    Engine->>Provider: Forward to selected model
    Provider-->>Engine: Response
    Engine-->>CR: Response
    CR->>CR: Audit log
    CR-->>App: OpenAI-compatible response
    CR--)FS: Async metrics push

    loop Every 30s
        Agent->>FS: Heartbeat
        FS-->>Agent: Config + pending OTA
    end
```

## Storage

All components use **SQLite** for local storage, keeping the deployment simple and self-contained.

| Component | Database | Contents |
|---|---|---|
| CheapRouter | `data/audit.sqlite` | Request audit logs (metadata only) |
| Fleet Server | `data/fleet.sqlite` | Devices, metrics, OTA jobs |
| Fleet Agent | `data/device-id.json` | Device identity |
