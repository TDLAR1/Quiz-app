# Trivia Quiz (WMC Lab01)

A Vue 3 single-page quiz app built on the [Open Trivia Database](https://opentdb.com) API.

## Features
- Loads one easy question at a time and shows the answers in random order (Fisher–Yates shuffle)
- Answer by button click; correct/wrong feedback with the right answer
- Category dropdown loaded from `api_category.php`
- "New question" and "Skip" buttons, session score in the header
- Vue Router with a 404 page for unknown URLs
- Responsive layout (sidebar + question on desktop, stacked on mobile)
- Handles the OpenTDB rate limit (`response_code: 5`) by retrying after 5.2s

## Run
```bash
npm install
npm run dev     # development server
npm run build   # production build in dist/
```

## Structure
```
src/
  api.js                 OpenTDB requests, decoding, shuffle, rate-limit retry
  score.js               shared session score
  router.js              "/" → QuizPage, everything else → NotFoundPage
  App.vue                header + <RouterView>
  pages/QuizPage.vue     quiz state and data loading
  pages/NotFoundPage.vue 404 page
  components/
    AppHeader.vue        brand + score
    CategorySelect.vue   category dropdown
    QuestionInfo.vue     question no., topic, difficulty, type
    QuestionCard.vue     question heading
    AnswerList.vue       answer grid
    AnswerButton.vue     single answer
    FeedbackMessage.vue  correct/wrong message + "New question"
    ArrowRight.vue       arrow icon
```
