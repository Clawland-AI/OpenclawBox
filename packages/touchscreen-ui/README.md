# ClawBox Touchscreen UI

Status display for the ClawBox 7.9" bar touchscreen (1280x400 IPS).

## What It Shows

| Panel | Content |
|---|---|
| **Status** | Device health, uptime, current time |
| **Model** | Active model, routing profile, provider, routing path |
| **Metrics** | Requests today, cost today, tokens used, average latency |
| **QR / Devices** | QR code for instant pairing, connected device list |

## Development

```bash
cd packages/touchscreen-ui
npm install
npm run dev
# Open http://localhost:5173 — resize browser to 1280x400 for accurate preview
```

## Kiosk Mode (on device)

The touchscreen UI runs in Chromium kiosk mode on the ClawBox device:

```bash
chromium-browser --kiosk --window-size=1280,400 --window-position=0,0 http://localhost:5173
```

## Build

```bash
npm run build
# Output in dist/ — serve with any static server or nginx
```

## Design

- **Fixed viewport**: 1280x400 pixels, optimized for the bar display
- **Dark theme**: #0d1117 background, matching GitHub dark palette
- **4-panel layout**: equal horizontal panels filling the display
- **Live updates**: polls CheapRouter and Fleet Server every 3 seconds
- **QR code**: SVG-based placeholder (replace with real QR library in production)

## Production Notes

For production deployment, replace the `QRPlaceholder` component with a real QR code library (e.g., `qrcode.react`) that encodes the device's local API URL for instant pairing.
