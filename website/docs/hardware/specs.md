---
sidebar_position: 1
title: Hardware Specifications
---

# ClawBox Hardware Specifications

ClawBox is a purpose-built AI appliance powered by the Rockchip RK3588 platform. It comes in two editions: **Starter** and **Pro**.

## Editions Comparison

| Specification | Starter Edition | Pro Edition |
|---|---|---|
| **Processor** | RK3588S | RK3588 |
| **CPU** | 4x Cortex-A76 @ 2.4GHz + 4x Cortex-A55 @ 1.8GHz | Same |
| **GPU** | Mali-G610 MP4 | Same |
| **NPU** | 6 TOPS (INT8) | Same |
| **RAM** | 4GB LPDDR4x | 8GB LPDDR4x |
| **Storage** | 32GB eMMC 5.1 | 64GB eMMC 5.1 + M.2 NVMe slot |
| **Display** | 7.9" IPS, 1280x400, capacitive touch | Same |
| **WiFi** | WiFi 6 (802.11ax) + BT 5.2 | Same |
| **Ethernet** | 1x Gigabit (RJ45) | 2x Gigabit (RJ45) |
| **USB** | 2x USB-C 3.0, 1x USB-A 2.0 | 3x USB-C 3.0 (1x DP Alt Mode), 2x USB-A 2.0 |
| **Power** | 12V/3A DC barrel jack | Same |
| **Enclosure** | Injection-molded ABS, matte black | Same + aluminum top plate |
| **Dimensions** | 140 x 100 x 35 mm | Same |
| **Weight** | ~280g | ~320g |

## Processor: RK3588 / RK3588S

The Rockchip RK3588 is an 8nm SoC designed for AI edge computing:

- **CPU**: Big.LITTLE with 4x Cortex-A76 (performance) + 4x Cortex-A55 (efficiency)
- **NPU**: 6 TOPS INT8 neural processing unit for on-device inference
- **GPU**: Mali-G610 MP4 supporting Vulkan 1.2 and OpenCL 2.2
- **Video**: 8K@60fps decode, 8K@30fps encode (H.265/VP9)
- **Process**: 8nm (Samsung)

The RK3588S (Starter Edition) is a cost-optimized variant with identical CPU/NPU/GPU but fewer I/O options.

## Display

| Property | Value |
|---|---|
| Size | 7.9" (diagonal), bar format |
| Resolution | 1280 x 400 pixels |
| Type | IPS (In-Plane Switching) |
| Touch | Capacitive, 5-point multi-touch |
| Interface | MIPI DSI ribbon cable |
| Brightness | 350 nits (typical) |
| Viewing angle | 178° |

The bar display provides a persistent status dashboard without requiring a separate monitor. It runs the [Touchscreen UI](touchscreen-ui) in kiosk mode.

## Enclosure

- **Material**: ABS injection-molded plastic (Starter), ABS + CNC aluminum top plate (Pro)
- **Finish**: Matte black with soft-touch coating
- **Ventilation**: Bottom intake, rear exhaust (passive cooling sufficient for typical workloads)
- **LED**: Bottom edge RGB accent strip (status indicator)
- **Mounting**: Rubber feet (desk) or VESA 75mm adapter (optional accessory)

## Power

| Property | Value |
|---|---|
| Input | 12V DC, 3A (36W max) |
| Connector | 5.5 x 2.1mm barrel jack |
| Idle consumption | ~8W (Starter), ~10W (Pro) |
| Peak consumption | ~15W (Starter), ~18W (Pro) |
| Included | 12V/3A adapter with US plug (EU/UK/AU available) |

## Network

- **WiFi 6** (802.11ax): 2.4GHz + 5GHz, up to 2.4 Gbps
- **Bluetooth 5.2**: BLE for low-power device communication
- **Ethernet**: 1x Gigabit RJ45 (Starter), 2x Gigabit RJ45 (Pro)

The dual Ethernet on the Pro Edition enables network bridging or failover configurations.

## Software Stack

All editions ship with Ubuntu 22.04 (ARM64) and the full OpenclawBox software stack pre-installed:

| Component | Description |
|---|---|
| CheapRouter | OpenAI-compatible API gateway |
| Fleet Agent | Heartbeat, config polling, OTA |
| Touchscreen UI | Status display + QR pairing |
| clawboxctl | CLI management tool |
| Node.js 20 | Application runtime |
