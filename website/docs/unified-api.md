---
sidebar_position: 4
---

# Unified API

CheapRouter exposes an **OpenAI-compatible API**, so any tool, library, or application that works with OpenAI can work with ClawBox — without code changes.

## Endpoint

```
POST http://localhost:4000/v1/chat/completions
```

## Basic Usage

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-Device-ID: my-clawbox-001" \
  -d '{
    "model": "blockrun/auto",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is the capital of Japan?"}
    ]
  }'
```

## Response Format

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1709000000,
  "model": "kimi-k2.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of Japan is Tokyo."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 8,
    "total_tokens": 32
  }
}
```

## Available Models

| Model ID | Profile | Description |
|---|---|---|
| `blockrun/auto` | Balanced | Best balance of cost and quality |
| `blockrun/eco` | Cheapest | Route to cheapest capable model |
| `blockrun/premium` | Best | Always use the best model |
| `blockrun/free` | Free | Only free-tier models |
| `mock/default` | Demo | Built-in mock provider |

## Streaming

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "blockrun/auto",
    "messages": [{"role": "user", "content": "Tell me a story"}],
    "stream": true
  }'
```

## Using with OpenAI SDKs

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000/v1",
    api_key="not-needed-in-demo-mode",
)

response = client.chat.completions.create(
    model="blockrun/auto",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

### JavaScript/TypeScript

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'http://localhost:4000/v1',
  apiKey: 'not-needed-in-demo-mode',
});

const response = await client.chat.completions.create({
  model: 'blockrun/auto',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.choices[0].message.content);
```

## Device Identification

Include the `X-Device-ID` header to enable per-device rate limiting and metrics tracking:

```bash
curl ... -H "X-Device-ID: clawbox-living-room"
```

## List Models

```bash
curl http://localhost:4000/v1/models
```
