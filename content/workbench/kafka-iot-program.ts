import type { WorkbenchEntry } from "../types";
import { defineWorkbenchEntry } from "../define";

export const kafkaIotProgram: WorkbenchEntry = defineWorkbenchEntry({
  slug: "kafka-iot-program",
  title: "Recovering a delayed Kafka and AWS program",
  entryType: "Program case exercise",
  productOrScenario: "Hypothetical industrial IoT event-streaming program",
  question: "How should a TPM recover a delayed cloud workstream while protecting the critical path of a multi-team event-streaming program?",
  summary: "A TPM interview exercise covering a six-month Kafka and AWS program, including dependencies, ownership, status reporting, and recovery from a delayed cloud workstream.",
  disclosure: "This independent interview exercise uses a hypothetical manufacturing scenario. Team size, budget, sensor volume, reliability, latency, and accuracy are scenario inputs or targets. They represent planning assumptions.",
  evidenceStatus: "Published",
  sourceBasis: [
    "IoT Data Processing with Apache Kafka Project Deck",
    "IoT Data Processing with Apache Kafka Project Plan",
    "IoT Data Processing with Apache Kafka Status Report",
  ],
  tags: ["Technical program management", "Kafka", "AWS", "Dependencies", "RACI", "RAID", "Recovery planning"],
  publicationDate: "September 2026",
  visibility: "public",
  artifacts: [
    {
      slug: "program-brief",
      label: "FRAME THE PROGRAM",
      title: "Program Brief",
      summary: "Frames the business need, system scope, stakeholders, delivery assumptions, and measurable targets for the exercise.",
      sections: [
        {
          title: "Source material and scope",
          state: "Observed fact",
          body: ["This exercise interprets three interview-case documents for a hypothetical program. It demonstrates how I would structure and recover the work."],
          table: { headers: ["Source", "Contribution"], rows: [
            ["Project deck", "Business scenario, proposed architecture, team model, and target outcomes"],
            ["Project plan", "Scope, milestones, dependencies, RACI, and modeled resourcing"],
            ["Status report", "Simulated delivery checkpoint, delayed cloud workstream, and proposed recovery"],
          ] },
        },
        {
          title: "Program decision",
          state: "Interpretation",
          body: ["The central program decision is how to create a governed path from device messages to timely operational visibility while sequencing cloud, security, testing, and handoff dependencies."],
        },
        {
          title: "Scenario assumptions",
          state: "Scenario assumption",
          table: { headers: ["Assumption", "How it shapes the plan"], rows: [
            ["Fortune 500 food manufacturer with 30+ facilities", "Requires common interfaces and cross-site rollout thinking"],
            ["More than 100,000 installed IoT sensors", "Makes ingestion capacity, interface consistency, and cross-site rollout central design concerns"],
            ["15 modeled FTE and $1.44M modeled budget", "Creates explicit capacity, cost, and accountability constraints"],
            ["Six-month delivery window across twelve sprints", "Requires dependency-first sequencing and staged acceptance"],
          ] },
        },
        {
          title: "Proposed reference architecture",
          state: "Scenario assumption",
          code: "IoT sensors -> MQTT / HiveMQ -> Kafka Connect -> Kafka Streams\n                                             -> AWS DynamoDB\n                                             -> Grafana dashboards",
          body: ["The exercise proposes this reference architecture. The delivery plan treats ingestion, stream processing, cloud storage, visualization, security, testing, and documentation as linked workstreams."],
        },
        {
          title: "Goals and target conditions",
          state: "Target",
          table: { headers: ["Target", "Required evidence"], rows: [
            ["99.99% ingestion reliability", "Defined measurement window, failure denominator, and observed results"],
            ["Under one-second anomaly detection", "End-to-end latency definition and representative load test"],
            ["Scale beyond 200,000 sensors", "Capacity model and validated performance test"],
            ["Greater than 95% alert accuracy", "Labeled evaluation set, class balance, and false-positive/negative costs"],
            ["Security compliance", "Named control set, control owner, evidence, and approval boundary"],
          ] },
        },
        {
          title: "Scope and non-goals",
          state: "Scenario assumption",
          table: { headers: ["In scope", "Out of scope"], rows: [
            ["Pipeline architecture and IoT integration", "Sensor firmware and device redesign"],
            ["Kafka ingestion and stream processing", "Advanced machine-learning development"],
            ["DynamoDB persistence and multi-region recovery", "Broad legacy-system or BI integration"],
            ["Grafana dashboards and operating KPIs", "Organization-wide training beyond handoff"],
            ["IAM, encryption, testing, and documentation", "Formal certification requires separate control evidence"],
          ] },
        },
        {
          title: "Stakeholder map",
          state: "Scenario assumption",
          table: { headers: ["Stakeholder", "Primary concern", "Program need"], rows: [
            ["Operations leadership", "Business continuity and useful alerts", "Outcome definition and rollout approval"],
            ["IoT and data engineering", "Device interfaces, schemas, and stream behavior", "Contracts and integration sequence"],
            ["Cloud and platform", "Storage, recovery, capacity, and observability", "Early critical-path ownership"],
            ["Security", "Identity, encryption, access, and evidence", "Controls embedded before late-stage approval"],
            ["QA and site users", "End-to-end reliability and usable dashboards", "Representative scenarios and acceptance"],
          ] },
        },
      ],
    },
    {
      slug: "integrated-delivery-plan",
      label: "SEQUENCE THE WORK",
      title: "Integrated Delivery Plan",
      summary: "Turns the six-month scenario into dependency-led workstreams, stage gates, acceptance criteria, and a plan that exposes critical-path risk early.",
      sections: [
        {
          title: "Planning basis",
          state: "Scenario assumption",
          body: ["The source plan covers six months and twelve two-week sprints. Its milestone dates and groupings vary across documents, so this version preserves the dependency logic and calls out the inconsistencies."],
        },
        {
          title: "Dependency-led sequence",
          state: "Interpretation",
          table: { headers: ["Phase", "Primary work", "Exit gate"], rows: [
            ["1 · Define", "Use cases, source inventory, architecture, NFRs, security requirements", "Architecture and measurable acceptance baseline approved"],
            ["2 · Connect", "MQTT/HiveMQ and Kafka Connect integration, topic and schema conventions", "Representative device event is traceable through ingestion"],
            ["3 · Process", "Kafka Streams transformations and anomaly rules", "Known scenarios produce expected stream outputs"],
            ["4 · Persist", "DynamoDB model, retention, multi-region recovery, Kafka-to-AWS integration", "Data is queryable and recovery behavior is tested"],
            ["5 · Observe", "Grafana dashboards, operating metrics, alerts, and support telemetry", "Users can interpret current and degraded states"],
            ["6 · Assure", "Security review, performance, failover, documentation, and handoff", "Named owners accept evidence and residual risk"],
          ] },
        },
        {
          title: "Critical-path logic",
          state: "Interpretation",
          bullets: [
            "Cloud storage design must start before upstream streaming is declared complete because persistence blocks integration, dashboards, recovery, and end-to-end testing.",
            "Security requirements begin in architecture and interface reviews and continue through approval.",
            "Dashboard acceptance depends on stable metric definitions and representative persisted data.",
            "Documentation and operating handoff develop alongside each workstream.",
          ],
        },
        {
          title: "Stage gates",
          state: "Proposed change",
          table: { headers: ["Gate", "Required evidence", "Decision owner"], rows: [
            ["Architecture ready", "Interfaces, NFRs, security boundaries, cost assumptions, and failure modes", "Architecture owner and sponsor"],
            ["Ingestion ready", "Schema validation, source reconciliation, error handling, and replay test", "Data/IoT lead"],
            ["Cloud path ready", "Data model, throughput test, recovery behavior, IAM, and encryption", "Cloud lead and security"],
            ["End-to-end ready", "Traceable event, dashboard correctness, alert behavior, and failure scenarios", "QA lead and product owner"],
            ["Pilot ready", "Runbook, monitoring, rollback, training, support, and accepted residual risks", "Program sponsor"],
          ] },
        },
        {
          title: "Acceptance contract",
          state: "Proposed change",
          table: { headers: ["Workstream", "Acceptance condition"], rows: [
            ["Device ingestion", "Known and malformed messages follow the agreed schema and error path"],
            ["Stream processing", "Rules are versioned, testable, and tied to an alert owner"],
            ["Cloud persistence", "Partitioning, retention, capacity, failure, and recovery are demonstrated"],
            ["Visualization", "KPIs reconcile to source events and expose freshness"],
            ["Security", "Named controls have evidence, owner, status, and exception path"],
            ["Operations", "Support ownership, alerts, runbooks, rollback, and escalation are usable"],
          ] },
        },
      ],
    },
    {
      slug: "program-governance",
      label: "GOVERN DELIVERY",
      title: "Program Governance Pack",
      summary: "Makes accountability, dependencies, risks, decisions, escalation, and launch readiness visible across a modeled multi-team program.",
      sections: [
        {
          title: "Operating model",
          state: "Interpretation",
          body: ["The source names development, test, cloud, IoT, data, security, documentation, customer, and stakeholder roles. This operating model assigns each group clear decisions, evidence, and escalation paths."],
        },
        {
          title: "RACI",
          state: "Scenario assumption",
          table: { headers: ["Decision", "Responsible", "Accountable", "Consulted", "Informed"], rows: [
            ["Product scope and outcome", "Product lead", "Executive sponsor", "Operations, TPM, architecture", "Delivery teams"],
            ["Architecture and interfaces", "Architecture and technical leads", "Chief architect", "Security, data, cloud, IoT", "TPM"],
            ["Integrated plan and dependencies", "TPM", "Program sponsor", "All workstream leads", "Stakeholders"],
            ["Security acceptance", "Security lead", "Risk owner", "Architecture, cloud, application", "Sponsor"],
            ["Quality and release evidence", "QA lead", "Product owner", "Engineering and operations", "Sponsor"],
            ["Pilot and rollback decision", "TPM and operations", "Executive sponsor", "Product, engineering, security", "Sites and support"],
          ] },
        },
        {
          title: "RAID log",
          state: "Interpretation",
          table: { headers: ["Type", "Item", "Trigger", "Response"], rows: [
            ["Risk", "Cloud storage falls behind ingestion", "Design or environment misses gate", "Escalate immediately; add cloud architecture capacity; resequence dependent work"],
            ["Risk", "Targets lack measurable definitions", "Gate review lacks a denominator or environment", "Measurement contract is an approval entry criterion"],
            ["Risk", "Security becomes a final-stage surprise", "Controls or owners remain undefined after architecture", "Embed security work in each interface and stage gate"],
            ["Risk", "Dashboard proceeds on unstable data contracts", "Metric reconciliation fails", "Use contract fixtures and defer user acceptance"],
            ["Assumption", "Modeled staffing is available when required", "Named owner lacks committed capacity", "Replan scope or schedule and publish the tradeoff"],
            ["Dependency", "Testing requires integrated source, processing, storage, and UI paths", "Any upstream gate misses", "Protect an integration environment and track recovery on the critical path"],
          ] },
        },
        {
          title: "Communication and escalation",
          state: "Proposed change",
          table: { headers: ["Cadence", "Audience", "Decision content"], rows: [
            ["Daily workstream sync", "Affected technical leads", "Blocker, owner, next evidence, expected recovery"],
            ["Twice-weekly dependency review", "TPM and workstream owners", "Cross-team handoffs, aging decisions, and critical-path movement"],
            ["Sprint review", "Product, operations, engineering, QA", "Demonstrated capability against acceptance criteria"],
            ["Weekly executive status", "Sponsor and customer stakeholders", "Outcome, schedule, budget, top risks, asks, and forecast"],
            ["Gate review", "Named approvers", "Results, exceptions, residual risk, and release decision"],
          ] },
        },
        {
          title: "Decision log",
          state: "Interpretation",
          table: { headers: ["Decision", "Rationale", "Revisit trigger"], rows: [
            ["Treat cloud persistence as an early critical path", "It blocks recovery, dashboards, integration, and end-to-end proof", "Validated alternative removes dependency"],
            ["Use staged acceptance", "Operating workflow proof requires integrated behavior", "Pilot results support a lighter gate"],
            ["Separate targets from results", "Measured execution establishes delivered performance", "After the first measured run"],
            ["Report schedule confidence with the nominal end date", "A retained date can hide dependency compression", "Critical-path confidence changes"],
          ] },
        },
        {
          title: "Launch readiness",
          state: "Proposed change",
          bullets: [
            "Business workflow, alert owner, and success metric are accepted.",
            "Architecture and data contracts are versioned and traceable.",
            "Ingestion, processing, persistence, dashboard, and failure paths pass integrated tests.",
            "Security controls, evidence, exceptions, and residual risks have named owners.",
            "Capacity, recovery, monitoring, runbooks, support, and rollback are demonstrated.",
            "Scenario targets are replaced by measured results before external claims are made.",
          ],
        },
      ],
    },
    {
      slug: "status-recovery",
      label: "RECOVER THE PLAN",
      title: "Status & Recovery Memo",
      summary: "Reframes the simulated red status around critical-path impact, a time-bounded recovery plan, decision asks, and honest confidence in the delivery date.",
      sections: [
        {
          title: "Checkpoint status",
          state: "Scenario assumption",
          body: ["At the exercise's March 31 checkpoint, the program was marked behind because DynamoDB and Kafka-to-AWS integration were delayed. MQTT, Kafka Connect, and streaming work were described as implemented inside the scenario; none of these statements represents real client delivery."],
        },
        {
          title: "What the delay changes",
          state: "Interpretation",
          table: { headers: ["Impact", "Reason"], rows: [
            ["Cloud milestone", "Storage design and integration remain in progress"],
            ["Dashboard confidence", "Visualization depends on stable persisted data and metric definitions"],
            ["End-to-end testing", "The full event path and recovery behavior remain pending"],
            ["Security and operational readiness", "IAM, encryption, recovery, monitoring, and evidence depend on the cloud path"],
            ["June 20 confidence", "The nominal date may remain, but downstream contingency has narrowed"],
          ] },
        },
        {
          title: "Recovery plan",
          state: "Proposed change",
          table: { headers: ["Action", "Owner", "Evidence", "Escalation trigger"], rows: [
            ["Add AWS architecture capacity", "Program sponsor / cloud lead", "Named resource and committed allocation", "Resource activation misses the agreed window"],
            ["Lock DynamoDB access and data model decisions", "Cloud, data, security", "Decision record and executable contract test", "Decision ages beyond two working days"],
            ["Create a thin Kafka-to-DynamoDB vertical slice", "Streaming and cloud leads", "Traceable test event persisted and queried", "Slice misses recovery checkpoint"],
            ["Run dashboard work against fixtures", "Data and visualization leads", "Metric definitions and contract fixtures", "Schema changes continue outside the contract process"],
            ["Reforecast critical path twice weekly", "TPM", "Updated dependency plan and confidence", "Any downstream gate loses remaining float"],
          ] },
        },
        {
          title: "Executive status",
          state: "Interpretation",
          body: ["Status is red for cloud persistence and integration, and yellow for visualization, security, and test readiness. The recovery plan adds AWS architecture support and prioritizes a thin end-to-end slice. The June 20 target remains conditional on the cloud checkpoint."],
        },
        {
          title: "Plan-quality critique",
          state: "Observed fact",
          bullets: [
            "The source plan uses six milestones while the status report consolidates them into five.",
            "Visualization moves between milestone groupings, weakening trend comparison.",
            "Displayed dates and phase durations vary across the source documents.",
            "The report states a stable completion date while cloud storage blocks downstream integration and testing.",
            "The source uses the typo HiveHQ; the rendered architecture uses HiveMQ.",
            "Advanced machine learning is out of scope, so anomaly detection remains a rules or processing capability unless separately defined and evaluated.",
          ],
        },
        {
          title: "Decision asks",
          state: "Proposed change",
          bullets: [
            "Approve the additional AWS architecture capacity and accountable owner.",
            "Approve the thin vertical slice as the immediate recovery priority.",
            "Accept conditional date confidence until the cloud checkpoint passes.",
            "Choose which scope can move if the checkpoint fails and publish the effect on security and testing.",
          ],
        },
      ],
    },
  ],
});
