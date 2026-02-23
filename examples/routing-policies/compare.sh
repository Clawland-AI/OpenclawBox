#!/usr/bin/env bash
# Compare routing profiles by sending the same request with different models

set -euo pipefail

ENDPOINT="${CHEAPROUTER_URL:-http://localhost:4000}"
PROMPT="Explain the difference between TCP and UDP."

echo "Routing Profile Comparison"
echo "=========================="
echo "Prompt: $PROMPT"
echo ""

for MODEL in blockrun/eco blockrun/auto blockrun/premium blockrun/free; do
  echo "--- $MODEL ---"
  RESPONSE=$(curl -s "$ENDPOINT/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "X-Device-ID: compare-test" \
    -d "{\"model\": \"$MODEL\", \"messages\": [{\"role\": \"user\", \"content\": \"$PROMPT\"}]}")

  ROUTED_MODEL=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['model'])" 2>/dev/null || echo "unknown")
  TOKENS=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['usage']['total_tokens'])" 2>/dev/null || echo "0")

  echo "  Routed to: $ROUTED_MODEL"
  echo "  Tokens: $TOKENS"
  echo ""
done
