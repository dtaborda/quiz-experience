# QuizApp — User Histories & Flows

## Scope

This document defines **all user histories related to user state, quiz attempts, and history visualization**.
It is intended to be used by autonomous agents and developers as a **functional contract**.

Wireframes are defined separately in a YAML file and referenced here by `WF_*` identifiers.

---

## Core Concepts

### User
An authenticated person using the app on a given device.

### Quiz
A collection of questions under a single topic (e.g. "Agent Fundamentals").

### Attempt
A **single completed or in-progress run of a quiz**.
- One quiz can have **multiple attempts**
- An attempt is immutable once completed
- Each attempt has a unique `attemptId`

### Active Attempt
The **in-progress** attempt of a quiz.
- At most **one active attempt per quiz per user**
- Stored separately from history
- Can be resumed after navigation or browser refresh

### History
A **list of completed attempts only**.
- Partial/in-progress attempts are never shown in history
- History is user-scoped and persistent via localStorage

---

## Global UX Rules

- Logged-in user name is always visible in the top bar
- History rows never change structure
- Filters and sorting only affect dataset visibility/order
- URLs identify **resources**, not steps
- Questions are internal state, not route params

---

# USER HISTORIES

---

## UH-01 — User logs in and restores previous state

**As a user**,  
I want to log in and see my previous progress,  
so that I can continue where I left off.

### Flow
1. User logs in
2. App loads user-scoped data from localStorage
3. If active attempts exist → show “Continue”
4. If completed attempts exist → show summaries

### Wireframes
- Login: `WF_LOGIN`
- Home with continue: `WF_HOME_WITH_CONTINUE`
- Home with history summary: `WF_HOME_WITH_HISTORY`

---

## UH-02 — User sees quizzes for the first time

**As a user**,  
I want to see available quizzes,  
so that I can start learning.

### Preconditions
- User authenticated
- No attempts yet

### Result
- Quiz catalog only
- No history or continue section

### Wireframe
- `WF_HOME_EMPTY`

---

## UH-03 — User starts a quiz for the first time

**As a user**,  
I want to start a quiz,  
so that I can answer questions step by step.

### Flow
1. User clicks “Start Quiz”
2. Active attempt is created
3. First question is shown

### Wireframe
- Quiz (before answer): `WF_QUIZ_BEFORE_ANSWER`

---

## UH-04 — User resumes an in-progress quiz

**As a user**,  
I want to resume a quiz I didn’t finish,  
so that I don’t lose my progress.

### Flow
1. User returns to Home
2. App detects active attempt
3. User clicks “Resume”
4. Quiz opens at correct question index

### Wireframes
- Home with continue: `WF_HOME_WITH_CONTINUE`
- Quiz resume confirmation (optional): `WF_QUIZ_RESUME_OR_RESET`
- Quiz (before answer): `WF_QUIZ_BEFORE_ANSWER`

---

## UH-05 — User answers a question and sees feedback

**As a user**,  
I want to know immediately if my answer is correct,  
so that I can learn from mistakes.

### Flow
1. User submits an answer
2. System evaluates correctness
3. Explanation is shown
4. User proceeds to next question

### Wireframes
- After answer: `WF_QUIZ_AFTER_ANSWER`
- Next question: `WF_QUIZ_BEFORE_ANSWER`

---

## UH-06 — User navigates away during a quiz

**As a user**,  
I want to leave the quiz and come back later,  
so that I can continue without losing progress.

### Flow
1. User clicks “Back Home”
2. Active attempt is preserved
3. Home shows “Continue”

### Wireframes
- Quiz: `WF_QUIZ_BEFORE_ANSWER`
- Home with continue: `WF_HOME_WITH_CONTINUE`

---

## UH-07 — User finishes a quiz

**As a user**,  
I want to complete the quiz and see my results,  
so that I know how I performed.

### Flow
1. User answers last question
2. Active attempt is finalized
3. Attempt is added to history
4. Results screen is shown

### Wireframes
- Last question: `WF_QUIZ_LAST_FINISH`
- Results: `WF_RESULTS`

---

## UH-08 — User reviews answers of a completed attempt

**As a user**,  
I want to review all my answers,  
so that I can understand what I got right or wrong.

### Flow
1. User clicks “Review Answers”
2. System loads the completed attempt by `attemptId`
3. Full question-by-question review is shown

### Wireframe
- Review: `WF_REVIEW`

---

## UH-09 — User retakes a quiz after finishing it

**As a user**,  
I want to retake a quiz,  
so that I can improve my score.

### Rules
- Previous attempts remain in history
- A new active attempt is created
- Progress starts from question 1

### Wireframes
- Results: `WF_RESULTS`
- Quiz (first question): `WF_QUIZ_BEFORE_ANSWER`

---

## UH-10 — User views full history of attempts

**As a user**,  
I want to see all my past quiz attempts,  
so that I can track my progress over time.

### Result
- Flat list of completed attempts
- Each row represents one attempt

### Wireframe
- History list: `WF_HISTORY`

---

## UH-11 — User filters history by quiz

**As a user**,  
I want to filter my history by quiz,  
so that I can see how many times I completed a specific quiz.

### Rules
- Same row structure
- Dataset is reduced only

### Wireframe
- History list (filtered): `WF_HISTORY`

---

## UH-12 — User views attempt details from history

**As a user**,  
I want to open a specific attempt,  
so that I can inspect its details.

### Flow
1. User clicks “View” on a history row
2. Attempt details are loaded by `attemptId`

### Wireframe
- Attempt details: `WF_ATTEMPT_DETAILS`

---

## UH-13 — User sees empty history state

**As a user**,  
I want clear feedback when I have no history,  
so that I know what to do next.

### Wireframe
- Empty history: `WF_HISTORY_EMPTY`

---

## UH-14 — User refreshes the browser during a quiz

**As a user**,  
I want my progress to be restored after refresh,  
so that accidental reloads don’t lose my work.

### Behavior
- Active attempt is restored from localStorage
- Quiz opens at the correct question

### Wireframe
- Quiz (restored): `WF_QUIZ_BEFORE_ANSWER`

---

## UH-15 — User logs out

**As a user**,  
I want to log out safely,  
knowing my progress will still be there when I return.

### Result
- Session cleared
- User data remains in localStorage

### Wireframe
- Logout confirmation: `WF_LOGOUT_CONFIRM`

---

## Notes for Agents

- History is **append-only**
- Attempts are immutable once completed
- Active attempts are ephemeral
- Never mix partial attempts into history
- Always resolve UI state from localStorage + user session

This document is the **single source of truth** for user behavior related to history and attempts.

---

# Wireframes (YAML)
See the YAML block below. Each use case references a `WF_*` id.

```yaml
wireframes:
  WF_BASE: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | [Home] [History]                                 |
    +--------------------------------------------------+
    | (Screen Content)                                 |
    +--------------------------------------------------+

  WF_LOGIN: |
    +--------------------------------------------------+
    | QuizApp                                          |
    +--------------------------------------------------+
    | Sign In                                          |
    +--------------------------------------------------+
    | Email:    [________________________]             |
    | Password: [________________________]             |
    |                                                  |
    | [ Sign In ]                                      |
    +--------------------------------------------------+

  WF_LOGOUT_CONFIRM: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Log out?                                         |
    | You'll be logged out. Data stays on this device. |
    |                                                  |
    | [ Log out ]   [ Cancel ]                         |
    +--------------------------------------------------+

  WF_HOME_EMPTY: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Home                                             |
    +--------------------------------------------------+
    | Available Quizzes                                |
    | ------------------------------------------------ |
    | Agent Fundamentals (5 questions)                  |
    | [ Start Quiz ]                                   |
    |                                                  |
    | Prompt Engineering (5 questions)                  |
    | [ Start Quiz ]                                   |
    +--------------------------------------------------+

  WF_HOME_WITH_HISTORY: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Home                                             |
    +--------------------------------------------------+
    | Quizzes                                          |
    | ------------------------------------------------ |
    | Agent Fundamentals                               |
    | Attempts: 3  Last: 80%  Best: 100%               |
    | [ Start ]  [ History ]                           |
    |                                                  |
    | Prompt Engineering                               |
    | Attempts: 1  Last: 60%  Best: 60%                |
    | [ Start ]  [ History ]                           |
    |                                                  |
    | Recent Attempts (latest first)                   |
    | ------------------------------------------------ |
    | Agent Fundamentals   80% (4/5)   Jan 28 09:12     |
    | Prompt Engineering   60% (3/5)   Jan 27 18:40     |
    | [ View All History ]                             |
    +--------------------------------------------------+

  WF_HOME_WITH_CONTINUE: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Home                                             |
    +--------------------------------------------------+
    | Continue                                         |
    | ------------------------------------------------ |
    | Agent Fundamentals                               |
    | Progress: Question 3 of 5                        |
    | [ Resume ]  [ Start Over ]                       |
    |                                                  |
    | Quizzes                                          |
    | ------------------------------------------------ |
    | Agent Fundamentals  [ Start ] [ History ]         |
    | Prompt Engineering  [ Start ] [ History ]         |
    +--------------------------------------------------+

  WF_QUIZ_RESUME_OR_RESET: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Agent Fundamentals                               |
    +--------------------------------------------------+
    | We found an in-progress attempt.                 |
    | Progress: Question 3 of 5                        |
    |                                                  |
    | [ Resume Attempt ]  [ Start Over ]  [ Back Home ] |
    +--------------------------------------------------+

  WF_QUIZ_BEFORE_ANSWER: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Agent Fundamentals                               |
    | Question 3 of 5                                  |
    +--------------------------------------------------+
    | What is 'context window' in relation to AI?      |
    |                                                  |
    | ( ) Option A                                     |
    | ( ) Option B                                     |
    | ( ) Option C                                     |
    | ( ) Option D                                     |
    |                                                  |
    | [ Submit Answer ]                 [ Back Home ]   |
    +--------------------------------------------------+

  WF_QUIZ_AFTER_ANSWER: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Agent Fundamentals                               |
    | Question 3 of 5                                  |
    +--------------------------------------------------+
    | Your answer: Option C                ❌ Incorrect |
    | Correct answer: Option B             ✅ Correct   |
    |                                                  |
    | Explanation:                                     |
    | (short explanation text...)                      |
    |                                                  |
    | [ Next Question ]                [ Back Home ]    |
    +--------------------------------------------------+

  WF_QUIZ_LAST_FINISH: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Agent Fundamentals                               |
    | Question 5 of 5                                  |
    +--------------------------------------------------+
    | (Question + options)                             |
    | (After answer shows feedback + explanation)      |
    |                                                  |
    | [ Finish Quiz ]                 [ Back Home ]     |
    +--------------------------------------------------+

  WF_RESULTS: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Results — Agent Fundamentals                      |
    +--------------------------------------------------+
    | This attempt:                                    |
    | Score: 4 / 5  (80%)                              |
    | Feedback: "Good job!"                            |
    |                                                  |
    | So far: Attempts: 3  Best: 100%  Previous: 60%    |
    |                                                  |
    | [ Review Answers ]  [ Retake Quiz ]  [ Back Home ]|
    +--------------------------------------------------+

  WF_REVIEW: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Review — Agent Fundamentals                       |
    +--------------------------------------------------+
    | Attempt: Jan 28 09:12   Score: 80% (4/5)         |
    |                                                  |
    | Q1 ✅ Correct                                     |
    | Q2 ✅ Correct                                     |
    | Q3 ❌ Incorrect                                   |
    | Q4 ✅ Correct                                     |
    | Q5 ✅ Correct                                     |
    |                                                  |
    | [ Retake Quiz ]  [ Back to Results ]  [ Back Home]|
    +--------------------------------------------------+

  WF_HISTORY: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | History                                           |
    +--------------------------------------------------+
    | Filter by quiz: [ All Quizzes ▾ ]                 |
    | Sort by:        [ Newest first ▾ ]                |
    |                                                  |
    | ------------------------------------------------ |
    | | Quiz               | Score     | Date   | Act | |
    | ------------------------------------------------ |
    | | Agent Fundamentals | 80% (4/5) | Jan 28 |View | |
    | | Prompt Engineering | 60% (3/5) | Jan 27 |View | |
    | | Agent Fundamentals |100% (5/5) | Jan 25 |View | |
    | ------------------------------------------------ |
    | Showing 3 attempts                               |
    +--------------------------------------------------+

  WF_ATTEMPT_DETAILS: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Attempt Details                                  |
    +--------------------------------------------------+
    | Quiz: Agent Fundamentals                         |
    | Completed: Jan 28 09:12                          |
    | Score: 80% (4/5)                                 |
    |                                                  |
    | Q1 ✅  Q2 ✅  Q3 ❌  Q4 ✅  Q5 ✅                   |
    |                                                  |
    | [ Review Answers ] [ Retake Quiz ] [ Back History]|
    +--------------------------------------------------+

  WF_HISTORY_EMPTY: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | History                                           |
    +--------------------------------------------------+
    | Filter by quiz: [ All Quizzes ▾ ]                 |
    | Sort by:        [ Newest first ▾ ]                |
    |                                                  |
    | You haven't completed any quizzes yet.            |
    | Start a quiz to see your history here.            |
    |                                                  |
    | [ Back Home ]                                     |
    +--------------------------------------------------+

  WF_QUIZ_NOT_FOUND: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Quiz not found                                    |
    +--------------------------------------------------+
    | We couldn't find this quiz.                       |
    |                                                  |
    | [ Back Home ]                                     |
    +--------------------------------------------------+

  WF_RETAKE_CONFIRM: |
    +--------------------------------------------------+
    | QuizApp        Hello, {{UserName}}      [Logout] |
    +--------------------------------------------------+
    | Start over?                                       |
    +--------------------------------------------------+
    | This will reset your current progress.            |
    | Completed attempts remain in History.             |
    |                                                  |
    | [ Start Over ]  [ Cancel ]                        |
    +--------------------------------------------------+
```
