---
title: 'AI Skills System'
---

This guide explains the AI Skills system that provides on-demand context and patterns to AI agents working with the QuizApp codebase.

<Info>
**What are AI Skills?** Skills are structured instructions that help AI agents (Claude Code, Cursor, Copilot, etc.) understand QuizApp's conventions, patterns, and best practices.
</Info>

## Architecture Overview

```mermaid
graph LR
    subgraph FLOW["AI Skills Architecture"]
        A["AI Agent"] -->|"1. matches trigger"| B["AGENTS.md"]
        B -->|"2. loads"| C["Skill"]
        C -->|"3. provides"| D["Patterns<br/>Templates<br/>Commands"]
        C -->|"4. references"| E["Local Docs"]
        D --> F["Correct Output"]
        E --> F
    end

    style A fill:#1e3a5f,stroke:#4a9eff,color:#fff
    style B fill:#5c4d1a,stroke:#ffd700,color:#fff
    style C fill:#1a4d1a,stroke:#4caf50,color:#fff
    style E fill:#4a1a4d,stroke:#ba68c8,color:#fff
    style F fill:#1a4d2e,stroke:#66bb6a,color:#fff
```

## How It Works

```mermaid
sequenceDiagram
    participant U as User
    participant A as AI Agent
    participant R as AGENTS.md
    participant S as Skill
    participant AS as assets/
    participant RF as references/
    participant D as Local Docs

    U->>A: "Create a quiz component"

    Note over A: Analyze request context

    A->>R: Find matching skill trigger
    R-->>A: quizapp-ui matches

    A->>S: Load SKILL.md
    S-->>A: Patterns, rules, templates, commands

    Note over A: Need code template?

    A->>AS: Read assets/QuizCard.tsx
    AS-->>A: Component implementation template

    Note over A: Need more details?

    A->>RF: Read references/ui-patterns.md
    RF-->>A: Points to local docs

    A->>D: Read docs/use-cases.md
    D-->>A: Full documentation

    Note over A: Execute with full context

    A->>U: Creates component with correct patterns
```

## Before vs After

```mermaid
graph TD
    subgraph COMPARISON["BEFORE vs AFTER"]
        direction LR

        subgraph BEFORE["Without Skills"]
            B1["AI guesses conventions"]
            B2["Wrong structure"]
            B3["Multiple iterations"]
            B4["Web searches for docs"]
            B5["Inconsistent patterns"]
        end

        subgraph AFTER["With Skills"]
            A1["AI loads exact patterns"]
            A2["Correct structure"]
            A3["First-time right"]
            A4["Local docs referenced"]
            A5["Consistent patterns"]
        end
    end

    style BEFORE fill:#5c1a1a,stroke:#ef5350,color:#fff
    style AFTER fill:#1a4d1a,stroke:#66bb6a,color:#fff
```

## Complete Architecture

```mermaid
flowchart TB
    subgraph ENTRY["ENTRY POINT"]
        AGENTS["AGENTS.md<br/>━━━━━━━━━━━━━━━━━<br/>• Available skills registry<br/>• Skill → Trigger mapping<br/>• Component navigation"]
    end

    subgraph SKILLS["SKILLS LIBRARY"]
        direction TB

        subgraph GENERIC["Generic Skills"]
            G1["typescript"]
            G2["react-19"]
            G3["nextjs-15"]
            G4["tailwind-4"]
            G5["zod-4"]
            G6["zustand-5"]
            G7["ai-sdk-5"]
            G8["playwright"]
            G9["pytest"]
            G10["django-drf"]
            G11["express"]
            G12["biome"]
        end

        subgraph QUIZAPP["QuizApp Skills"]
            Q1["quizapp-domain"]
            Q2["quizapp-monorepo"]
            Q3["quizapp-testing"]
            Q4["quizapp-api"]
            Q5["quizapp-ui"]
        end

        subgraph META["Meta Skills"]
            M1["skill-creator"]
        end
    end

    subgraph STRUCTURE["SKILL STRUCTURE"]
        direction LR

        SKILLMD["SKILL.md<br/>━━━━━━━━━━━━━━<br/>• Frontmatter<br/>• Critical patterns<br/>• Decision trees<br/>• Code examples<br/>• Commands<br/>• Keywords"]

        ASSETS["assets/<br/>━━━━━━━━━━━━━━<br/>• Code templates<br/>• JSON schemas<br/>• Config examples"]

        REFS["references/<br/>━━━━━━━━━━━━━━<br/>• Local doc paths<br/>• No web URLs<br/>• Single source"]
    end

    subgraph DOCS["DOCUMENTATION"]
        direction TB
        DD["docs/"]
        D1["architecture.md"]
        D2["use-cases.md"]
        D3["wireframes.yaml"]
        D4["agents-and-skills.md"]

        DD --> D1
        DD --> D2
        DD --> D3
        DD --> D4
    end

    ENTRY --> SKILLS
    SKILLS --> STRUCTURE
    SKILLMD --> ASSETS
    SKILLMD --> REFS
    REFS -.->|"points to"| DOCS

    style ENTRY fill:#1e3a5f,stroke:#4a9eff,color:#fff
    style GENERIC fill:#5c4d1a,stroke:#ffd700,color:#fff
    style QUIZAPP fill:#1a4d1a,stroke:#66bb6a,color:#fff
    style META fill:#4a1a4d,stroke:#ba68c8,color:#fff
    style STRUCTURE fill:#5c3d1a,stroke:#ffb74d,color:#fff
    style DOCS fill:#1a3d4d,stroke:#4dd0e1,color:#fff
```

## Skills Included

| Type | Skills |
|------|--------|
| **Generic** | typescript, react-19, nextjs-15, tailwind-4, zod-4, zustand-5, ai-sdk-5, playwright, pytest, django-drf, express, biome |
| **QuizApp** | quizapp-domain, quizapp-monorepo, quizapp-testing, quizapp-api, quizapp-ui |
| **Meta** | skill-creator |

**Total: 18 skills**

## Skill Structure

Each skill follows the [Agent Skills spec](https://agentskills.io):

```
skills/{skill-name}/
├── SKILL.md          # Patterns, rules, decision trees
├── assets/           # Code templates, schemas
└── references/       # Links to local docs (single source of truth)
```

## Key Design Decisions

1. **Self-contained skills** - Critical patterns inline for fast loading
2. **Local doc references** - No web URLs, points to `docs/*.md`
3. **Single source of truth** - Skills reference docs, no duplication
4. **On-demand loading** - AI loads only what's needed for the task
5. **Monorepo-aware** - Skills cover frontend, backend, and shared packages

## QuizApp-Specific Patterns

### Domain Skills (quizapp-domain)
- **Attempt lifecycle:** One active attempt per quiz, multiple completed
- **localStorage persistence:** Browser-based storage with specific keys
- **Question randomization:** Stable per-attempt order
- **Learning mode:** Explanation-first quiz flow

### API Skills (quizapp-api)
- **File-based storage:** Quizzes as JSON files in `backend/data/quizzes/`
- **Express patterns:** Route → Controller → Service architecture
- **Zod validation:** Schema validation for all quiz data
- **No database:** localStorage on frontend, JSON files on backend

### UI Skills (quizapp-ui)
- **Component organization:** `components/ui/` (shadcn/ui) + `components/quiz/` (app-specific)
- **Quiz flow:** QuestionView → FeedbackView → ResultsScreen
- **State management:** Zustand for session/attempts, React Query for server data
- **Styling:** Tailwind CSS 4 with shadcn/ui components

### Testing Skills (quizapp-testing)
- **Vitest:** Unit and integration tests
- **Supertest:** API endpoint testing
- **Co-location:** Tests live next to implementation (.spec.ts)
- **AAA pattern:** Arrange-Act-Assert structure

### Monorepo Skills (quizapp-monorepo)
- **pnpm workspaces:** Package management
- **Turborepo:** Task orchestration with caching
- **workspace:* protocol:** Internal dependencies
- **Shared package:** Common schemas and types

### Code Quality Skills (biome)
- **Unified linting:** Single tool for format + lint
- **Import organization:** Automatic sorting
- **Strict TypeScript:** No `any` types allowed
- **Pre-commit hooks:** Quality gates before commit

## Creating New Skills

Use the `skill-creator` meta-skill to create new skills that follow the Agent Skills spec. See `AGENTS.md` for the full list of available skills and their triggers.

### When to Create a New Skill

Create a skill when:
- Pattern is used 3+ times across the codebase
- Workflow has multiple steps requiring consistency
- Convention is project-specific (not generic)
- Domain knowledge needs preservation for future agents

Don't create a skill when:
- Pattern is used 1-2 times (document in AGENTS.md instead)
- Convention is generic and well-documented elsewhere
- Trivial pattern that doesn't need enforcement

## Auto-Invoke System

Skills are automatically invoked when AI detects matching actions:

**Example:**
```
User: "Implement quiz attempt persistence in localStorage"
AI detects: "Implementing quiz attempt persistence"
Skill activated: quizapp-domain
Result: Code follows attempt lifecycle, uses correct localStorage keys
```

See `AGENTS.md` for complete auto-invoke trigger mappings.

## Skill Maintenance

### Updating Skills
1. Update skill's `SKILL.md`
2. Increment `version` in frontmatter
3. Document breaking changes
4. Update references in `AGENTS.md`

### Adding Triggers
1. Edit skill's `metadata.auto_invoke` section
2. Update `AGENTS.md` Auto-Invoke table
3. Test with AI assistant

## Resources

- **Main Guide:** [AGENTS.md](/AGENTS.md) - Entry point for all AI agents
- **Skills Library:** [skills/README.md](/skills/README.md) - Skills documentation
- **Architecture:** [docs/architecture.md](/docs/architecture.md) - Technical decisions
- **Use Cases:** [docs/use-cases.md](/docs/use-cases.md) - Functional requirements
- **Wireframes:** [docs/wireframes.yaml](/docs/wireframes.yaml) - UI reference
- **Agent Skills Standard:** [https://agentskills.io](https://agentskills.io) - Open standard spec

---

**Remember:** Skills form the "agent operating system" for QuizApp. Together with AGENTS.md and docs/, they ensure AI agents produce consistent, high-quality code that follows project conventions.
