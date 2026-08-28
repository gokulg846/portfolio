# Semiconductor Wafer Yield Analytics

> **Artifact type: Portfolio reconstruction.** This brief was created after the
> public build from its implementation and a reproduced verification run. It is
> not an employer artifact, fab deployment record, or customer-validated PRD.

[Source repository](https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline)

## Problem and intended users

Yield teams need to connect electrical-test failures to the process conditions,
equipment, chamber, lot genealogy, and spatial signature that produced them.
Disconnected test and equipment data slows excursion triage and makes it hard to
separate a tool problem from ordinary process variation.

The intended users are yield engineers, process and equipment engineers, product
and test engineers, and fab leaders monitoring yield stability. The concept
matters because each investigation needs both the lost-yield outcome and the
upstream evidence required to choose the next engineering action.

## Scope and non-goals

The implemented scope generates linked synthetic lot, equipment, process, and
die-test data; lands hive-partitioned Bronze Parquet; builds Bronze, Silver, and
Gold models in dbt and DuckDB; and presents wafer maps, yield trends, SPC, and
failure Pareto views in Streamlit.

It does **not** ingest production STDF, SECS/GEM, MES, or foundry data. It does
not estimate revenue recovery, identify a real faulty chamber, control equipment,
or validate that its simulated physical relationships match a specific fab.

## Decisions and trade-offs proven by code

- **Generate linked failure stories rather than unrelated random tables.** The
  simulator propagates planted process and chamber conditions into downstream
  die patterns. This creates a reproducible investigation path, at the cost of
  being unable to claim discovery on independent production data.
- **Partition by lot and wafer.** The storage layout matches the implemented
  arrival and investigation grain and supports idempotent lot replacement.
- **Use DuckDB and dbt for a local, governed prototype.** This keeps the project
  reproducible while preserving model lineage and test gates; it does not prove
  warehouse performance at fab volume.
- **Publish investigation-ready marts.** The wafer summary joins yield, bin mix,
  process values, equipment, alarms, and genealogy so users do not reconstruct
  the evidence for every excursion.
- **Combine spatial, statistical, and prioritization views.** Wafer maps show
  location, SPC shows process drift, and Pareto ranks loss mechanisms. These
  views support different decisions rather than adding dashboard volume.

## Acceptance criteria

1. A seeded small run creates linked records for every configured lot and wafer.
2. Each tested wafer retains process, equipment, and lot-genealogy relationships.
3. Die coordinates are unique at wafer grain and yield remains between zero and
   one.
4. A failed dbt model or data test prevents successful completion of the flow.
5. The dashboard can trace a low-yield wafer from spatial failure pattern to its
   upstream process and equipment context.

## Reproducible verification

```bash
git clone https://github.com/gokulg846/Semiconductor-wafer-yield-analysis-pipeline.git
cd Semiconductor-wafer-yield-analysis-pipeline
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m orchestration.flow --lots 2 --wafers 3 --days 7 --seed 42
streamlit run app.py
```

The orchestration flow runs `dbt build` as its transformation and quality gate.

## Verified outputs

The independently reproduced verification-sized run generated:

- **6 synthetic wafers**;
- **11,310 die-test records**;
- **11,360 total Bronze rows**;
- **139 dbt data tests**; and
- **151 total dbt resources passing**.

These are reproducibility and test-coverage results for synthetic data. They are
not production yield, process capability, model accuracy, or fab-scale
performance claims.

## Limitations and next validation step

The simulated cause-and-effect chain is known in advance, and the project has no
independent labeled excursion set. SPC limits and pattern interpretations have
not been reviewed by a semiconductor yield engineer.

The next validation step is a blinded replay using a de-identified public or
partner-provided wafer dataset. Freeze the investigation rules first, then
measure whether the workflow surfaces known excursions, record false leads, and
have a domain reviewer assess whether the evidence would change the next action.
