# AI Agent Skills

This directory contains **Agent Skills** following the [Agent Skills open standard](https://agentskills.io). Skills provide domain-specific patterns, conventions, and guardrails that help AI coding assistants (Claude Code, OpenCode, Cursor, etc.) understand project-specific requirements.

## What Are Skills?

[Agent Skills](https://agentskills.io) is an open standard format for extending AI agent capabilities with specialized knowledge. Originally developed by Anthropic and released as an open standard, it is now adopted by multiple agent products.

Skills teach AI assistants how to perform specific tasks. When an AI loads a skill, it gains context about:

- Critical rules (what to always/never do)
- Code patterns and conventions
- Project-specific workflows
- References to detailed documentation

## How to Use Skills

Skills are automatically discovered by the AI agent. To manually load a skill during a session:

```
Read skills/{skill-name}/SKILL.md
```

## Available Skills

### Generic Skills

Reusable patterns for common technologies:

| Skill | Description |
|-------|-------------|
| `typescript` | Strict TypeScript patterns, no `any`, explicit types |
| `react-19` | React 19 patterns with React Compiler (no manual memoization) |
| `nextjs-15` | Next.js 15 App Router conventions (server vs client components) |
| `tailwind-4` | Tailwind CSS 4 patterns and utilities |
| `zod-4` | Zod 4 schema validation patterns |
| `zustand-5` | Zustand 5 state management patterns (persist, selectors, slices) |
| `ai-sdk-5` | Vercel AI SDK 5 patterns for AI chat features |
| `playwright` | Playwright E2E testing patterns (Page Object Model) |
| `pytest` | pytest testing patterns (fixtures, mocking, markers) |
| `django-drf` | Django REST Framework patterns (ViewSets, Serializers, Filters) |
| `express` | Express.js best practices for building scalable REST APIs |
| `biome` | Biome linter and formatter patterns for consistent code quality |
| `jira-task` | Creates Jira tasks following standard format |
| `jira-epic` | Creates Jira epics for large features |

### QuizApp-Specific Skills

Patterns tailored for QuizApp development:

| Skill | Description |
|-------|-------------|
| `quizapp-domain` | Quiz attempt lifecycle, sessions, localStorage persistence, learning mode, randomization |
| `quizapp-monorepo` | pnpm workspaces + Turborepo setup, cross-package dependencies, task orchestration |
| `quizapp-testing` | Vitest + Supertest patterns for unit, integration, and API tests |
| `quizapp-api` | Express API patterns for quiz endpoints, JSON file storage, backend conventions |
| `quizapp-ui` | Next.js UI patterns for quiz components, shadcn/ui, frontend conventions |

### Meta Skills

| Skill | Description |
|-------|-------------|
| `skill-creator` | Create new AI agent skills following Agent Skills spec |

## Directory Structure

```
skills/
├── {skill-name}/
│   ├── SKILL.md              # Required - main instruction and metadata
│   ├── scripts/              # Optional - executable code
│   ├── assets/               # Optional - templates, schemas, resources
│   └── references/           # Optional - links to local docs
└── README.md                 # This file
```

## Why Auto-invoke Sections?

**Problem**: AI assistants (Claude, Gemini, etc.) don't reliably auto-invoke skills even when the `Trigger:` in the skill description matches the user's request. They treat skill suggestions as "background noise" and barrel ahead with their default approach.

**Solution**: The `AGENTS.md` file contains an **Auto-invoke Skills** section that explicitly commands the AI: "When performing X action, ALWAYS invoke Y skill FIRST." This is a [known workaround](https://scottspence.com/posts/claude-code-skills-dont-auto-activate) that forces the AI to load skills.

**Example from AGENTS.md:**

| Action | Skill |
|--------|-------|
| Implementing quiz domain logic | `quizapp-domain` |
| Setting up monorepo structure | `quizapp-monorepo` |
| Writing tests | `quizapp-testing` |

## Creating New Skills

Use the `skill-creator` skill for guidance:

```
Read skills/skill-creator/SKILL.md
```

### Quick Checklist

1. Create directory: `skills/{skill-name}/`
2. Add `SKILL.md` with required frontmatter
3. Add `metadata.scope` and `metadata.auto_invoke` fields
4. Keep content concise (under 500 lines)
5. Reference existing docs instead of duplicating
6. Add to `AGENTS.md` skills table and auto-invoke section
7. Test skill with AI assistant

### SKILL.md Frontmatter Template

```yaml
---
name: skill-name
description: >
  One-line description of what this skill does.
  Trigger: When to invoke this skill.
license: MIT
metadata:
  author: QuizApp Team
  version: "1.0"
  scope: [root, frontend, backend, shared]
  auto_invoke:
    - "Action that triggers this skill"
    - "Another action that triggers this skill"
---
```

## Design Principles

- **Concise**: Only include what AI doesn't already know
- **Progressive disclosure**: Point to detailed docs, don't duplicate
- **Critical rules first**: Lead with ALWAYS/NEVER patterns
- **Minimal examples**: Show patterns, not tutorials
- **Actionable**: Include copy-paste commands and code

## Skill Maintenance

### Updating Skills

When project conventions change:
1. Update the skill's `SKILL.md`
2. Increment `version` in frontmatter
3. Document breaking changes in skill body
4. Update references in `AGENTS.md`
5. Test with AI assistant

### Deprecating Skills

When a skill is no longer needed:
1. Add `deprecated: true` to frontmatter
2. Add deprecation notice to skill body
3. Remove from `AGENTS.md` auto-invoke table
4. Keep file for historical reference

## When to Create a New Skill

**Create a skill when:**
- Pattern is used 3+ times across the codebase
- Workflow has multiple steps that need to be consistent
- Convention is project-specific (not a generic pattern)
- Domain knowledge needs to be preserved for future agents
- Complex decision trees or workflows need guidance

**Don't create a skill when:**
- Pattern is used 1-2 times (include in AGENTS.md instead)
- Convention is generic and well-documented elsewhere
- Trivial pattern that doesn't need enforcement
- Already covered by existing generic skills

## Resources

- [Agent Skills Standard](https://agentskills.io) - Open standard specification
- [Agent Skills GitHub](https://github.com/anthropics/skills) - Example skills
- [Claude Code Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) - Skill authoring guide
- [QuizApp AGENTS.md](../AGENTS.md) - AI agent general rules
- [QuizApp Documentation](../docs/) - Project documentation

---

## Mental Model

Think of skills as:

> **"Company-wide engineering standards, but readable by AI"**

Together with AGENTS.md and docs/, they form the **agent operating system** for this repository.

---

**Remember:** Skills are living documentation. Keep them updated, concise, and actionable.
