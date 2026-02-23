---
sidebar_position: 3
title: Touchscreen UI
---

# Touchscreen UI

The ClawBox features a 7.9" IPS bar touchscreen (1280x400) that provides an always-visible status dashboard. The Touchscreen UI is a React application that runs in kiosk mode on the device's display.

## Layout

The UI is divided into four horizontal panels:

```
┌──────────┬─────────────┬──────────────┬──────────────┐
│  STATUS  │    MODEL    │   METRICS    │   QR/DEVS    │
│  260px   │    300px    │    320px     │    400px     │
│          │             │              │              │
│ ClawBox  │ Active      │ Requests: 42 │  ┌────────┐ │
│ ● Online │ blockrun/   │ Cost: $0.08  │  │ QR Code│ │
│          │   auto      │ Tokens: 15K  │  │        │ │
│ Uptime   │             │ Latency:     │  └────────┘ │
│ 04:23:17 │ Profile:    │   245ms      │ Devices (3) │
│          │ [AUTO]      │              │ dev-a1b2... │
│ 14:30:22 │             │              │ dev-c3d4... │
└──────────┴─────────────┴──────────────┴──────────────┘
          1280px × 400px
```

### Status Panel (260px)

- **ClawBox logo** with branded colors (red + teal)
- **Health status** with color-coded indicator:
  - Green: Online
  - Yellow: Degraded (partial connectivity)
  - Red: Offline
- **Uptime counter** (HH:MM:SS format)
- **Current time**

### Model Panel (300px)

- **Active model**: The currently selected model (e.g., `blockrun/auto`)
- **Routing profile**: Color-coded badge (eco/auto/premium/free)
- **Provider**: Current upstream provider name
- **Routing path**: Visual chain showing `req → CheapRouter → ClawRouter → model`

### Metrics Panel (320px)

Real-time counters for today's usage:

| Metric | Description |
|---|---|
| Requests | Total API requests processed today |
| Cost | Estimated cost in USD |
| Tokens | Total tokens consumed (input + output) |
| Avg Latency | Rolling average response time in ms |

### QR / Devices Panel (400px)

- **QR code**: Encodes the device's local API URL (e.g., `http://clawbox.local:4000`) for instant pairing
- **Connected devices**: List of fleet-enrolled devices with status indicators

## Running Locally

```bash
cd packages/touchscreen-ui
npm install
npm run dev
```

Open `http://localhost:5173` and resize your browser to **1280x400** for an accurate preview.

## Kiosk Mode

On the ClawBox device, the Touchscreen UI runs in Chromium kiosk mode:

```bash
chromium-browser \
  --kiosk \
  --window-size=1280,400 \
  --window-position=0,0 \
  --disable-infobars \
  --noerrdialogs \
  --disable-translate \
  http://localhost:5173
```

This is configured as a systemd service that starts automatically on boot.

## Data Sources

The UI polls two local services every 3 seconds:

| Endpoint | Service | Data |
|---|---|---|
| `GET /health` | CheapRouter (port 4000) | Device health, active model |
| `GET /api/devices` | Fleet Server (port 5000) | Connected device list |

Metrics (requests, cost, tokens, latency) are aggregated locally from CheapRouter's audit log.

## Customization

The Touchscreen UI is a standard React + Vite application. To customize:

1. **Colors**: Edit the inline styles in each panel component (`StatusPanel.jsx`, `ModelPanel.jsx`, etc.)
2. **Panels**: Add or remove panels in `App.jsx`
3. **Data sources**: Modify the polling URLs in `App.jsx` (`ROUTER_URL` and `FLEET_URL`)
4. **QR library**: Replace `QRPlaceholder` with a real QR library like `qrcode.react`

## Build for Production

```bash
npm run build
# Static files output to dist/
```

Deploy to the device with nginx or any static file server. The Dockerfile in the package builds a production nginx image.
