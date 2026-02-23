---
sidebar_position: 2
title: Assembly Guide
---

# ClawBox Assembly Guide

This document describes how ClawBox is assembled, from individual components to a finished device. We publish this for transparency and to help backers, developers, and tinkerers understand what's inside their ClawBox.

## Exploded View

```
┌─────────────────────────────────┐
│        Aluminum Top Plate       │  ← Pro Edition only
├─────────────────────────────────┤
│       ABS Upper Enclosure       │
│  ┌───────────────────────────┐  │
│  │     7.9" Bar Touchscreen  │  │  ← Ribbon cable to DSI connector
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │      RK3588 SBC Module    │  │  ← Main compute board
│  │  [WiFi] [eMMC] [RAM]     │  │
│  │  [USB-C] [USB-A] [ETH]   │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │   Power + IO Sub-board    │  │  ← DC jack, LED driver, voltage regulation
│  └───────────────────────────┘  │
│       ABS Lower Enclosure       │
│         [Rubber Feet x4]        │
├─────────────────────────────────┤
│        RGB LED Light Pipe       │  ← Bottom edge accent
└─────────────────────────────────┘
```

## Component List

| # | Component | Quantity | Notes |
|---|---|---|---|
| 1 | ABS upper enclosure shell | 1 | Injection-molded, matte black |
| 2 | ABS lower enclosure shell | 1 | With ventilation slots |
| 3 | Aluminum top plate | 1 | Pro Edition only |
| 4 | RK3588/RK3588S SBC module | 1 | SoM (System on Module) format |
| 5 | 7.9" bar touchscreen panel | 1 | IPS 1280x400, capacitive |
| 6 | MIPI DSI ribbon cable | 1 | 15cm, connects display to SBC |
| 7 | WiFi/BT antenna | 1 | Internal PCB antenna |
| 8 | eMMC module | 1 | 32GB (Starter) or 64GB (Pro) |
| 9 | Power sub-board | 1 | DC barrel jack + 12V→5V/3.3V regulation |
| 10 | RGB LED strip | 1 | Bottom edge, connected to GPIO |
| 11 | Light pipe / diffuser | 1 | Frosted acrylic strip |
| 12 | Screws (M2.5 x 6mm) | 8 | Stainless steel, Phillips head |
| 13 | Rubber feet | 4 | Adhesive-backed, anti-slip |
| 14 | Thermal pad | 1 | 40x40mm, 1.5mm thickness |

## Assembly Steps

### Step 1: SBC Preparation

1. Seat the eMMC module onto the SBC's eMMC connector
2. Apply thermal pad to the RK3588 SoC die
3. Connect the WiFi/BT antenna to the U.FL connector
4. Flash the firmware image (Ubuntu 22.04 + OpenclawBox) via USB

### Step 2: Display Installation

1. Route the MIPI DSI ribbon cable through the enclosure channel
2. Seat the touchscreen panel into the upper enclosure's display cutout
3. Secure with adhesive foam strips on all four edges
4. Connect ribbon cable to the SBC's DSI port (lift latch, insert, close)

### Step 3: Power Sub-board

1. Mount the power sub-board in the lower enclosure using 2x M2.5 screws
2. Connect the DC barrel jack pigtail to the sub-board input
3. Route the 5V and 3.3V power cables to the SBC's power header
4. Connect the LED strip cable to the sub-board's LED driver output

### Step 4: Main Board Installation

1. Place the SBC into the lower enclosure's board mounting posts
2. Secure with 4x M2.5 screws (finger-tight, do not overtighten)
3. Verify all cables are routed away from the ventilation path
4. Align the SBC's I/O ports (USB, Ethernet, DC) with the enclosure cutouts

### Step 5: LED Strip

1. Peel the adhesive backing on the RGB LED strip
2. Press into the light pipe channel along the bottom edge
3. Route the cable to the power sub-board connector

### Step 6: Enclosure Assembly

1. Align the upper and lower enclosure halves
2. Engage the snap-fit clips along both long edges
3. Secure with 2x M2.5 screws at each end (4 total)
4. Attach rubber feet to the marked positions on the bottom

### Step 7: Pro Edition — Aluminum Top Plate

1. Remove the protective film from the aluminum plate
2. Align with the upper enclosure's recessed mounting area
3. Press down to engage the adhesive pads
4. Optionally secure with 2x M2 screws at the front edge

### Step 8: Quality Check

1. Connect power adapter → verify LED strip illuminates (blue pulse)
2. Verify touchscreen displays boot sequence within 30 seconds
3. Verify WiFi and Ethernet connectivity
4. Run `clawboxctl status` from a connected machine
5. Verify QR code appears on touchscreen for pairing

## Thermal Design

ClawBox uses passive cooling:

- **Thermal pad** transfers heat from the RK3588 die to the aluminum top plate (Pro) or upper ABS shell (Starter)
- **Ventilation slots** in the lower enclosure allow natural convection
- **Sustained workload**: The RK3588 throttles at ~80°C junction temperature; passive cooling maintains ~65°C under typical AI routing workloads
- **If running local models** (NPU): consider the Pro Edition's aluminum top plate for better thermal dissipation

## Serviceability

- The enclosure opens with 4 screws + snap-fit clips
- eMMC is socketed and replaceable
- Pro Edition's NVMe slot is accessible by removing the lower enclosure
- WiFi antenna can be replaced with an external antenna via the U.FL connector
