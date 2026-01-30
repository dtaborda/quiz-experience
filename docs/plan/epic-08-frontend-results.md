# Epic 08 · Frontend Agent – Results, History & Leaderboard

**Owner:** Frontend agent  
**Skills:** `quizapp-domain`, `quizapp-ui`

## Goal
Persist completed attempts, present results screens, historical data, and local leaderboards.

## Tasks
- [ ] Implement components: `ResultsScreen`, `AttemptHistory`, `LeaderboardPanel`, `AttemptDetailModal`.
- [ ] Persist completed attempts to `quizapp:attempts` and active attempts map to `quizapp:activeAttemptByQuiz`.
- [ ] Compute leaderboard metrics (total score, average, per-quiz rankings) using shared helpers.
- [ ] Provide UI to resume active attempts or review past attempts.
- [ ] Write tests verifying persistence + leaderboard calculations.

## Deliverables
- Users can finish a quiz, review summary, view historical attempts, and see leaderboard standings.

## Definition of Done
- localStorage reflects accurate attempt history even after refresh.
- Leaderboard calculations deterministic and tested.

## Commit Guidance
`feat(frontend): add results and history`

## Dependencies
- Epics 06–07 complete.
