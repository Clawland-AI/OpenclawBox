---
sidebar_position: 9
---

# Security & Privacy

ClawBox is designed with privacy-first defaults and transparent data handling.

## Data Handling Principles

### What is stored

| Data | Stored By | Default | Configurable |
|---|---|---|---|
| Request metadata (model, tokens, latency) | CheapRouter audit log | Yes | Can disable |
| Device ID, version, heartbeat time | Fleet Server | Yes | Required for fleet features |
| Usage metrics (aggregated) | Fleet Server | Yes | Can disable |
| Prompt content | — | **No** | Opt-in only |
| API keys / wallet keys | Local device only | Yes | — |

### What is NOT stored (by default)

- **Prompt content** — The actual text of user messages and AI responses
- **Personal information** — No user accounts, no email, no tracking
- **External telemetry** — No data sent to Clawland or any third party

## Enabling Prompt Logging

If you need prompt logging for debugging or compliance, enable it explicitly:

```json
{
  "audit": {
    "enabled": true,
    "storePrompts": true
  }
}
```

**Warning**: Enabling prompt storage increases storage requirements and may have privacy/compliance implications. Use responsibly.

## Network Security

### Local-First Architecture

- **Routing decisions** happen locally (ClawRouter's scorer runs on-device)
- **Fleet Agent** communicates only with your Fleet Server
- **CheapRouter** communicates only with configured AI provider endpoints

### Recommended Network Setup

For production deployments:

1. **Fleet Server**: Run behind a reverse proxy with TLS
2. **CheapRouter**: Bind to localhost only unless remote access is needed
3. **Fleet Console**: Protect with authentication (e.g., nginx basic auth)

### API Security

CheapRouter currently operates without authentication in demo mode. For production:

- Use the `X-Device-ID` header for device identification
- Deploy behind a reverse proxy with API key validation
- Enable rate limiting (enabled by default)

## Audit Trail

Every API request is logged with:
- Timestamp
- Device ID
- Requested model and routed model
- Token counts (prompt, completion, total)
- Latency
- Cost estimate
- Success/error status

Access the audit log:

```bash
curl http://localhost:4000/v1/audit?limit=100
```

## Vulnerability Reporting

See [SECURITY.md](https://github.com/Clawland-AI/OpenclawBox/blob/main/SECURITY.md) for our responsible disclosure policy.
