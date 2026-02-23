# Fleet Console

Web dashboard for managing ClawBox devices. Built with React + Vite.

## Features

- Device list with online/offline status and heartbeat times
- Device detail: view config, trigger OTA, push new configuration
- Metrics overview: requests, tokens, cost, latency (24h window)
- Hourly activity chart
- Breakdowns by model and device

## Quick Start

```bash
cd packages/fleet-console
npm install
npm run dev
```

Opens at http://localhost:4200. Requires Fleet Server running on port 4100.

## Build

```bash
npm run build
```

Static files output to `dist/`.
