/* The work. `group` drives the sections and the filter chips on /projects.
   Partner names are deliberately generic: describe the work, not the logo. */
window.PROJECTS = [
  { icon:"search", n:"Online Reindexing for OpenSearch", group:"Agents &amp; Infrastructure", org:"Industry project",
    art:"search-index", k:"graph", seed:17, feat:true,
    t:"Zero-downtime reindexing for OpenSearch clusters running vector search and inverted index workloads. Idempotent operations, parallel workers, and concurrent reads and writes across tens of millions of documents.",
    tags:["OpenSearch","Vector search","Inverted index","Idempotency","Parallel workers"] },

  { icon:"experiment", n:"Autoresearch Agent", group:"Agents &amp; Infrastructure", org:"Industry project",
    art:"research-loop", k:"curve", seed:44, feat:true,
    t:"An agent that proposes its own model and prompt improvements, runs the experiments, and scores results against a baseline. Reported gains of 55% on prompt accuracy and 26% on model accuracy.",
    tags:["Agents","Evals","Prompt optimization"] },

  { icon:"code", n:"Coding-Agent Harness", group:"Agents &amp; Infrastructure", org:"Internal",
    art:"coding-agent", k:"grid", seed:5, feat:true,
    t:"An autonomous software engineering agent that navigates a repository, reproduces the bug, writes a patch, and validates it by running the tests. Iterative tool use and execution loops, 52.4% resolve rate on SWE-bench Lite.",
    tags:["SWE-bench","Tool use","Sandboxed execution"] },

  { icon:"power", n:"Grid Contingency Agent", group:"Agents &amp; Infrastructure", org:"With an energy technology company",
    k:"graph", seed:58,
    t:"An MCP-based agent that turns a natural language request into a structured power grid contingency analysis, wiring model reasoning to real engineering tools.",
    tags:["MCP","FastAPI","Semantic Kernel","Azure"] },

  { icon:"monitor", n:"Behavioral Sentinels", group:"Reliability &amp; Memory Research", org:"Internal research",
    k:"scatter", seed:91,
    t:"A study of how agents degrade over long interactions, across 8,894 LLM trajectories and 22 monitoring designs. Covers failure prediction, observer effects, context degradation, and recovery through deterministic re-grounding.",
    tags:["8,894 trajectories","Monitoring","Failure prediction"] },

  { icon:"memory", n:"Adaptive Memory &amp; Personalization", group:"Reliability &amp; Memory Research", org:"Internal research",
    k:"scatter", seed:23,
    t:"A research prototype asking how a system can retain what turns out to be useful and personalize itself over time, using selective memory, continual adaptation, LoRA adapters, and hypernetwork-generated weight updates.",
    tags:["LoRA","Hypernetworks","Continual learning"] },

  { icon:"fire", n:"FireGuard", group:"Applied ML", org:"First-author publication, Energies",
    k:"scatter", seed:74,
    t:"A geospatial system for identifying wildfire risk across electrical grid infrastructure, using HDBSCAN, PCA-weighted features and spatial modeling. Presented to government and utility stakeholders.",
    tags:["HDBSCAN","PCA","Geospatial"] },

  { icon:"health", n:"HemoHealth", group:"Applied ML", org:"Four hospital collaborators",
    k:"bars", seed:66,
    t:"Non-invasive anemia screening using computer vision and spectroscopy over eyelid imagery. Advanced to the Rise Global Finals.",
    tags:["Computer vision","Spectroscopy","Clinical data"] },

  { icon:"underwriting", n:"LLM-Assisted Underwriting", group:"Applied ML", org:"With a fintech startup",
    k:"grid", seed:31,
    t:"Extracting, structuring and reasoning over the financial information an underwriting decision rests on, built into a real decision pipeline rather than a standalone demo.",
    tags:["Extraction","Structured output","Fintech"] },

  { icon:"transactions", n:"Transaction Classification", group:"Applied ML", org:"With a fintech startup",
    k:"bars", seed:7,
    t:"Automatic categorization of financial transactions inside a consumer fintech app. Built and evaluated the full classification pipeline to roughly 90% accuracy.",
    tags:["Classification","~90% accuracy","Pipeline"] }
];
