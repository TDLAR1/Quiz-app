<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { fetchCategories, fetchQuestion } from '../api'
import { score } from '../score'
import CategorySelect from '../components/CategorySelect.vue'
import QuestionInfo from '../components/QuestionInfo.vue'
import QuestionCard from '../components/QuestionCard.vue'
import AnswerList from '../components/AnswerList.vue'
import FeedbackMessage from '../components/FeedbackMessage.vue'

const categories = ref([])
const category = ref('')
const question = ref(null)
const answers = ref([])
const picked = ref(null)
const loading = ref(true)
const error = ref('')
const questionNo = ref(0)

const answered = computed(() => picked.value !== null)
const isCorrect = computed(() => answered.value && picked.value === question.value.correct)

// Each load gets an id so a slow (or rate-limited) earlier request can't
// overwrite a newer one.
let requestId = 0

async function load() {
  const id = ++requestId
  loading.value = true
  error.value = ''
  question.value = null
  picked.value = null
  try {
    const result = await fetchQuestion(category.value)
    if (id !== requestId) return
    question.value = result.question
    answers.value = result.answers
    questionNo.value++
  } catch {
    if (id !== requestId) return
    error.value = 'No question could be loaded for this selection.'
  } finally {
    if (id === requestId) loading.value = false
  }
}

function pick(answer) {
  if (answered.value) return
  picked.value = answer
  score.total++
  if (answer === question.value.correct) score.correct++
}

watch(category, load)

onMounted(() => {
  fetchCategories()
    .then((list) => (categories.value = list))
    .catch(() => {})
  load()
})
</script>

<template>
  <main class="quiz">
    <aside class="sidebar">
      <CategorySelect v-model="category" :categories="categories" />
      <div class="rule"></div>
      <QuestionInfo :number="questionNo" :question="question" />
    </aside>

    <section class="stage">
      <p v-if="loading" class="status">Loading question …</p>

      <div v-else-if="error" class="error">
        <p class="status error-text">{{ error }}</p>
        <button class="btn btn-secondary" @click="load">Try again</button>
      </div>

      <div v-else-if="question" class="stack">
        <QuestionCard :text="question.question" />
        <AnswerList :answers="answers" :correct="question.correct" :picked="picked" @pick="pick" />
        <FeedbackMessage
          v-if="answered"
          :is-correct="isCorrect"
          :correct-answer="question.correct"
          @next="load"
        />
        <div v-else class="skip">
          <button class="btn btn-ghost" @click="load">Skip</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.quiz {
  flex: 1; display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  max-width: 1200px; width: 100%; margin: 0 auto;
}
.sidebar {
  padding: var(--space-6) var(--space-4);
  border-right: 2px solid var(--color-divider);
  display: flex; flex-direction: column; gap: var(--space-4);
  max-width: 100%;
}
.rule { height: 2px; background: var(--color-divider); }
.stage {
  grid-column: span 2; min-width: 0;
  padding: var(--space-6) var(--space-4);
  display: flex; flex-direction: column; gap: var(--space-4);
}
.stack { display: flex; flex-direction: column; gap: var(--space-4); }
.status { margin: 0; font-size: 14px; color: var(--color-neutral-700); }
.error { display: flex; flex-direction: column; gap: var(--space-2); align-items: flex-start; }
.error-text { color: var(--color-accent-700); }
.skip { display: flex; justify-content: flex-end; }

/* On narrow screens the sidebar stacks above the question. */
@media (max-width: 559px) {
  .stage { grid-column: auto; }
  .sidebar { border-right: 0; border-bottom: 2px solid var(--color-divider); }
}
</style>
