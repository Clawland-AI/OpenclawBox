# Contributing to ClawBox

Thank you for your interest in contributing to ClawBox! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js >= 20
- Python >= 3.10 (for benchmarks)
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Clawland-AI/OpenclawBox.git
cd OpenclawBox

# Install dependencies for all packages
cd packages/cheaprouter && npm install && cd ../..
cd packages/fleet-server && npm install && cd ../..
cd packages/fleet-agent && npm install && cd ../..
cd packages/fleet-console && npm install && cd ../..

# Start all services in demo mode
./scripts/clawboxctl start
```

### Project Structure

```
packages/
  cheaprouter/     # CheapRouter - ClawRouter integration wrapper
  fleet-server/    # Fleet management server
  fleet-agent/     # Device-side agent
  fleet-console/   # Web dashboard (React + Vite)
benchmarks/        # Reproducible cost/latency benchmarks
docs/              # Documentation source (Docusaurus)
scripts/           # Install and management scripts
deploy/            # Docker Compose and env templates
```

## How to Contribute

### Reporting Bugs

Use the [Bug Report](https://github.com/Clawland-AI/OpenclawBox/issues/new?template=bug_report.md) issue template.

### Suggesting Features

Use the [Feature Request](https://github.com/Clawland-AI/OpenclawBox/issues/new?template=feature_request.md) issue template.

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test` in the relevant package
5. Commit with a descriptive message
6. Push to your fork and open a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new routing strategy
fix: correct fallback timeout handling
docs: update quickstart guide
chore: update dependencies
```

## Code Style

- **JavaScript/Node.js**: We use ESLint + Prettier. Run `npm run lint` before committing.
- **Python**: Follow PEP 8. Use `black` for formatting.
- **Documentation**: Markdown, 80-char line width preferred.

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
