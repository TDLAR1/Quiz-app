<script setup>
import ArrowRight from './ArrowRight.vue'

defineProps({
  isCorrect: { type: Boolean, required: true },
  correctAnswer: { type: String, required: true },
})
defineEmits(['next'])
</script>

<template>
  <div class="feedback" role="status">
    <div class="copy">
      <span class="title" :class="{ wrong: !isCorrect }">{{ isCorrect ? 'Correct.' : 'Wrong.' }}</span>
      <span class="sub">
        {{ isCorrect ? 'Well done.' : `The correct answer is: ${correctAnswer}` }}
      </span>
    </div>
    <button class="btn btn-primary next" @click="$emit('next')">
      <span class="label">New question</span>
      <ArrowRight />
    </button>
  </div>
</template>

<style scoped>
.feedback {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: var(--space-3); padding: var(--space-3) 0;
  border-top: 2px solid var(--color-divider);
}
.copy { display: flex; flex-direction: column; gap: 4px; }
.title { font-family: var(--font-heading); font-weight: 700; font-size: 28px; color: var(--color-text); }
.title.wrong { color: var(--color-accent-700); }
.sub { font-size: 14px; color: var(--color-neutral-700); }
.next { justify-content: flex-start; min-width: 200px; }
.label { flex: 1; text-align: left; }
</style>
