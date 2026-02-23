# Fleet Agent

The Clawland Fleet Agent runs on each ClawBox device. It handles heartbeat reporting, configuration polling, and OTA updates.

## Features

- **Heartbeat**: Periodically reports status to Fleet Server
- **Config Polling**: Fetches configuration updates and applies them without restart
- **OTA Updates**: Receives and executes update commands from Fleet Server
- **Device Identity**: Auto-generates and persists a unique device ID

## Quick Start

```bash
cd packages/fleet-agent
npm install
npm start
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `FLEET_SERVER_URL` | http://localhost:4100 | Fleet Server endpoint |
| `HEARTBEAT_INTERVAL` | 30000 | Heartbeat interval in ms |
| `CONFIG_POLL_INTERVAL` | 60000 | Config poll interval in ms |
