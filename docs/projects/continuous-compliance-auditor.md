# Continuous Compliance Auditor

> **Artifact type: Portfolio reconstruction.** This brief was written after the
> public implementation to make its product intent and delivery evidence clear.
> It is not a contemporaneous employer PRD. Despite the repository name, the
> implemented product is deterministic policy-as-code automation, not an AI or
> LLM system.

[Source repository](https://github.com/gokulg846/AI-Continuous-Compliance)

## Problem and intended users

Container governance is difficult to enforce when ownership metadata and
network-exposure rules are reviewed manually. Platform, security, and release
engineering teams need a repeatable answer to two questions: which running
containers violate the current policy, and is the evidence structured enough to
block a release or support an audit?

The concept matters because a machine-readable policy and deterministic result
turn governance from a checklist into an executable control.

## Scope and non-goals

The implemented scope loads and validates a JSON policy, inspects running Docker
containers for required labels and forbidden published ports, writes structured
JSON evidence, supports one-shot and daemon operation, and returns a nonzero exit
code when violations exist.

It does **not** scan images or dependencies, evaluate Kubernetes resources,
verify signatures, manage policy exceptions, enforce identity or workspace
membership, or use AI. It is also not a complete enterprise compliance product
or a substitute for a policy engine such as OPA.

## Decisions and trade-offs proven by code

- **Keep policy outside the auditor.** Required labels and forbidden ports live
  in JSON, allowing rule changes without rewriting inspection logic. The current
  schema is intentionally narrow.
- **Fail fast on invalid policy.** Validation happens before the Docker
  connection so malformed governance input cannot produce misleading evidence.
- **Separate ingestion, audit, reporting, and service control.** The modular
  boundary makes new checks easier to add and test, with more code than a single
  script would require.
- **Emit evidence and an enforcement signal.** JSON reports support review while
  exit code `1` supports CI gating. Teams must still define an exception and
  remediation process around that gate.
- **Continue across container-level errors.** One inspection failure is recorded
  without discarding successful results for the remaining audit population.

## Acceptance criteria

1. A valid policy loads into a typed governance model; missing or invalid fields
   fail before auditing begins.
2. Containers missing required labels are reported with the missing key.
3. Forbidden container or host-published ports produce explicit violations.
4. A compliant audit exits `0`; violations or fatal audit errors exit `1`.
5. Every run writes a timestamped report with policy version, summary counts,
   per-container status, violations, and errors.
6. The committed demo distinguishes one compliant container from two intentional
   violation scenarios.

## Reproducible verification

```bash
git clone https://github.com/gokulg846/AI-Continuous-Compliance.git
cd AI-Continuous-Compliance
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m unittest discover -s tests -v
./demo/run_demo.sh
```

The demo requires a running Docker daemon for live inspection. Its script falls
back to committed sample output when Docker is unavailable, so reviewers should
state which path they executed.

## Verified outputs

Independent verification found:

- **6 unit tests passing**; and
- a committed three-container demo definition with **1 compliant scenario** and
  **2 intentional violation scenarios**: missing governance labels and an
  exposed forbidden Redis port.

The repository also contains sample JSON audit evidence. That sample proves the
report contract is inspectable; it is not evidence of a continuously deployed
control or production compliance rate.

## Limitations and next validation step

There is no CI workflow, signed policy distribution, authenticated evidence
store, exception lifecycle, or production deployment. Docker-socket access is
privileged, and the current rule set covers only labels and ports.

The next validation step is to add CI, run the live demo in an isolated runner,
publish the test and audit artifacts for a pinned commit, and review false
positives, bypass paths, exception ownership, and Docker-socket security with a
platform or security engineer before expanding the rule library.
