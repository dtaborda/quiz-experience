# Documentation Style Guide

## Local Documentation

Use these files while writing or reviewing QuizApp docs:

- `docs/developer-guide/documentation.mdx` – Primary reference for the documentation workflow, Mintlify preview steps, formatting checklist, and AI-driven expectations.
- `docs/developer-guide/introduction.mdx` – Contribution process, Definition of Done, and PR requirements (link this whenever you mention reviews).
- `docs/architecture.md` – System diagrams and package responsibilities (reference when describing code structure).
- `docs/use-cases.md` – Learner scenarios and acceptance criteria (cite when explaining behavior changes).
- `docs/wireframes.yaml` – UI layout source of truth (update alongside any doc that changes screenshots or UX flows).
- `docs/developer-guide/ai-skills.mdx` & `skills/` – Explain how Skills and AGENTS stay synced with docs.

## Quick Checklist

- Cross-link docs when referencing use cases, architecture, or Skills.
- Keep headings in Title Case and favor Mintlify callouts (`<Info>`, `<Warning>`, `<Steps>`).
- Verify commands locally (`pnpm install`, `mint dev`, etc.) before publishing.
- Update this reference file whenever the documentation guide adds or removes sections.
