# QuizApp Skills - Auto-Invoke Reference

Esta es una referencia rápida de todos los skills disponibles en QuizApp y sus triggers de auto-invocación.

El auto-invoke funciona cuando el AI detecta que estás realizando una acción que coincide con el trigger. Por ejemplo, si dices "implementa la persistencia de intentos de quiz", se activará automáticamente el skill `quizapp-domain`.

---

## Skills Genéricos

Skills reutilizables para tecnologías comunes:

| Skill | Auto-invoke Trigger |
|-------|---------------------|
| `typescript` | Writing TypeScript types/interfaces |
| `react-19` | Writing React components |
| `nextjs-15` | App Router / Server Actions |
| `tailwind-4` | Working with Tailwind classes |
| `zod-4` | Creating Zod schemas |
| `zustand-5` | Using Zustand stores |
| `ai-sdk-5` | Building AI chat features |
| `playwright` | Writing Playwright E2E tests |
| `pytest` | Writing Python tests with pytest |
| `django-drf` | Creating ViewSets, serializers, or filters / Implementing JSON:API endpoints / Adding DRF pagination or permissions |
| `express` | Creating Express routes / Building Express middleware / Setting up Express server / Implementing error handling in Express / Creating API endpoints with Express / Configuring Express app |
| `biome` | Configuring Biome / Setting up linting / Configuring code formatting / Fixing linting errors / Running code quality checks / Setting up pre-commit hooks |

---

## Skills Específicos de QuizApp

Skills únicos para el dominio y arquitectura de QuizApp:

| Skill | Auto-invoke Trigger |
|-------|---------------------|
| `quizapp-domain` | Implementing quiz attempt persistence / Working with quiz domain logic / Managing user sessions / Implementing attempt lifecycle / Implementing learning mode / Creating quiz sessions / Implementing randomized question order / Handling attempt completion / Managing active vs completed attempts / Working with localStorage persistence / Implementing quiz history / Building leaderboard features |
| `quizapp-monorepo` | Setting up monorepo structure / Configuring pnpm workspaces / Adding new packages to monorepo / Configuring Turborepo tasks / Managing cross-package dependencies / Working with workspace protocol / Debugging workspace resolution / Configuring Turborepo cache / Running commands in specific packages / Setting up shared package |
| `quizapp-testing` | Writing tests / Adding test coverage / Testing API endpoints / Testing domain logic / Writing Vitest unit tests / Writing Supertest API tests / Testing localStorage persistence / Testing React components / Mocking API responses / Testing attempt lifecycle / Writing integration tests / Testing Zod schemas |
| `quizapp-api` | Creating QuizApp API endpoints / Working with quiz JSON data / Implementing backend quiz logic / Setting up quiz API routes / Loading quiz data from files / Validating quiz API requests |
| `quizapp-ui` | Creating QuizApp UI components / Building QuizApp pages / Implementing QuizApp frontend features / Working with QuizApp UI structure / Using shadcn/ui in QuizApp / Creating quiz flow components |

---

## Meta Skills

Skills para crear y mantener otros skills:

| Skill | Auto-invoke Trigger |
|-------|---------------------|
| `skill-creator` | Creating new skills |

---

## Resumen por Categoría

### Frontend Development (6 skills)
- `react-19` - React components
- `nextjs-15` - Next.js App Router
- `tailwind-4` - Tailwind styling
- `zustand-5` - State management
- `ai-sdk-5` - AI chat features
- `typescript` - TypeScript types

### Backend Development (1 skill)
- `typescript` - TypeScript types
- `django-drf` - Django REST (si aplica)

### Testing (3 skills)
- `quizapp-testing` - Vitest + Supertest
- `playwright` - E2E testing
- `pytest` - Python testing (si aplica)

### Domain & Architecture (2 skills)
- `quizapp-domain` - Quiz business logic
- `quizapp-monorepo` - Monorepo structure

### Validation & Schema (1 skill)
- `zod-4` - Schema validation

### Meta (1 skill)
- `skill-creator` - Skill creation

---

## Total: 18 skills con auto-invoke configurado 🎯

### Distribución:
- **Generic Skills:** 12 skills
- **QuizApp-Specific Skills:** 5 skills
- **Meta Skills:** 1 skill

---

## Cómo Funciona el Auto-Invoke

Cuando trabajas con AI coding assistants (Claude Code, OpenCode, etc.), el sistema:

1. **Detecta tu intención** basándose en lo que escribes
2. **Busca triggers que coincidan** con tu acción
3. **Carga automáticamente el skill** correspondiente
4. **Aplica las reglas y patrones** del skill a tu código

### Ejemplo 1: Domain Logic

```
Usuario: "Implementa la lógica para guardar intentos de quiz en localStorage"
AI detecta: "Implementing quiz attempt persistence"
Skill activado: quizapp-domain
Resultado: El AI usa las reglas de attempt lifecycle, localStorage keys, y patterns del skill
```

### Ejemplo 2: Testing

```
Usuario: "Escribe tests para la función calculateScore"
AI detecta: "Writing tests"
Skill activado: quizapp-testing
Resultado: El AI usa patrones de Vitest con AAA pattern y ejemplos del skill
```

### Ejemplo 3: Monorepo

```
Usuario: "Agrega un nuevo package llamado 'analytics' al monorepo"
AI detecta: "Adding new packages to monorepo"
Skill activado: quizapp-monorepo
Resultado: El AI usa workspace:* protocol, actualiza pnpm-workspace.yaml, y sigue la estructura correcta
```

---

## Skills No Incluidos en Auto-Invoke

Estos skills existen pero no están configurados para auto-invoke (no son relevantes para QuizApp):

- `jira-task` - Creación de tareas Jira (project management externo)
- `jira-epic` - Creación de epics Jira (project management externo)
- `skill-sync` - Sincronización de metadata (herramienta de Prowler)

---

## Verificar Skills Cargados

Para verificar qué skills están disponibles:

```bash
# Ver todos los skills
ls -1 skills/ | grep -v "\.sh\|\.md"

# Ver skills en AGENTS.md
grep "| \`.*\` |.*SKILL.md" AGENTS.md | awk -F'`' '{print $2}' | sort

# Ver auto-invoke triggers configurados
grep -A 5 "auto_invoke:" skills/*/SKILL.md
```

---

## Referencias

- **AGENTS.md:** [/AGENTS.md](/AGENTS.md) - Guía principal para agentes
- **Skills README:** [/skills/README.md](/skills/README.md) - Documentación de skills
- **Agent Skills Standard:** [https://agentskills.io](https://agentskills.io)
