# Technical Architecture - Visual Diagrams
## AI-Powered QA Automation Platform

**Generated**: May 2026  
**Purpose**: Visual representation of system components, data flows, and integration points

---

## 1. Three-Layer Architecture Overview

```mermaid
graph TB
    subgraph Layer1["🎨 LAYER 1: User Interface & IDE"]
        IDE["VS Code IDE"]
        Chat["Copilot Chat"]
        Commands["Slash Commands<br/>/generate-test-cases<br/>/fetch-jira-details<br/>/generate-gherkin<br/>/early-defect-consolidator"]
        Workspace["Workspace<br/>(.claude, tests, features,<br/>jira-output, test-artifacts)"]
        
        IDE -.->|extensible| Chat
        IDE -.->|triggers| Commands
        IDE -.->|manages| Workspace
    end
    
    subgraph Layer2["🧠 LAYER 2: AI Intelligence & Orchestration"]
        Orchestrator["AI Orchestration Engine<br/>(Prompt Chaining,<br/>Context Management)"]
        
        subgraph Skills["Skills (Reusable Workflows)"]
            GenTests["generate-test-cases"]
            FetchJira["fetch-jira-details"]
            GenGherkin["generate-gherkin"]
            Defects["early-defect-consolidator"]
        end
        
        subgraph MCP["MCP Server Layer"]
            Planner["Playwright-<br/>Test-Planner"]
            Generator["Playwright-<br/>Test-Generator"]
            Healer["Playwright-<br/>Test-Healer"]
        end
        
        Models["AI Model Backends<br/>(Claude 3.5 Sonnet,<br/>GPT-4 Turbo)"]
        
        Orchestrator -->|routes| Skills
        Skills -->|uses| MCP
        MCP -->|calls| Models
    end
    
    subgraph Layer3["⚙️ LAYER 3: System Integration & Execution"]
        subgraph External["External Systems"]
            Jira["🔵 Jira<br/>(REST API v3)"]
            GitHub["⚫ GitHub/GitLab<br/>(VCS & CI/CD)"]
            TargetApp["🌐 Target App<br/>(HTTP/HTTPS)"]
        end
        
        subgraph Execution["Test Execution Engine"]
            Playwright["Playwright<br/>(Chromium)"]
            TestRunner["Node.js<br/>Test Runner"]
            Reporter["Reporter<br/>(HTML, JSON)"]
        end
        
        subgraph Persistence["Data Persistence"]
            Markdown["Markdown Reports<br/>(RTM, Coverage,<br/>Risk Analysis)"]
            JSON["JSON Results<br/>(Machine Readable)"]
            Logs["Execution Logs<br/>(Audit Trail)"]
        end
        
        External -.->|REST APIs| Execution
        Execution -->|writes| Persistence
    end
    
    Layer1 -->|API Gateway| Layer2
    Layer2 -->|REST APIs & Webhooks| Layer3
    
    style Layer1 fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style Layer2 fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Layer3 fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
```

---

## 2. End-to-End Workflow (Test Generation)

```mermaid
graph LR
    A["User Input<br/>/generate-test-cases<br/>TICKET:UWB-1<br/>URL:https://..."] 
    
    B["STEP 0:<br/>Input Parsing<br/>& Mode Detection"]
    
    C["STEP 0A:<br/>Load Jira Context<br/>(Acceptance Criteria)"]
    
    D["STEP 1:<br/>Browser Crawl<br/>(Playwright MCP)<br/>+ Screenshots"]
    
    E["STEP 2:<br/>Discrepancy<br/>Detection<br/>(Claude Analysis)"]
    
    F["STEP 3:<br/>Test Case<br/>Generation<br/>(Playwright Gen)"]
    
    G["STEP 4:<br/>Gherkin<br/>Feature<br/>Generation"]
    
    H["STEP 5:<br/>Report<br/>Generation<br/>(RTM, Coverage,<br/>Risk Analysis)"]
    
    I["Output:<br/>test-artifacts/<br/>TICKET>/"]
    
    A -->|validate| B
    B -->|if JIRA mode| C
    B -->|crawl app| D
    C -->|cross-reference| D
    D -->|compare spec vs app| E
    E -->|document issues| F
    F -->|structured specs| G
    G -->|BDD scenarios| H
    H -->|markdown + json| I
    
    style A fill:#e3f2fd
    style B fill:#fff9c4
    style C fill:#fff9c4
    style D fill:#fff9c4
    style E fill:#fff9c4
    style F fill:#fff9c4
    style G fill:#fff9c4
    style H fill:#fff9c4
    style I fill:#c8e6c9
```

---

## 3. Data Flow: Jira → AI → Tests → Defects

```mermaid
graph TB
    subgraph Jira["Jira (Golden Source)"]
        AC["Acceptance Criteria<br/>(AC-01...AC-18)"]
        DESC["Description"]
        COMM["Comments"]
        ATTACH["Attachments"]
    end
    
    subgraph Fetch["Fetch Phase<br/>(fetch-jira-details)"]
        APICall["REST API v3<br/>Call"]
        LocalCache["Local Cache<br/>(jira-output/)"]
    end
    
    subgraph GenPhase["Generation Phase<br/>(generate-test-cases)"]
        Enrich["Enrich with<br/>Live App Data"]
        GenTC["Generate<br/>Test Cases"]
        GenReport["Generate<br/>Reports"]
    end
    
    subgraph Defects["Defect Phase<br/>(early-defect-consolidator)"]
        Consolidate["Consolidate<br/>Discrepancies"]
        Validate["Validate vs<br/>Jira Reqs"]
        Review["Human Review"]
        CreateBug["Create Jira Bug"]
    end
    
    subgraph Output["Output Artifacts"]
        TC["Test Cases<br/>(*.md)"]
        GH["Gherkin<br/>(*.feature)"]
        RTM["RTM<br/>(traceability)"]
        COV["Coverage<br/>Report"]
        RISK["Risk<br/>Analysis"]
        DISC["Discrepancies<br/>(*.md)"]
        BUG["Jira Bugs<br/>(created)"]
    end
    
    Jira -->|API call| Fetch
    Fetch -->|cache| LocalCache
    LocalCache -->|read| GenPhase
    GenPhase -->|crawl| GenPhase
    GenPhase -->|output| Output
    Output -->|DISC-001...N| Defects
    LocalCache -->|read AC context| Defects
    Defects -->|validate| Defects
    Defects -->|pending approval| Review
    Review -->|FINAL_APPROVE| CreateBug
    CreateBug -->|update| Output
    
    style Jira fill:#bbdefb,stroke:#1565c0,stroke-width:2px
    style Fetch fill:#ffe0b2,stroke:#e65100,stroke-width:2px
    style GenPhase fill:#ffccbc,stroke:#bf360c,stroke-width:2px
    style Defects fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
    style Output fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
```

---

## 4. MCP Server Architecture

```mermaid
graph TB
    subgraph Claude["Claude AI Model<br/>(Sonnet / GPT-4)"]
        Tools["Requests Tool Calls"]
    end
    
    subgraph MCPProtocol["MCP Server Layer<br/>(Bridge Protocol)"]
        Registry["Tool Registry"]
        Router["Request Router"]
    end
    
    subgraph Servers["MCP Servers<br/>(Specialized Agents)"]
        Planner["Playwright<br/>Test Planner"]
        Generator["Playwright<br/>Test Generator"]
        Healer["Playwright<br/>Test Healer"]
    end
    
    subgraph PW["Playwright Framework"]
        Browser["Chromium<br/>Browser"]
        DOM["DOM Parser"]
        Recorder["Trace/Video<br/>Recorder"]
    end
    
    subgraph TargetApp["Target Application"]
        WebApp["Web App<br/>(HTTP/HTTPS)"]
    end
    
    Claude -->|tool_call| MCPProtocol
    MCPProtocol -->|route to server| Servers
    
    Planner -->|navigate<br/>analyze<br/>screenshot| PW
    Generator -->|generate code<br/>validate spec| PW
    Healer -->|replay<br/>debug<br/>fix| PW
    
    PW -->|interact| TargetApp
    PW -->|capture| Recorder
    
    style Claude fill:#fff9c4
    style MCPProtocol fill:#ffccbc
    style Servers fill:#ffe0b2
    style PW fill:#bbdefb
    style TargetApp fill:#f8bbd0
```

---

## 5. Requirements Traceability Matrix (RTM) Generation

```mermaid
graph LR
    subgraph Input["Input Data"]
        ACs["Jira ACs<br/>(AC-01...AC-18)"]
        TestCases["Generated Test Cases<br/>(NEWSUB-FUNC-001...)"]
        Results["Test Results<br/>(PASS/FAIL/SKIP)"]
    end
    
    subgraph Mapping["Mapping Phase<br/>(Claude Analysis)"]
        ACtoTC["Map AC ↔<br/>Test Case"]
        StatusMerge["Merge Status"]
    end
    
    subgraph Analysis["Analysis Phase"]
        Coverage["Calculate Coverage %"]
        GapAnalysis["Identify Gaps"]
        RiskRank["Risk Ranking"]
    end
    
    subgraph Output["RTM Artifact<br/>(reports/rtm.md)"]
        RTMTable["| AC | Test Cases | Status | Coverage |<br/>|---|---|---|---|<br/>| AC-01 | TC-001, TC-002 | PASS | FULL |<br/>| AC-02 | TC-003 | FAIL | PARTIAL |<br/>| ..."]
        Stats["Coverage: 89%<br/>Fully Covered: 16/18<br/>Gaps: 2"]
    end
    
    ACs --> ACtoTC
    TestCases --> ACtoTC
    Results --> StatusMerge
    ACtoTC --> StatusMerge
    StatusMerge --> Coverage
    Coverage --> GapAnalysis
    GapAnalysis --> RiskRank
    
    Coverage --> RTMTable
    GapAnalysis --> Stats
    RiskRank --> Stats
    
    style Input fill:#e3f2fd
    style Mapping fill:#fff9c4
    style Analysis fill:#ffccbc
    style Output fill:#c8e6c9
```

---

## 6. Discrepancy Detection & Defect Creation

```mermaid
stateDiagram-v2
    [*] --> GenerateTests: /generate-test-cases<br/>TICKET_ID
    
    GenerateTests --> CompareSpec: Step 1-2:<br/>Crawl app +<br/>Extract ACs
    CompareSpec --> IdentifyDiscrepancies: Compare<br/>Spec vs Actual
    
    IdentifyDiscrepancies --> DiscFile: Write to<br/>discrepancies.md<br/>(DISC-001...N)
    
    DiscFile --> ConsolidatorWait: /early-defect-consolidator<br/>TICKET_ID<br/>(Waiting for input)
    
    ConsolidatorWait --> ValidatePhase: Load discrepancies +<br/>Jira context
    ValidatePhase --> GenerateReview: Generate Review<br/>Report
    GenerateReview --> HumanReview: Present to<br/>Reviewer
    
    HumanReview --> Approved: FINAL_APPROVE<br/>response
    HumanReview --> Rejected: Reject or<br/>Request Changes
    
    Rejected --> UpdateDiscFile: Update<br/>discrepancies.md<br/>with feedback
    UpdateDiscFile --> GenerateReview
    
    Approved --> CreateBug: Auto-create<br/>Jira Bug
    CreateBug --> UpdateTraceability: Update<br/>Discrepancies.md<br/>with Bug Key
    UpdateTraceability --> [*]
    
    note right of IdentifyDiscrepancies
        Severity Classification:
        - Critical: Blocks feature
        - High: Breaks workflow
        - Medium: Workaround exists
        - Low: Cosmetic only
    end
    
    note right of HumanReview
        Review Approval Gate:
        - Only FINAL_APPROVE
          triggers Jira creation
        - Other responses loop
          back to feedback
    end
    
    style ConsolidatorWait fill:#fff9c4
    style HumanReview fill:#ffccbc
    style CreateBug fill:#c8e6c9
    style UpdateTraceability fill:#c8e6c9
```

---

## 7. CI/CD Integration Flow

```mermaid
graph TB
    Git["Git Event<br/>(Push / PR)"]
    
    GitHub["GitHub Actions<br/>Workflow Triggered"]
    
    Setup["Setup<br/>1. Checkout code<br/>2. Install deps<br/>3. Install browsers"]
    
    Test["Execute Tests<br/>npx playwright test<br/>--headed=false"]
    
    Results["Collect Results<br/>• HTML report<br/>• JSON results<br/>• Artifacts"]
    
    Report["Generate Report<br/>• Pass/Fail summary<br/>• Link to PR<br/>• Attach artifacts"]
    
    Decision{"All Tests<br/>Pass?"}
    
    Pass["✅ PASS<br/>Allow merge"]
    Fail["❌ FAIL<br/>Block merge<br/>Require re-run"]
    
    Archive["Archive Results<br/>(30 day retention)"]
    
    Git --> GitHub
    GitHub --> Setup
    Setup --> Test
    Test --> Results
    Results --> Report
    Report --> Decision
    Decision -->|Yes| Pass
    Decision -->|No| Fail
    Pass --> Archive
    Fail --> Archive
    
    style Git fill:#f8bbd0
    style GitHub fill:#e1bee7
    style Setup fill:#ffe0b2
    style Test fill:#ffccbc
    style Results fill:#bbdefb
    style Report fill:#c8e6c9
    style Decision fill:#fff9c4
    style Pass fill:#81c784
    style Fail fill:#e57373
```

---

## 8. Component Interaction Matrix

```mermaid
graph TB
    subgraph IDE["🎨 IDE Layer"]
        VSCode["VS Code"]
        Copilot["Copilot Chat"]
        Skills["Skills Library"]
    end
    
    subgraph AI["🧠 AI Layer"]
        Orch["Orchestrator"]
        Models["Claude/GPT-4"]
        Context["Context Manager"]
    end
    
    subgraph Execution["⚙️ Execution Layer"]
        PW["Playwright"]
        Runner["Test Runner"]
        Reporter["Reporter"]
    end
    
    subgraph Systems["🔌 External Systems"]
        Jira["Jira API"]
        GitHub["GitHub API"]
        App["Target App"]
    end
    
    VSCode -->|triggers| Skills
    Copilot -->|queries| Models
    Skills -->|activates| Orch
    Orch -->|orchestrates| Execution
    Orch -->|enriches| Context
    Context -->|fetches from| Systems
    
    PW -->|interacts| App
    PW -->|reports to| Reporter
    Runner -->|executes| PW
    Reporter -->|logs to| Systems
    
    Models -->|calls| Systems
    Models -->|analyzes| Context
    
    Jira -->|provides| Context
    GitHub -->|stores| IDE
    
    style IDE fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style AI fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Execution fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style Systems fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
```

---

## 9. Workspace File Structure

```mermaid
graph TD
    Root["First_Project_Agentic/"]
    
    Root -->|AI Config| Claude[".claude/"]
    Claude -->|Workflows| Skills["skills/<br/>generate-test-cases.md<br/>fetch-jira-details.md<br/>generate-gherkin.md<br/>early-defect-consolidator.md"]
    Claude -->|Commands| Commands["commands/<br/>...same as skills"]
    Claude -->|Agents| Agents["agents/<br/>custom definitions"]
    
    Root -->|Jira Data| JiraOut["jira-output/"]
    JiraOut -->|Per Ticket| JiraTicket["&lt;TICKET-ID>/"]
    JiraTicket -->|Structured| JiraStruct["Summary/<br/>Comments/<br/>Attachments/<br/>Metadata/"]
    JiraTicket -->|Consolidated| Context["complete_ticket_context.md"]
    
    Root -->|Test Output| Artifacts["test-artifacts/"]
    Artifacts -->|Per Ticket| ArtTicket["&lt;TICKET-ID>/"]
    ArtTicket -->|Analysis| Analysis["application-analysis/<br/>app-analysis.md<br/>discrepancies.md"]
    ArtTicket -->|Test Cases| TestCases["test-cases/<br/>functional/<br/>smoke/<br/>boundary/<br/>accessibility/"]
    ArtTicket -->|Reports| Reports["reports/<br/>rtm.md<br/>coverage-report.md<br/>risk-analysis.md"]
    ArtTicket -->|Logs| Logs["logs/<br/>execution.log"]
    
    Root -->|Specs| Tests["tests/"]
    Tests -->|Per Ticket| TestTicket["&lt;TICKET-ID>/<br/>functional/"]
    TestTicket -->|Executable| Specs["*.spec.ts<br/>helpers.ts"]
    
    Root -->|Scenarios| Features["features/"]
    Features -->|Per Ticket| Feature["&lt;TICKET-ID>.feature"]
    
    Root -->|Config| Config["playwright.config.ts<br/>tsconfig.json<br/>package.json<br/>.env"]
    
    style Root fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Claude fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style JiraOut fill:#ffe0b2,stroke:#e65100,stroke-width:2px
    style Artifacts fill:#ffccbc,stroke:#bf360c,stroke-width:2px
    style Tests fill:#bbdefb,stroke:#0d47a1,stroke-width:2px
    style Features fill:#c8e6c9,stroke:#1b5e20,stroke-width:2px
    style Config fill:#f8bbd0,stroke:#880e4f,stroke-width:2px
```

---

## 10. Security & Authentication Flow

```mermaid
graph LR
    subgraph Client["Client (IDE)"]
        User["QA Engineer"]
        IDE["VS Code"]
    end
    
    subgraph Auth["Authentication Layer"]
        EnvFile[".env<br/>(Local)"]
        Credentials["Jira API Token<br/>Test User Pwd"]
    end
    
    subgraph Secure["Secure Communication"]
        HTTPS["HTTPS/TLS"]
        BasicAuth["Basic Auth<br/>(Base64)"]
        APIToken["API Token<br/>(Scoped)"]
    end
    
    subgraph Systems["External Systems"]
        JiraAPI["Jira API<br/>(Atlassian)"]
        TargetApp["Target App<br/>(QA Env)"]
    end
    
    subgraph Logging["Audit Logging"]
        Logs["execution.log<br/>(No credentials)"]
        GitLog["Git commit log<br/>(Who changed what)"]
    end
    
    User -->|runs commands| IDE
    IDE -->|reads| EnvFile
    EnvFile -->|contains| Credentials
    Credentials -->|encodes| BasicAuth
    BasicAuth -->|transmits via| HTTPS
    HTTPS -->|connects to| JiraAPI
    IDE -->|sends test data| TargetApp
    
    APIToken -->|scoped to| JiraAPI
    JiraAPI -->|restricted permissions| JiraAPI
    
    IDE -->|logs activity| Logs
    User -->|commits code| GitLog
    
    style Client fill:#e3f2fd
    style Auth fill:#fff9c4
    style Secure fill:#ffccbc
    style Systems fill:#c8e6c9
    style Logging fill:#f8bbd0
```

---

## 11. Skill Execution Lifecycle

```mermaid
stateDiagram-v2
    [*] --> UserTriggers: User runs slash command
    
    UserTriggers --> ParseInput: Parse & validate input
    ParseInput --> CheckPrecond: Check prerequisites
    
    CheckPrecond --> PrecondMet: Preconditions met?
    PrecondMet -->|No| FailPrecond: Fail - missing data
    FailPrecond --> [*]
    
    PrecondMet -->|Yes| LoadContext: Load context<br/>(Jira, app data)
    LoadContext --> ContextLoaded: Context ready?
    ContextLoaded -->|Partial| WarnPartial: Warn: partial data
    ContextLoaded -->|Full| ProcessStep
    
    WarnPartial --> ProcessStep: Continue with<br/>partial context
    
    ProcessStep --> StepLoop: Execute step 1..N
    StepLoop -->|More steps| StepExec: Execute step
    StepExec -->|error?| ErrorHandle: Error handler
    ErrorHandle -->|recoverable| Retry: Retry step
    ErrorHandle -->|fatal| FailStep: Fail - critical error
    
    Retry -->|success| LogStep: Log step completion
    StepExec -->|success| LogStep
    LogStep --> NextStep: Next step?
    NextStep -->|Yes| StepLoop
    NextStep -->|No| FinalSteps
    
    FinalSteps --> GenOutput: Generate output artifacts
    GenOutput --> WriteFiles: Write to filesystem
    WriteFiles --> UpdateCache: Update caches
    UpdateCache --> Complete: Skill complete ✅
    Complete --> [*]
    
    FailPrecond --> [*]
    FailStep --> [*]
    Complete --> [*]
    
    note right of ParseInput
        Examples:
        - Parse ticket ID
        - Extract app URL
        - Detect mode (JIRA/URL/BOTH)
    end
    
    note right of ErrorHandle
        Examples:
        - Jira API timeout
        - Browser crash
        - Invalid selector
        - Network error
    end
    
    note right of GenOutput
        Generates:
        - Markdown reports
        - JSON results
        - Gherkin features
        - Test artifacts
    end
```

---

## 12. Technology Stack Pyramid

```mermaid
graph TB
    subgraph Tier1["User Layer"]
        VS["🎨 VS Code"]
        CHAT["💬 Copilot Chat"]
    end
    
    subgraph Tier2["Intelligence Layer"]
        CLAUDE["🧠 Claude 3.5 Sonnet"]
        GPT["🧠 GPT-4 Turbo"]
        MCP["🔗 Model Context Protocol"]
    end
    
    subgraph Tier3["Orchestration Layer"]
        SKILLS["📋 Skills Engine"]
        AGENTS["🤖 Custom Agents"]
        PROMPTS["📝 Prompt Chain Manager"]
    end
    
    subgraph Tier4["Execution Layer"]
        PW["🎭 Playwright"]
        TYPESCRIPT["📘 TypeScript"]
        NODE["⚡ Node.js"]
    end
    
    subgraph Tier5["Integration Layer"]
        JIRA["🔵 Jira REST v3"]
        GITHUB["⚫ GitHub/GitLab"]
        APP["🌐 HTTP/HTTPS"]
    end
    
    subgraph Tier6["Data Layer"]
        MD["📄 Markdown"]
        JSON["📊 JSON"]
        GH["🥒 Gherkin"]
    end
    
    Tier1 -.->|API| Tier2
    Tier2 -.->|MCP| Tier3
    Tier3 -.->|Execute| Tier4
    Tier4 -.->|HTTP| Tier5
    Tier5 -.->|Store| Tier6
    
    style Tier1 fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style Tier2 fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Tier3 fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style Tier4 fill:#ffe0b2,stroke:#e65100,stroke-width:2px
    style Tier5 fill:#f8bbd0,stroke:#880e4f,stroke-width:2px
    style Tier6 fill:#c8e6c9,stroke:#1b5e20,stroke-width:2px
```

---

## 13. Deployment Architecture (Future State)

```mermaid
graph TB
    subgraph Dev["Development"]
        LocalIDE["Developer IDE<br/>(Local .env)"]
    end
    
    subgraph CI["Continuous Integration"]
        GHActions["GitHub Actions<br/>Workflow"]
        Tests["Run Tests<br/>(Headless)"]
        Reports["Generate Reports"]
    end
    
    subgraph QA["QA Environment"]
        QAApp["QA Target App<br/>(Staging)"]
        QAJira["QA Jira Instance"]
    end
    
    subgraph Prod["Production (Future)"]
        ProdApp["Prod Target App"]
        ProdJira["Prod Jira"]
    end
    
    subgraph Artifacts["Artifact Storage"]
        S3["AWS S3 / GCS<br/>(Test artifacts)"]
        Registry["Artifact Registry<br/>(Docker images)"]
    end
    
    LocalIDE -->|git push| GHActions
    GHActions -->|install & build| Tests
    Tests -->|test against| QAApp
    Tests -->|fetch from| QAJira
    Tests -->|generate| Reports
    Reports -->|upload| S3
    Reports -->|link| GHActions
    
    QAApp -.->|promote to| ProdApp
    QAJira -.->|replicate to| ProdJira
    
    style Dev fill:#c8e6c9
    style CI fill:#fff9c4
    style QA fill:#ffe0b2
    style Prod fill:#f8bbd0
    style Artifacts fill:#bbdefb
```

---

## 14. Monitoring & Observability

```mermaid
graph TB
    subgraph Sources["Data Sources"]
        ExecLog["execution.log"]
        TestResults["test-results/*.json"]
        Artifacts["test-artifacts/"]
        JiraLogs["jira-output/*/Logs/"]
    end
    
    subgraph Collection["Collection"]
        Parser["Log Parser"]
        JSONReader["JSON Reader"]
        ArtifactReader["Artifact Reader"]
    end
    
    subgraph Metrics["Metrics & KPIs"]
        Coverage["📊 Coverage %"]
        PassRate["✅ Pass Rate %"]
        DiscCount["🐛 Discrepancy Count"]
        RTMStatus["📋 RTM Status"]
        ExecTime["⏱️ Execution Time"]
    end
    
    subgraph Dashboard["Dashboard & Alerts"]
        Report["📈 Visual Report"]
        Alerts["🔔 Alerts"]
        Trends["📉 Trend Analysis"]
    end
    
    subgraph Action["Action Items"]
        Review["Code Review"]
        Escalate["Escalate Issues"]
        Optimize["Performance Tuning"]
    end
    
    ExecLog --> Parser
    TestResults --> JSONReader
    Artifacts --> ArtifactReader
    JiraLogs --> Parser
    
    Parser -->|extract| Metrics
    JSONReader -->|calculate| Metrics
    ArtifactReader -->|summarize| Metrics
    
    Metrics --> Report
    Metrics --> Alerts
    Metrics --> Trends
    
    Report -.->|view| Dashboard
    Alerts -.->|notify| Action
    Trends -.->|identify patterns| Action
    
    style Sources fill:#e3f2fd
    style Collection fill:#fff9c4
    style Metrics fill:#ffccbc
    style Dashboard fill:#c8e6c9
    style Action fill:#f8bbd0
```

---

## Glossary

| Term | Definition |
|------|-----------|
| **AC** | Acceptance Criterion from Jira ticket |
| **BDD** | Behavior-Driven Development (Gherkin format) |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **Gherkin** | Feature specification language (Given/When/Then) |
| **MCP** | Model Context Protocol (AI tool bridging) |
| **RTM** | Requirements Traceability Matrix |
| **Skill** | Reusable AI workflow (`.claude/skills/`) |
| **Slack Command** | `/command` invoked in VS Code |
| **Test Case** | Individual test specification (TC-001, etc.) |
| **Discrepancy** | Deviation between spec and app (DISC-001, etc.) |

---

**End of Visual Diagrams Document**

---

*For detailed explanations of each component, refer to [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)*
