# Manufacturing Quality Traceability

> **Artifact type: Portfolio reconstruction.** This brief was written after the
> public implementation by inspecting its code and reproducing its checks. It
> is not a contemporaneous employer PRD, and its users and workflows have not
> been validated in a production plant.

[Source repository](https://github.com/gokulg846/Manufacturing-quality-traceabilty)

## Problem and intended users

Manufacturing quality evidence often lives in separate CMM, machine-process,
torque-audit, and supplier systems. When a defect appears, quality teams need to
identify every part that shares the suspect machine, dimension, joint, material
batch, or supplier evidence.

The intended users are manufacturing quality engineers, launch and containment
teams, supplier-quality engineers, and plant leaders reviewing quality trends.
The product concept matters because faster, complete traceability narrows the
containment population and gives root-cause work a common evidence base.

## Scope and non-goals

The implemented scope generates four linked synthetic sources, lands daily
Bronze Parquet data, models governed Silver and Gold tables with dbt and DuckDB,
and provides a Streamlit dashboard for defect trends and part-level drill-down.

It does **not** connect to a real MES, QMS, CMM, torque tool, or supplier portal.
It does not trigger containment, prove a physical root cause, quantify warranty
savings, or provide production authentication, authorization, or support.

## Decisions and trade-offs proven by code

- **Join at part and material-batch grain.** `part_id` connects machining, CMM,
  and torque evidence; `batch_id` connects each part to its supplier certificate.
- **Preserve raw evidence before deriving a verdict.** Bronze files retain the
  four source views while Silver models standardize checks and Gold publishes a
  one-row-per-part investigation view.
- **Treat missing traceability as a quality failure.** The Gold mart flags a
  part when inspection, torque, material, or required genealogy is missing.
- **Use transparent rules for the prototype.** Dimension limits, torque limits,
  material deviations, and process-risk flags are inspectable; the trade-off is
  that the composite score is illustrative rather than plant-calibrated.
- **Run locally first.** DuckDB, Parquet, Prefect, dbt, and Streamlit make the
  complete flow inexpensive to reproduce, but do not demonstrate production
  scale or integration reliability.

## Acceptance criteria

1. A deterministic 500-part run produces all four source families and preserves
   their part and batch keys in Bronze.
2. dbt rejects missing keys, broken relationships, invalid categories, and
   out-of-range physical or quality values.
3. Gold contains one traceability record per part with source evidence, defect
   flags, root-cause category, and quality score.
4. A reviewer can select a part in the dashboard and inspect its CMM, torque,
   process, and supplier-certificate records.
5. Re-running verification completes without a failing dbt model or data test.

## Reproducible verification

```bash
git clone https://github.com/gokulg846/Manufacturing-quality-traceabilty.git
cd Manufacturing-quality-traceabilty
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m orchestration.flow --date 2026-06-11 --parts 500 --seed 42
dbt build --profiles-dir .
streamlit run app.py
```

## Verified outputs

The independently reproduced run generated:

- **500 synthetic parts**;
- **5,012 source rows** across the four Bronze inputs;
- **90 dbt data tests**; and
- **100 total dbt resources passing**.

These figures demonstrate reproducibility and data-quality coverage on synthetic
data. They are not production throughput, user adoption, containment-time, or
warranty-impact results.

## Limitations and next validation step

The simulation encodes its own defect mechanisms, so a successful join does not
prove the rules generalize to real plant data. The score weights and thresholds
also lack quality-engineer approval.

The next validation step is a shadow evaluation on redacted historical data from
one line: reconcile source completeness against an existing containment case,
measure the time required to assemble the affected-part population, and review
false inclusions and exclusions with a quality engineer before proposing live
workflow integration.
