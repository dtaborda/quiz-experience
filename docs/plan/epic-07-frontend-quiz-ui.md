# Epic 07 · Frontend Agent – Quiz Flow UI

**Owner:** Frontend agent  
**Skills:** `quizapp-ui`, `react-19`, `tailwind-4`

## Goal
Deliver the interactive quiz experience including list, start flow, question navigation, learning mode, and feedback.

## Tasks
- [ ] Implement components: `QuizList`, `QuizCard`, `StartQuizDialog`, `QuestionView`, `LearningModePanel`, `AnswerFeedback`, `ProgressStepper`.
- [ ] Wire components to domain hooks (Epic 06) ensuring learning vs. normal mode flows.
- [ ] Add transitions/animations per frontend guidelines (no bland layouts).
- [ ] Ensure responsive design (mobile-first) and accessibility basics (ARIA roles, keyboard nav).
- [ ] Add story/demo states (if using Storybook) or at least interactive docs page.

## Deliverables
- Fully functioning quiz flow reachable from `/`.
- Visual polish consistent with design principles.

## Definition of Done
- Users can select quiz, choose mode, answer questions, get immediate feedback.
- QA pass on various screen sizes.

## Commit Guidance
`feat(frontend): implement quiz flow ui`

## Dependencies
- Epics 05–06 must be complete (shell + domain).
