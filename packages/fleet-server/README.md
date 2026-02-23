# Fleet Server

The Clawland Fleet Server manages ClawBox devices: heartbeat tracking, configuration distribution, OTA updates, and metrics aggregation.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/heartbeat` | Receive device heartbeat |
| GET | `/api/devices` | List all devices |
| GET | `/api/devices/:id` | Get single device |
| GET | `/api/config/:id` | Get device config |
| PUT | `/api/config/:id` | Update device config |
| POST | `/api/ota/trigger` | Trigger OTA for device |
| POST | `/api/ota/ack` | Acknowledge OTA completion |
| GET | `/api/ota/status` | Get OTA job status |
| POST | `/api/metrics/ingest` | Ingest metrics from CheapRouter |
| GET | `/api/metrics` | Get aggregated metrics |

## Quick Start

```bash
cd packages/fleet-server
npm install
npm start
```

Runs on port 4100 by default. Set `FLEET_PORT` to change.
