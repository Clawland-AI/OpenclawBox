---
sidebar_position: 12
---

# Contributing

We welcome contributions of all kinds: code, documentation, bug reports, feature ideas, and feedback.

## Development Setup

### Prerequisites

- Node.js >= 20
- Python >= 3.10 (for benchmarks)
- Git

### Clone and Install

```bash
git clone https://github.com/Clawland-AI/OpenclawBox.git
cd OpenclawBox

# Install all packages
cd packages/cheaprouter && npm install && cd ../..
cd packages/fleet-server && npm install && cd ../..
cd packages/fleet-agent && npm install && cd ../..
cd packages/fleet-console && npm install && cd ../..

# Install docs dependencies
cd website && npm install && cd ..
```

### Run in Development

```bash
# Terminal 1: CheapRouter
cd packages/cheaprouter && npm run dev

# Terminal 2: Fleet Server
cd packages/fleet-server && npm run dev

# Terminal 3: Fleet Agent
cd packages/fleet-agent && npm run dev

# Terminal 4: Fleet Console
cd packages/fleet-console && npm run dev

# Terminal 5: Docs
cd website && npm start
```

## Project Structure

| Directory | Description |
|---|---|
| `packages/cheaprouter/` | AI routing wrapper (ClawRouter integration) |
| `packages/fleet-server/` | Fleet management server |
| `packages/fleet-agent/` | Device-side agent |
| `packages/fleet-console/` | Web dashboard (React + Vite) |
| `website/` | Docusaurus documentation site |
| `benchmarks/` | Cost/latency benchmark scripts |
| `scripts/` | Install and management scripts |
| `deploy/` | Docker Compose and env templates |

## Code Style

- **JavaScript**: ESLint + Prettier (configuration in each package)
- **Python**: PEP 8, use `black` for formatting
- **Markdown**: 80-char line width preferred

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Make your changes
4. Test locally
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, etc.
6. Push and open a Pull Request

## What to Work On

Check the [Roadmap](/docs/roadmap) for planned features, or browse [open issues](https://github.com/Clawland-AI/OpenclawBox/issues) for bugs and feature requests.

## Code of Conduct

Please read our [Code of Conduct](https://github.com/Clawland-AI/OpenclawBox/blob/main/CODE_OF_CONDUCT.md).
