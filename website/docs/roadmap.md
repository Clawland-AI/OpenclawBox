---
sidebar_position: 11
---

# Roadmap

ClawBox is in active development. Here's what's planned and where you can contribute.

## v0.1.0 (Current)

- [x] CheapRouter with ClawRouter integration
- [x] OpenAI-compatible `/v1/chat/completions` endpoint
- [x] Mock provider for demo mode
- [x] Device-level rate limiting
- [x] Audit logging (metadata only)
- [x] Fleet Server with heartbeat, config, OTA, metrics
- [x] Fleet Agent with heartbeat, config polling, simulated OTA
- [x] Fleet Console web dashboard
- [x] One-click install script
- [x] clawboxctl management CLI
- [x] Docker Compose deployment
- [x] Reproducible benchmarks
- [x] Docusaurus documentation site

## v0.2.0 (Next)

- [ ] **Authentication**: API key support for CheapRouter and Fleet Console
- [ ] **Real OTA**: Docker image pull and rolling restart
- [ ] **Prometheus metrics**: export to Prometheus/Grafana
- [ ] **WebSocket support**: real-time device status in console
- [ ] **Device grouping**: organize devices by location/purpose
- [ ] **Config templates**: predefined configs for common use cases

## v0.3.0

- [ ] **Semantic caching**: cache similar requests to reduce costs further
- [ ] **Multi-user**: user accounts with role-based access
- [ ] **Plugin system**: extend CheapRouter with custom middleware
- [ ] **ARM64 Docker images**: pre-built images for Raspberry Pi
- [ ] **Alerting**: email/webhook alerts for device offline, high error rate

## v1.0.0 (Future)

- [ ] **Touchscreen UI**: status display for physical appliance builds
- [ ] **QR pairing**: scan-to-connect device onboarding
- [ ] **Mobile app**: companion app for remote management
- [ ] **Enterprise features**: LDAP/SSO, advanced audit, compliance exports
- [ ] **Marketplace**: community-contributed routing strategies and configs

## Contributing

Pick any unchecked item from the roadmap and open a PR! See [Contributing](/docs/contributing) for guidelines.

Have a feature idea? [Open a discussion](https://github.com/Clawland-AI/OpenclawBox/discussions) or [feature request](https://github.com/Clawland-AI/OpenclawBox/issues/new?template=feature_request.md).
