# QuizApp Docs & DevEx – AI Agent Ruleset

> **Skills Reference**: Load these skills before editing:
> - [`quizapp-docs`](../skills/quizapp-docs/SKILL.md) – Documentation style + formatting
> - [`skill-creator`](../skills/skill-creator/SKILL.md) – Adding/updating skills + assets
> - [`quizapp-commit`](../skills/quizapp-commit/SKILL.md) – Conventional commit guardrails
> - [`quizapp-pr`](../skills/quizapp-pr/SKILL.md) – PR template + gh workflow

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Creating new AI skills | `skill-creator` |
| Syncing AGENTS and Copilot instructions | `quizapp-docs` |
| Updating docs links or navigation | `quizapp-docs` |
| Updating existing skills | `skill-creator` |
| Writing documentation | `quizapp-docs` |

---

## CRITICAL RULES – NON-NEGOTIABLE
- Keep `AGENTS.md` and `.github/copilot-instructions.md` in sync at all times.
- Update `docs/plan/epic-xx-*.md` as work progresses—unchecked boxes are the source of truth for pending tasks.
- Skills must include metadata (`scope`, `auto_invoke`) so `skill-sync` can update Auto-invoke tables.
- No screenshots embedded without alt text + context; store large assets under `docs/assets/` (if added) and reference relative paths.
- Docs stay ASCII by default; use Markdown tables/diagrams sparingly and keep line width reasonable for terminal editing.

## DECISION TREES

```
Process/tooling change? → Update docs + AGENTS simultaneously.
New domain pattern repeated ≥3 times? → Create/extend skill.
Need quick how-to? → Add to docs/plan/agent-* playbooks or agents-and-skills catalog.
```

## TECH STACK
Markdown · Mermaid · pnpm scripts · skill-sync tooling

## PROJECT STRUCTURE
```
docs/
├── architecture.md
├── use-cases.md
├── wireframes.yaml
├── plan/
│   ├── agent-guide.md
│   ├── agent-*.md
│   └── epic-xx-*.md
└── agents-and-skills.md
```

## COMMANDS
```bash
pnpm dev        # Verify docs referenced commands still work
pnpm lint       # Ensure code snippets remain valid when possible
./skills/skill-sync/assets/sync.sh --dry-run
./skills/skill-sync/assets/sync.sh
```

## QA CHECKLIST
- [ ] Every workflow or API change mirrored in docs + relevant playbooks.
- [ ] Skill metadata + auto-invoke tables regenerated via `skill-sync` (no manual edits).
- [ ] README/architecture/use-cases updated when scope shifts.
- [ ] New scripts/env vars documented and referenced from AGENTS.
