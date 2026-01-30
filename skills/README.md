# QuizApp Skills Library

This directory contains **Agent Skills** for AI coding agents working on QuizApp.

Skills are **versioned instruction packages** that teach agents how to work correctly within this repository. They encode critical rules, architectural conventions, naming patterns, and repeatable workflows.

---

## What Are Agent Skills?

Agent Skills are portable, reusable documentation that:
- Define **ALWAYS/NEVER rules** for code quality
- Provide **code examples** for common patterns
- Include **commands** for quick copy-paste
- Reference **project-specific conventions**

Instead of repeating long prompts, we **load a skill once** and let the agent apply it consistently.

This project follows the **Agent Skills open standard**: [https://agentskills.io](https://agentskills.io)

---

## Available Skills

### Generic Skills (Foundation Layer)

These skills are **cross-cutting** and apply to all packages in the monorepo:

| Skill | Description | Scope |
|-------|-------------|-------|
| `typescript` | Strict TypeScript patterns, no `any`, explicit types | All packages |
| `react-19` | React 19 patterns with React Compiler (no manual memoization) | Frontend |
| `nextjs-15` | Next.js 15 App Router conventions (server vs client components) | Frontend |
| `tailwind-4` | Tailwind CSS 4 patterns and utilities | Frontend |
| `zod-4` | Zod 4 schema validation patterns | All packages |
| `zustand-5` | Zustand 5 state management patterns | Frontend |
| `ai-sdk-5` | Vercel AI SDK 5 patterns for AI chat features | Frontend |
| `playwright` | Playwright E2E testing patterns | Testing |
| `pytest` | pytest testing patterns for Python | Testing (if applicable) |
| `django-drf` | Django REST Framework patterns | Backend (if applicable) |
| `jira-task` | Creates Jira tasks following standard format | Project Management |
| `jira-epic` | Creates Jira epics for large features | Project Management |
| `skill-creator` | Creates new AI agent skills following Agent Skills spec | Development |

**When to use:** Load these when working with the specific technology.

---

### Project-Specific Skills (QuizApp Domain)

These skills are **unique to QuizApp** and encode domain-specific patterns:

| Skill | Description | Auto-Invoke When |
|-------|-------------|------------------|
| **`quizapp-domain`** | Quiz attempt lifecycle, sessions, localStorage persistence, learning mode, randomization | Implementing quiz domain logic, attempt lifecycle, or user state persistence |
| **`quizapp-monorepo`** | pnpm workspaces + Turborepo setup, cross-package dependencies, task orchestration | Setting up monorepo structure, configuring workspaces, or adding new packages |
| **`quizapp-testing`** | Vitest + Supertest patterns for unit, integration, and API tests | Writing tests, adding test coverage, or testing API endpoints |

**When to use:** These are auto-invoked when performing the actions listed in the "Auto-Invoke When" column (see AGENTS.md for details).

---

## How to Use Skills

### For AI Agents

1. **Read AGENTS.md first** - it contains auto-invoke rules
2. **Load skills as needed** - use the skill name to invoke
3. **Follow patterns exactly** - skills define ALWAYS/NEVER rules

Example:
```
I need to implement quiz attempt persistence.
First, let me load the quizapp-domain skill.
```

### For Humans

Skills are **reference documentation** for understanding:
- How agents should implement features
- What patterns are considered correct
- Why certain decisions were made

Skills complement:
- `AGENTS.md` - how agents should behave
- `docs/` - why the system is designed this way

---

## Skill Structure

Each skill follows this format:

```
skills/{skill-name}/
├── SKILL.md           # Main documentation
├── assets/            # Templates, schemas (optional)
├── scripts/           # Helper scripts (optional)
└── references/        # Links to related docs (optional)
```

**SKILL.md frontmatter:**
```yaml
---
name: skill-name
description: One-line description. Trigger: When to invoke.
license: MIT
metadata:
  author: Author Name
  version: "1.0"
  scope: [root, frontend, backend, shared]
  auto_invoke:
    - "Action that triggers this skill"
---
```

---

## Creating New Skills

Use the `skill-creator` skill to create new skills following the standard format:

```bash
# Load skill-creator and follow the prompts
```

**When to create a new skill:**
- Pattern is used 3+ times across the codebase
- Workflow has multiple steps that need to be consistent
- Convention is project-specific (not a generic pattern)
- Domain knowledge needs to be preserved for future agents

**When NOT to create a skill:**
- Pattern is used 1-2 times (include in AGENTS.md instead)
- Convention is generic and well-documented elsewhere
- Trivial pattern that doesn't need enforcement

---

## Auto-Invoke Strategy

Because agents don't reliably auto-load skills by themselves, we enforce loading via **AGENTS.md Auto-Invoke sections**.

**Rule:**
> When performing X, ALWAYS load Y skill first.

See `AGENTS.md` for the complete auto-invoke table.

---

## Skill Maintenance

### Updating Skills

When project conventions change:
1. Update the skill's `SKILL.md`
2. Increment `version` in frontmatter
3. Document breaking changes in skill body
4. Update references in `AGENTS.md`

### Deprecating Skills

When a skill is no longer needed:
1. Add `deprecated: true` to frontmatter
2. Add deprecation notice to skill body
3. Remove from `AGENTS.md` auto-invoke table
4. Keep file for historical reference

---

## Resources

- **Agent Skills Standard:** [https://agentskills.io](https://agentskills.io)
- **AGENTS.md Specification:** [https://agents.md](https://agents.md)
- **QuizApp AGENTS.md:** [/AGENTS.md](/AGENTS.md)
- **QuizApp Documentation:** [/docs/](/docs/)

---

## Mental Model

Think of skills as:

> **"Company-wide engineering standards, but readable by AI"**

Together with AGENTS.md and docs/, they form the **agent operating system** for this repository.

---

**Remember:** Skills are living documentation. Keep them updated, concise, and actionable.
