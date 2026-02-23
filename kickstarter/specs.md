# ClawBox Hardware Specifications

## Editions Comparison

| Specification | Starter Edition | Pro Edition |
|---|---|---|
| **Processor** | Rockchip RK3588S | Rockchip RK3588 |
| **CPU** | 4x Cortex-A76 @ 2.4GHz + 4x Cortex-A55 @ 1.8GHz | 4x Cortex-A76 @ 2.4GHz + 4x Cortex-A55 @ 1.8GHz |
| **GPU** | Mali-G610 MP4 | Mali-G610 MP4 |
| **NPU** | 6 TOPS (INT8) | 6 TOPS (INT8) |
| **RAM** | 4GB LPDDR4x | 8GB LPDDR4x |
| **Storage** | 32GB eMMC 5.1 | 64GB eMMC 5.1 + M.2 2242 NVMe slot |
| **Display** | 7.9" IPS, 1280x400, capacitive touch | 7.9" IPS, 1280x400, capacitive touch |
| **WiFi** | WiFi 6 (802.11ax) | WiFi 6 (802.11ax) |
| **Bluetooth** | BT 5.2 | BT 5.2 |
| **Ethernet** | 1x Gigabit (RJ45) | 2x Gigabit (RJ45) |
| **USB** | 2x USB-C 3.0, 1x USB-A 2.0 | 3x USB-C 3.0 (1x DP Alt Mode), 2x USB-A 2.0 |
| **Video Out** | — | 1x USB-C (DisplayPort 1.4, up to 4K@60Hz) |
| **Power** | 12V/3A DC barrel jack (5.5x2.1mm) | 12V/3A DC barrel jack (5.5x2.1mm) |
| **Power Consumption** | ~8W idle, ~15W peak | ~10W idle, ~18W peak |
| **Enclosure** | Injection-molded ABS, matte black | Injection-molded ABS + aluminum top plate |
| **Dimensions** | 140 x 100 x 35 mm | 140 x 100 x 35 mm |
| **Weight** | ~280g | ~320g |
| **LED** | Bottom edge RGB accent strip | Bottom edge RGB accent strip |
| **Operating System** | Ubuntu 22.04 (ARM64) + OpenclawBox | Ubuntu 22.04 (ARM64) + OpenclawBox |
| **Software** | CheapRouter + Fleet Agent + Touchscreen UI | CheapRouter + Fleet Agent + Touchscreen UI + Dev Tools |

## Software Stack (Pre-installed)

| Component | Description |
|---|---|
| CheapRouter | OpenAI-compatible API gateway (wraps ClawRouter) |
| Fleet Agent | Heartbeat, config polling, OTA updates |
| Touchscreen UI | Status display, QR pairing, device management |
| clawboxctl | CLI management tool |
| Node.js 20 | Runtime |
| Docker | Container runtime (optional, for custom services) |

## In The Box

### Starter Edition
- ClawBox Starter device
- 12V/3A power adapter (US/EU/UK/AU plug options)
- 1m Ethernet cable (Cat6)
- Quick start card

### Pro Edition
- ClawBox Pro device
- 12V/3A power adapter (US/EU/UK/AU plug options)
- 1m Ethernet cable (Cat6)
- Quick start card
- Developer quick reference card

### Developer Pack (add-on)
- Everything in Pro Edition
- GPIO breakout board
- Developer documentation USB drive
