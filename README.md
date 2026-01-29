# QuizApp — Use Cases & Routes (Functional Specification)

## Architecture & Technical Decisions

This project is structured as a **monorepo** using **pnpm workspaces** and **Turborepo**, with a clear separation between frontend, backend, shared contracts, and infrastructure.

The architecture, tooling choices, development workflow (dev, build, Docker), API boundaries, persistence strategy, and testing approach are fully documented here:

👉 **[docs/architecture.md](docs/architecture.md)**

That document is the **source of truth** for:
- monorepo structure and rationale
- frontend and backend stack
- Docker and proxy strategy (no CORS)
- AI-assisted development workflow
- testing strategy and Definition of Done

All implementation decisions and agent instructions must align with that document.

## Product Description

**QuizApp** is a small but realistic educational platform designed to help users **learn, practice, and reinforce AI software development concepts** such as agent design, prompt engineering, workflow automation, and model selection.

The product is intentionally scoped to feel **complete and production‑ready**, while remaining simple enough to be extended, improved, or scaled in future iterations.

QuizApp is not just a quiz engine — it is a **learning‑oriented product** that balances:

* assessment (scores, attempts, history)
* understanding (explanations, review, learning mode)
* good UX practices (clear navigation, persistence, predictable flows)

The platform supports:

* multiple quiz categories
* multiple attempts per quiz
* persistent user progress
* extensible architecture for future features

This document defines the **functional contract** for developers and autonomous agents implementing the application.

---

## Product Overview

AI Development Quiz is an educational quiz platform focused on AI software development concepts (agents, prompt engineering, workflows, model selection, etc.).

The product must feel:

* complete
* coherent
* extensible
* ready to scale

---

## Global UX & Domain Rules

* The authenticated user’s name is **always visible** in the top bar.
* A user can have:

  * **at most one active attempt per quiz**
  * **multiple completed attempts**
* History shows **only completed attempts**.
* Filters and sorting **do not change the visual row structure**.
* URLs represent **resources**, not internal steps.
* Question progress is **internal state**, not part of the URL.
* Persistence is handled via `localStorage` (acceptable for the interview).

---

## Authentication

### CU-AUTH-01 — Log in

**As a user**, I want to log in so that my progress can be saved and restored.

* **Route:** `/login`
* **Precondition:** User is not authenticated
* **Result:**

  * Session is created in `localStorage`
  * User state is loaded
* **Next route:** `/`
* **Wireframe:** `WF_LOGIN`

---

### CU-AUTH-02 — Log out

**As a user**, I want to log out knowing my data will remain saved.

* **Route:** any
* **Action:** `Logout`
* **Result:**

  * Active session is removed
  * Data remains on the device
* **Next route:** `/login`
* **Wireframe:** `WF_LOGOUT_CONFIRM`

---

## Home & Navigation

### CU-HOME-01 — View home (new user)

**As a user**, I want to understand what the app is and what quizzes are available.

* **Route:** `/`
* **Precondition:** authenticated, no previous attempts
* **UI:**

  * Brief app description
  * List of quiz categories
* **Wireframe:** `WF_HOME_EMPTY`

---

### CU-HOME-02 — View home with progress

**As a user**, I want to see my overall progress and completed quizzes.

* **Route:** `/`
* **Precondition:** at least one completed attempt
* **UI:**

  * Per‑quiz summary (attempts, last, best)
  * Access to history
* **Wireframe:** `WF_HOME_WITH_HISTORY`

---

### CU-HOME-03 — Resume in‑progress quiz

**As a user**, I want to continue a quiz I left unfinished.

* **Route:** `/`
* **Precondition:** active attempt exists
* **Actions:** `Resume` | `Restart`
* **Next route:** `/quiz/:quizId`
* **Wireframe:** `WF_HOME_WITH_CONTINUE`

---

## Quiz Experience

### CU-QUIZ-01 — Start quiz

**As a user**, I want to start a quiz from scratch.

* **Route:** `/quiz/:quizId`
* **Entry:** Home
* **Result:** active attempt is created
* **Wireframe:** `WF_QUIZ_BEFORE_ANSWER`

---

### CU-QUIZ-02 — Answer question

**As a user**, I want to answer a question and receive immediate feedback.

* **Route:** `/quiz/:quizId`
* **Action:** select option and submit
* **Result:**

  * correct / incorrect feedback
  * explanation displayed
* **Wireframes:**

  * `WF_QUIZ_AFTER_ANSWER`
  * `WF_QUIZ_BEFORE_ANSWER` (next question)

---

### CU-QUIZ-03 — View progress

**As a user**, I want to know which question I am on.

* **Indicator:** "Question X of Y"
* **Wireframe:** `WF_QUIZ_BEFORE_ANSWER`

---

### CU-QUIZ-04 — Finish quiz

**As a user**, I want to finish the quiz and see my results.

* **Route:** `/quiz/:quizId`
* **Action:** complete last question
* **Result:**

  * active attempt becomes completed
* **Next route:** `/quiz/:quizId/results`
* **Wireframes:** `WF_QUIZ_LAST_FINISH` → `WF_RESULTS`

---

## Results & Review

### CU-RESULT-01 — View results

**As a user**, I want to see my score and performance feedback.

* **Route:** `/quiz/:quizId/results`
* **UI:**

  * score
  * percentage
  * motivational message
* **Wireframe:** `WF_RESULTS`

---

### CU-RESULT-02 — Review answers

**As a user**, I want to review my answers to learn from them.

* **Route:** `/history/:attemptId`
* **Entry:** results or history
* **Wireframe:** `WF_REVIEW`

---

### CU-RESULT-03 — Retake quiz

**As a user**, I want to attempt the quiz again.

* **Route:** `/quiz/:quizId`
* **Result:** new active attempt
* **Wireframe:** `WF_QUIZ_BEFORE_ANSWER`

---

## History

### CU-HISTORY-01 — View history

**As a user**, I want to see all my past attempts.

* **Route:** `/history`
* **UI:** flat list of attempts
* **Wireframe:** `WF_HISTORY`

---

### CU-HISTORY-02 — Filter history

**As a user**, I want to filter attempts by quiz.

* **Route:** `/history`
* **Result:** same layout, fewer rows
* **Wireframe:** `WF_HISTORY`

---

### CU-HISTORY-03 — View attempt details

**As a user**, I want to view a specific attempt in detail.

* **Route:** `/history/:attemptId`
* **Wireframe:** `WF_ATTEMPT_DETAILS`

---

## Optional / Extensible Features

### CU-OPT-01 — Leaderboard (local)

**As a user**, I want to view a leaderboard of top scores so I can track my best performance and compare my attempts over time.

> ⚠️ Because persistence is scoped to the browser for this challenge, the leaderboard is **local to the device** (derived from `localStorage`) and does **not** represent a global ranking across different users/devices.

#### Functional scope

* The leaderboard is a **derived view** of **completed attempts**.
* It does not introduce new persisted entities.
* It can be displayed:

  * **per quiz** (recommended default)
  * optionally across all quizzes (same row layout)

#### Behavior

* **Route:** `/leaderboard`
* **Data source:** completed attempts stored in `localStorage`
* Sorting:

  1. score percentage (DESC)
  2. completion date/time (ASC) as a tie-breaker

#### Display rules

* Only attempts with `status = "completed"` are shown.
* Each row represents a **single attempt** (multiple attempts by the same user can appear).
* The UI includes a small note: *"Local results on this device"*.

#### User actions

* Filter by quiz using a dropdown (default: All or a specific quiz).

* Click **View** to open attempt details.

* **Attempt details route:** `/history/:attemptId`

* **Wireframe:** `WF_LEADERBOARD`

---

### CU-OPT-02 — Daily / weekly challenge

* Highlighted access from Home
* **Wireframe:** `WF_DAILY_CHALLENGE`

---

### CU-OPT-03 — Learning mode

**As a user**, I want to learn the concept before answering the question, so I can understand the topic rather than only being evaluated.

#### Functional scope

Learning Mode is a variant of the normal quiz flow focused on guided learning.

* It is not a separate quiz
* It does not remove evaluation
* It does not reveal the correct answer in advance

The main difference is **the order in which information is shown**.

#### Behavior

* The mode is selected **before starting the quiz** (e.g. from Home or a pre‑start screen)
* The selected mode is stored in the attempt (`attempt.mode = "learn" | "normal"`)
* It applies to **all questions in the attempt**

#### Per‑question flow

1. A **conceptual explanation block** is shown first
2. The explanation provides context but **does not indicate the correct answer**
3. The user explicitly clicks **"View question"** or **"Continue"**
4. The question and options are displayed
5. The user answers and receives normal feedback

#### User sees

* A header indicating *Learning Mode*
* An educational text block before each question
* A clear CTA to proceed

#### Persistence

* The selected mode is saved in the attempt

* History, score, and overall behavior **do not change**

* **Wireframe:** `WF_LEARN_MODE`

---

### CU-OPT-04 — Randomized questions

**As a user**, I want the order of questions to change each time I take a quiz, to avoid memorizing answers by position.

#### Functional scope

* Each quiz has a **fixed set of questions** (e.g. 5)
* **No questions are added or removed**
* **Questions are not mixed across quizzes**

The feature only **randomizes the order of questions per attempt**.

#### Behavior

* The random order is generated **when the attempt is created**
* The order differs between attempts but is **stable within the same attempt**
* The order is persisted as part of the attempt

Example:

* Attempt 1: Q1 → Q2 → Q3 → Q4 → Q5
* Attempt 2: Q3 → Q1 → Q5 → Q2 → Q4

#### Persistence

* Order is stored in the attempt (e.g. `questionOrder[]`)
* Refreshing the browser does not change the order

#### UX

* The UI does not change
* Benefit: higher replayability and more honest evaluation

---

### CU-OPT-05 — Create your own quiz (extensible / future phase)

**As a user**, I want to create my own quiz to evaluate specific knowledge or share custom educational content.

> ⚠️ In the first version of the product, this feature is **NOT operational**. Its functional scope and UX are defined only as **preparation for future iterations**, with no active business logic.

---

#### Goal

Prepare the application to support user‑generated quizzes in the future without compromising the current architecture or introducing technical debt.

---

#### Functional scope — Current phase (placeholder)

In this version:

* Users cannot actually create quizzes
* No user‑generated content is persisted
* Existing quizzes cannot be modified

The feature is limited to an **informational screen** that:

* explains what the feature will be
* communicates that it is coming soon
* reinforces the vision of an extensible platform

---

#### Current behavior

* Users access **"Create your own quiz"** from:

  * Home
  * Global navigation

* The route is accessible but not editable

* **Route:** `/create-quiz`

---

#### User sees

* Clear title: "Create your own quiz"
* Status message: *"Coming soon"*
* Brief explanation of the feature’s goal:

  * create categories
  * add questions
  * define correct answers
* Passive CTA:

  * "Back to Home"
  * (optional) "Notify me when available"

---

#### UX / Design

* No active forms
* No validations
* No save buttons
* The screen does **not mislead** the user or create false expectations

---

#### Expected future scope (DO NOT IMPLEMENT now)

This section defines **intent**, not current tasks.

Future versions may include:

* Creating a quiz with:

  * title
  * description
  * category
* Adding questions:

  * text
  * multiple options
  * correct answer
  * explanation
* Quiz preview
* Running the user‑created quiz
* Separation between official quizzes and user quizzes

---

#### Architectural impact (current)

* None at runtime
* Only required:

  * defined route
  * existing wireframe
  * placeholder component

---

* **Wireframe:** `WF_CREATE_QUIZ_PLACEHOLDER`

---

## Acceptance Criteria

* Users can start, complete, and retake quizzes without friction.
* Progress persists across sessions.
* UX is clear, consistent, and predictable.
* Architecture supports future expansion without major refactors.

---

**This document is the functional source of truth for the product.**

---

## Wireframe Reference Index

This section maps each functional area to its corresponding wireframe identifier. Full wireframe definitions are maintained separately in `wireframes.yaml`.

### Global

* `WF_GLOBAL_NAV` — Global navigation bar (top-level layout)

### Authentication

* `WF_LOGIN` — Login screen
* `WF_LOGOUT_CONFIRM` — Logout confirmation

### Home

* `WF_HOME_EMPTY` — Home view for new users (no history)
* `WF_HOME_WITH_HISTORY` — Home view with completed attempts
* `WF_HOME_WITH_CONTINUE` — Home view with active attempt to resume

### Quiz Flow

* `WF_QUIZ_BEFORE_ANSWER` — Question view before answering
* `WF_QUIZ_AFTER_ANSWER` — Feedback after answering a question
* `WF_QUIZ_LAST_FINISH` — Final question completion state

### Results & Review

* `WF_RESULTS` — Quiz results summary
* `WF_REVIEW` — Review answers for a completed attempt

### History

* `WF_HISTORY` — Global history list (supports filtering)
* `WF_ATTEMPT_DETAILS` — Detailed view of a single attempt

### Optional / Extensible

* `WF_LEADERBOARD` — Leaderboard view
* `WF_DAILY_CHALLENGE` — Daily / weekly challenge entry point
* `WF_LEARN_MODE` — Learning Mode (explanation before question)
* `WF_CREATE_QUIZ_PLACEHOLDER` — Create your own quiz (placeholder)
