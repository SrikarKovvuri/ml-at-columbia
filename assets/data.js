/* The work. `group` drives the sections and the filter chips on /projects.
   Partner names are deliberately generic — describe the work, not the logo. */
window.PROJECTS = [
  { n:"Online Reindexing for RAG", group:"Agents &amp; Infrastructure", org:"With a big tech company",
    k:"graph", seed:17, feat:true,
    t:"Reindexing infrastructure for large-scale RAG and vector search, so embedding models, chunking strategies and index configs can change without downtime. Migration ran as background re-embedding, validation, dual writes and cutover across tens of millions of documents.",
    tags:["Vector search","Dual writes","Zero-downtime cutover"] },

  { n:"Autoresearch Agent", group:"Agents &amp; Infrastructure", org:"With a big tech company",
    k:"curve", seed:44, feat:true,
    t:"An agent that proposes its own model and prompt improvements, runs the experiments, and scores results against a baseline. Reported gains of 55% on prompt accuracy and 26% on model accuracy.",
    tags:["Agents","Evals","Prompt optimization"] },

  { n:"Coding-Agent Harness", group:"Agents &amp; Infrastructure", org:"Internal",
    k:"grid", seed:5, feat:true,
    t:"An autonomous software-engineering agent that navigates a repository, reproduces the bug, writes a patch and validates it by running the tests. Iterative tool-use and execution loops, 52.4% resolve rate on SWE-bench Lite.",
    tags:["SWE-bench","Tool use","Sandboxed execution"] },

  { n:"Grid Contingency Agent", group:"Agents &amp; Infrastructure", org:"With an energy technology company",
    k:"graph", seed:58,
    t:"An MCP-based agent that turns a natural-language request into a structured power-grid contingency analysis, wiring model reasoning to real engineering tools.",
    tags:["MCP","FastAPI","Semantic Kernel","Azure"] },

  { n:"Behavioral Sentinels", group:"Reliability &amp; Memory Research", org:"Internal research",
    k:"scatter", seed:91,
    t:"How do agents degrade over long interactions? We looked at 8,894 LLM trajectories and 22 monitoring designs, studying failure prediction, observer effects, context degradation, and recovery through deterministic re-grounding.",
    tags:["8,894 trajectories","Monitoring","Failure prediction"] },

  { n:"Adaptive Memory &amp; Personalization", group:"Reliability &amp; Memory Research", org:"Internal research",
    k:"scatter", seed:23,
    t:"A research prototype asking how a system can keep what turns out to be useful and personalize itself over time — selective memory, continual adaptation, LoRA adapters, and hypernetwork-generated weight updates.",
    tags:["LoRA","Hypernetworks","Continual learning"] },

  { n:"FireGuard", group:"Applied ML", org:"First-author publication, Energies",
    k:"scatter", seed:74,
    t:"A geospatial system for finding wildfire risk across electrical-grid infrastructure, using HDBSCAN, PCA-weighted features and spatial modeling. Presented to government and utility stakeholders.",
    tags:["HDBSCAN","PCA","Geospatial"] },

  { n:"HemoHealth", group:"Applied ML", org:"Four hospital collaborators",
    k:"bars", seed:66,
    t:"Screening for anemia without a needle: computer vision and spectroscopy over eyelid imagery. Advanced to the Rise Global Finals.",
    tags:["Computer vision","Spectroscopy","Clinical data"] },

  { n:"LLM-Assisted Underwriting", group:"Applied ML", org:"With a fintech startup",
    k:"grid", seed:31,
    t:"Extracting, structuring and reasoning over the financial information an underwriting decision actually rests on — built into a real decision pipeline rather than a standalone demo.",
    tags:["Extraction","Structured output","Fintech"] },

  { n:"Transaction Classification", group:"Applied ML", org:"With a fintech startup",
    k:"bars", seed:7,
    t:"Automatically categorizing financial transactions inside a consumer fintech app. Built and evaluated the full classification pipeline to roughly 90% accuracy.",
    tags:["Classification","~90% accuracy","Pipeline"] }
];
