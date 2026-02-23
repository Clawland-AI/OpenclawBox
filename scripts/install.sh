#!/usr/bin/env bash
set -euo pipefail

REPO="https://github.com/Clawland-AI/OpenclawBox.git"
INSTALL_DIR="${CLAWBOX_DIR:-$HOME/.clawbox}"
VERSION="${CLAWBOX_VERSION:-main}"

RED='\033[0;31m'
TEAL='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

echo -e "${RED}Claw${TEAL}Box${NC} Installer v0.1.0"
echo "==============================="

# Detect architecture
ARCH=$(uname -m)
OS=$(uname -s)
echo "Detected: $OS $ARCH"

if [[ "$OS" != "Linux" && "$OS" != "Darwin" ]]; then
  echo "Warning: ClawBox is optimized for Linux. Proceeding anyway..."
fi

# Check prerequisites
check_command() {
  if ! command -v "$1" &> /dev/null; then
    return 1
  fi
  return 0
}

HAS_DOCKER=false
HAS_NODE=false

if check_command docker && check_command docker-compose || docker compose version &>/dev/null; then
  HAS_DOCKER=true
  echo "✓ Docker found"
fi

if check_command node; then
  NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_VERSION" -ge 20 ]; then
    HAS_NODE=true
    echo "✓ Node.js $(node --version) found"
  else
    echo "⚠ Node.js found but version < 20. Please upgrade."
  fi
fi

if [ "$HAS_DOCKER" = false ] && [ "$HAS_NODE" = false ]; then
  echo ""
  echo "Error: Neither Docker nor Node.js >= 20 found."
  echo "Install one of:"
  echo "  - Docker: https://docs.docker.com/engine/install/"
  echo "  - Node.js: https://nodejs.org/ (v20+)"
  exit 1
fi

# Clone or update
if [ -d "$INSTALL_DIR" ]; then
  echo "Updating existing installation at $INSTALL_DIR..."
  cd "$INSTALL_DIR"
  git pull --ff-only origin "$VERSION" 2>/dev/null || true
else
  echo "Cloning ClawBox to $INSTALL_DIR..."
  git clone --depth 1 --branch "$VERSION" "$REPO" "$INSTALL_DIR" 2>/dev/null || \
    git clone --depth 1 "$REPO" "$INSTALL_DIR"
  cd "$INSTALL_DIR"
fi

# Set up env
if [ ! -f "deploy/.env" ]; then
  cp deploy/env.example deploy/.env
  echo "✓ Created deploy/.env from template"
fi

# Install and start
if [ "$HAS_DOCKER" = true ]; then
  echo ""
  echo "Starting ClawBox with Docker Compose..."
  cd deploy
  docker compose up -d
  echo ""
  echo -e "${BOLD}${RED}Claw${TEAL}Box${NC} is running!${NC}"
  echo ""
  echo "  CheapRouter:   http://localhost:4000/health"
  echo "  Fleet Server:  http://localhost:4100/health"
  echo "  Fleet Console: http://localhost:4200"
  echo ""
else
  echo ""
  echo "Installing dependencies (Node.js mode)..."

  cd packages/cheaprouter && npm install --production && cd ../..
  cd packages/fleet-server && npm install --production && cd ../..
  cd packages/fleet-agent && npm install --production && cd ../..

  echo ""
  echo "Starting services..."
  DEMO_MODE=true node packages/cheaprouter/src/index.js &
  node packages/fleet-server/src/index.js &
  sleep 2
  node packages/fleet-agent/src/index.js &

  echo ""
  echo -e "${BOLD}${RED}Claw${TEAL}Box${NC} is running!${NC}"
  echo ""
  echo "  CheapRouter:   http://localhost:4000/health"
  echo "  Fleet Server:  http://localhost:4100/health"
  echo ""
  echo "Use './scripts/clawboxctl status' to check services."
  echo "Use './scripts/clawboxctl stop' to stop all services."
fi
