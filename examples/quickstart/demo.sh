#!/usr/bin/env bash
# ClawBox Quick Demo
# Sends sample requests to CheapRouter in demo mode

set -euo pipefail

ENDPOINT="${CHEAPROUTER_URL:-http://localhost:4000}"

echo "ClawBox Quick Demo"
echo "=================="
echo "Endpoint: $ENDPOINT"
echo ""

echo "1. Health check..."
curl -s "$ENDPOINT/health" | python3 -m json.tool
echo ""

echo "2. List models..."
curl -s "$ENDPOINT/v1/models" | python3 -m json.tool
echo ""

echo "3. Chat completion (auto routing)..."
curl -s "$ENDPOINT/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "X-Device-ID: demo-device-001" \
  -d '{"model": "blockrun/auto", "messages": [{"role": "user", "content": "Hello ClawBox! What can you do?"}]}' \
  | python3 -m json.tool
echo ""

echo "4. Chat completion (eco routing)..."
curl -s "$ENDPOINT/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "X-Device-ID: demo-device-001" \
  -d '{"model": "blockrun/eco", "messages": [{"role": "user", "content": "What is 2+2?"}]}' \
  | python3 -m json.tool
echo ""

echo "5. View metrics..."
curl -s "$ENDPOINT/v1/metrics" | python3 -m json.tool
echo ""

echo "Done! All requests successful."
