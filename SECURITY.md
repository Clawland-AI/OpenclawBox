# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in ClawBox, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email us at: **security@clawland.ai**

Include the following in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if any)

## Response Timeline

- **Acknowledgment**: Within 48 hours of receiving your report
- **Initial assessment**: Within 5 business days
- **Resolution**: We aim to release a patch within 14 days for critical vulnerabilities

## Security Design Principles

ClawBox follows these security principles:

1. **No prompt storage by default** -- CheapRouter only logs request metadata (model, token count, latency, device ID). Prompt content is never stored unless explicitly enabled via configuration.

2. **Local-first** -- All routing decisions happen locally on the device. No data is sent to third-party services unless you configure external AI providers.

3. **Minimal network exposure** -- Fleet Agent communicates only with your Fleet Server. CheapRouter communicates only with configured AI provider endpoints.

4. **Audit trail** -- All API requests are logged with metadata for compliance. Audit logs can be exported for review.

## Disclosure Policy

We follow coordinated disclosure. We will credit reporters in release notes (unless anonymity is requested).
