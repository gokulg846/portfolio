# Portfolio Demo Recording Handoff

The portfolio contains a rendered recording guide for every flagship project. Record the first three demos below; keep the wafer-yield workflow as the fallback. The site will not display a **Watch demo** link until a real YouTube URL is supplied.

## Recording priority

1. **Manufacturing Quality Traceability** — strongest TPM/data-product demonstration because it connects four source contracts to one quality-engineer decision.
2. **Industrial Sensor Anomaly Detection** — strongest AI product demonstration because it shows the user workflow, evaluation boundary, threshold tradeoff, and human review.
3. **Continuous Compliance Gate** — strongest platform-program demonstration because it shows deterministic policy, structured evidence, failure behavior, and CI-compatible status.
4. **Semiconductor Yield Analytics** — record only if a flagship demo cannot run or once the first three are complete.

## Project-specific guides

- Manufacturing: `/projects/manufacturing-quality-traceability/recording-guide/`
- Sensor anomaly: `/projects/industrial-sensor-anomaly-detection/recording-guide/`
- Compliance gate: `/projects/continuous-compliance-gate/recording-guide/`
- Wafer yield: `/projects/semiconductor-yield-analytics/recording-guide/`

Each rendered guide contains the repository-specific setup commands, the 60–90 second sequence, the user decision to narrate, and the limitation to state.

## Capture standard

- Record at 1920×1080 in a 16:9 frame.
- Use browser zoom and terminal font sizing that remain legible on a laptop screen.
- Close notifications and remove secrets, local usernames, unrelated tabs, and private data.
- Start with the target user and decision; do not begin with installation or repository structure.
- Show one complete workflow, one important product/technical decision, and one honest limitation.
- Keep the cursor deliberate and remove setup dead time in editing.
- Add accurate captions.
- Upload to YouTube as **Unlisted** or **Public**, never Private.

## Claim boundaries

- Do not describe synthetic data, record counts, or test counts as business outcomes.
- Do not call the compliance project AI; it is deterministic policy automation.
- Do not publish sensor precision, recall, F1, latency, or cost unless the pinned reproducible evaluation succeeds.
- Do not describe the wafer workflow as causal proof; it connects planted synthetic conditions to investigation hypotheses.
- Do not claim production deployment, adoption, savings, or user validation that the repository does not establish.

## URLs to return

Send one line per finished video:

```text
manufacturing-quality-traceability: https://youtu.be/...
industrial-sensor-anomaly-detection: https://youtu.be/...
continuous-compliance-gate: https://youtu.be/...
semiconductor-yield-analytics: https://youtu.be/...  # optional fallback
```

After those URLs are supplied, add them in a separate `codex/demo-links` branch and render **Watch demo** only for projects with a real link.
