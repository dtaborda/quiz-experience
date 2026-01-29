# QuizApp — Agent Skills (Recommended Set)

## Purpose

This document defines the **skills** we want available to agents while building QuizApp.

Skills are **portable, versioned workflow packs** (instructions + optional scripts + references) that help agents execute work consistently.

Recommended location:

* `skills/` (repo root)

---

## Proposed `skills/` layout

```txt
skills/
├── quizapp-scaffold/
│   └── SKILL.md
├── quizapp-contracts/
│   └── SKILL.md
├── quizapp-backend-api/
│   └── SKILL.md
├── quizapp-frontend-ui/
│   └── SKILL.md
├── quizapp-persistence/
│   └── SKILL.md
├── quizapp-testing/
│   └── SKILL.md
└── quizapp-docs-sync/
    └── SKILL.md
```

---

## Skill List (what each skill does)

### Foundation / Generic Skills (recommended)

These are “cross-cutting” skills that keep the codebase **uniform** (style, lint, naming, boundaries). They are reusable across many projects.

#### SKILL-00 — `repo-conventions`

**Goal:** Enforce consistent style and naming across the monorepo.

Includes:

* TypeScript strict rules (how we type things)
* naming conventions (files, components, routes)
* import conventions / aliasing
* error-handling conventions
* "Definition of Done" checklist (code + tests + docs)

Outputs:

* a single place agents consult before writing any code

---

#### SKILL-00B — `lint-format`

**Goal:** Guarantee formatting/lint consistency.

Includes:

* ESLint rules expectations
* Prettier expectations
* the exact commands agents must run and fix before finishing

Outputs:

* stable formatting and less diffs / less review noise

---

#### SKILL-00C — `ts-patterns`

**Goal:** Standardize modern TS patterns used in this repo.

Includes:

* functional patterns
* safe parsing with Zod
* error typing and result patterns
* avoiding `any`

Outputs:

* consistent TypeScript quality across FE/BE/shared

---

#### SKILL-00D — `git-pr-conventions`

**Goal:** Standardize commit/PR behavior for agent output.

Includes:

* commit message rules
* PR title format (if applicable)
* “run checks before commit” guardrails

Outputs:

* predictable history and fewer broken builds

---

### Stack-Specific Skills (QuizApp)

### SKILL-01 — `quizapp-scaffold`

**Goal:** Create and validate the monorepo structure.

Includes:

* pnpm workspaces + turborepo baseline
* standard scripts (`dev`, `build`, `test`, `lint`)
* folder structure (`frontend/`, `backend/`, `shared/`, `docs/`, `infra/`)

Outputs:

* repo skeleton + working `pnpm dev`

---

### SKILL-02 — `quizapp-contracts`

**Goal:** Maintain shared Zod schemas and types.

Includes:

* `Quiz`, `Question`
* `Attempt`, `Answer`
* `Session`

Outputs:

* `shared/schemas/*` + usage examples for FE/BE

---

### SKILL-03 — `quizapp-backend-api`

**Goal:** Implement the Express REST API serving quiz data.

Includes:

* endpoints: `/api/health`, `/api/quizzes`, `/api/quizzes/:quizId`
* JSON loader + schema validation

Outputs:

* working API + error handling

---

### SKILL-04 — `quizapp-frontend-ui`

**Goal:** Implement Next.js screens using shadcn/ui + Tailwind.

Includes:

* Home, Quiz, Results, Review, History, Leaderboard, Create-Quiz placeholder
* consistent topbar with username

Outputs:

* screens matching wireframe intent

---

### SKILL-05 — `quizapp-persistence`

**Goal:** Implement attempt lifecycle + localStorage persistence.

Includes:

* one active attempt per quiz
* completed attempts only in history
* stable random order per attempt
* learning mode flag stored

Outputs:

* refresh-resume behavior guaranteed

---

### SKILL-06 — `quizapp-testing`

**Goal:** Ensure feature completeness with tests.

Includes:

* Vitest unit tests (scoring, leaderboard derivation, random order)
* Supertest integration tests (API endpoints)

Outputs:

* `pnpm test` green as a gate

---

### SKILL-07 — `quizapp-docs-sync`

**Goal:** Keep docs consistent as code evolves.

Includes:

* sync routes with `docs/use-cases.md`
* sync screen intent with `docs/wireframes.yaml`
* update `README.md` index + references

Outputs:

* docs remain source of truth

---

## Recommendation

* Start with foundation skills (SKILL-00 series), then SKILL-01, 02, 03, 05, 06.
* Add SKILL-04 once contracts + API are stable.
* Keep SKILL-07 as a final step for each feature.

---

# Agent Skills & Agents Architecture

> This section documents **how AI agents are expected to work in this repository**, following the **Agent Skills open standard** and modern agentic-development practices.

This is **reference documentation** for humans *and* agents. It explains:

* what skills are
* why we use them
* how they are structured
* how agents are delegated and orchestrated

This documentation complements `AGENTS.md` and the `skills/` directory.

---

## What Are Agent Skills (in this project)

Agent Skills are **versioned instruction packages** that teach AI coding agents how to work correctly within this repository.

They encode:

* critical rules (ALWAYS / NEVER)
* architectural conventions
* naming, structure, and style decisions
* repeatable workflows (scaffold, test, refactor)

Instead of repeating long prompts every time, we **load a skill once** and let the agent apply it consistently.

This project follows the **Agent Skills open standard**:

* [https://agentskills.io](https://agentskills.io)
* [https://github.com/anthropics/skills](https://github.com/anthropics/skills)

---

## Why We Use Skills

Without skills:

* agents default to generic patterns
* code style drifts
* tests are skipped or inconsistent
* architecture decisions get reinvented

With skills:

* every agent starts with the same mental model
* conventions are enforced automatically
* delegation becomes safe and predictable

Think of skills as:

> *"company-wide engineering standards, but readable by AI"*

---

## Repo-Level Files

### `AGENTS.md`

`AGENTS.md` is the **entry point for all coding agents**.

It acts as a **README for agents**, not humans.

Typical contents:

* setup commands
* dev / build / test commands
* code style rules
* Definition of Done (DoD)
* auto-invoke rules for skills

This file is read automatically by:

* OpenCode
* Claude Code
* Codex
* Cursor
* Gemini CLI

---

### `skills/`

The `skills/` folder contains **all Agent Skills** used by this project.

Directory structure:

```
skills/
├── {skill-name}/
│   ├── SKILL.md          # Required – instructions + metadata
│   ├── assets/           # Optional – templates, schemas
│   ├── scripts/          # Optional – executable helpers
│   └── references/       # Optional – links to local docs
└── README.md             # Overview of all skills
```

Each skill is:

* small
* focused
* reusable

---

## Generic Skills (Foundation Layer)

These skills are **always available** and define how code should look and behave across the repo.

### `repo-conventions`

Purpose:

* naming rules (files, folders, components)
* import aliases
* error handling conventions
* Definition of Done per feature

Why:

* prevents architectural drift
* keeps FE / BE / shared code aligned

---

### `lint-format`

Purpose:

* ESLint + Prettier rules
* formatting expectations
* zero-warning policy

Why:

* clean diffs
* predictable output from agents

---

### `typescript-patterns`

Purpose:

* strict TypeScript usage
* no `any`
* Zod for runtime validation
* shared types contracts

Why:

* safer refactors
* clear FE/BE boundaries

---

### `git-and-pr`

Purpose:

* commit message format
* PR checklist
* test + lint before done

Why:

* enforces quality gates automatically

---

## Stack Skills (Technology Layer)

These skills encode **framework-specific best practices**.

### `nextjs-app-router`

Covers:

* App Router structure
* server vs client components
* loading / error boundaries
* API routes usage

---

### `react-ui`

Covers:

* component patterns
* hooks usage
* composition rules
* shadcn/ui conventions

---

### `node-express-api`

Covers:

* route → controller → service separation
* error middleware
* HTTP status codes
* request validation

---

### `testing-playbook`

Covers:

* unit vs integration tests
* Vitest conventions
* Supertest for API
* minimum test coverage per feature

---

## Product Skills (QuizApp Domain)

These skills are **domain-specific** and encode QuizApp rules.

Examples:

* `quiz-domain`
* `quiz-persistence`
* `quiz-history`
* `quiz-learning-mode`
* `quiz-leaderboard`

They reference:

* Use Cases (docs)
* Wireframes (YAML)
* Business rules

---

## Agent Delegation Model

We use a **root agent + specialized sub-agents** model.

### Root Agent — `architect-agent`

Responsibilities:

* read AGENTS.md
* load foundational skills
* plan the implementation
* delegate work to sub-agents

---

### Sub-Agents

| Agent            | Responsibility                   |
| ---------------- | -------------------------------- |
| `frontend-agent` | Next.js UI, routes, components   |
| `backend-agent`  | API, contracts, services         |
| `state-agent`    | localStorage persistence logic   |
| `test-agent`     | unit + integration tests         |
| `docs-agent`     | keep docs and wireframes in sync |

Each sub-agent:

* loads only the skills it needs
* works in isolation
* returns artifacts to the root agent

---

## Skill Auto-Invoke Strategy

Because agents don’t reliably auto-load skills by themselves, we enforce loading via **AGENTS.md Auto‑invoke sections**.

Rule:

> When performing X, ALWAYS load Y skill first.

This prevents:

* skipped conventions
* forgotten tests
* inconsistent structure

---

## Mental Model (for humans)

* **AGENTS.md** = how agents should behave here
* **skills/** = what agents need to know
* **docs/** = why the system is designed this way

Together, they form the **agent operating system** for this repo.

---

## References

* Agent Skills Standard: [https://agentskills.io](https://agentskills.io)
* AGENTS.md specification: [https://agents.md](https://agents.md)
* Claude Code skills: [https://platform.claude.com/docs/agents](https://platform.claude.com/docs/agents)
* OpenCode: [https://opencode.ai](https://opencode.ai)

---

> This document is intentionally explicit. Ambiguity is the enemy of agentic development.
