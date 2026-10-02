<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { score } from '../score'

const route = useRoute()
const isQuiz = computed(() => route.name === 'quiz')
</script>

<template>
  <header class="nav header">
    <RouterLink to="/" class="nav-brand brand">
      <span class="brand-mark"></span>
      <span>Trivia</span>
    </RouterLink>
    <div v-if="isQuiz" class="score">
      <span class="score-label">Score</span>
      <span class="score-value">{{ score.correct }} / {{ score.total }}</span>
    </div>
  </header>
</template>

<style scoped>
.header { flex-wrap: wrap; gap: var(--space-3); justify-content: space-between; }
.nav .brand {
  display: flex; align-items: center; gap: 10px;
  color: var(--color-text); text-decoration: none; font-size: 18px;
}
.nav .brand:hover { color: var(--color-text); }
.brand-mark { width: 14px; height: 14px; background: var(--color-accent); display: block; }
.score { display: flex; align-items: center; gap: var(--space-2); font-size: 13px; }
.score-label { color: var(--color-neutral-700); }
.score-value {
  font-family: var(--font-heading); font-weight: 700; font-size: 18px;
  font-variant-numeric: tabular-nums;
}
</style>
