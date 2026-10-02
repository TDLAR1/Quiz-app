<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: { type: Number, required: true },
  question: { type: Object, default: null },
})

const questionNo = computed(() => String(props.number).padStart(2, '0'))
const typeLabel = computed(() => {
  if (!props.question) return '—'
  return props.question.type === 'boolean' ? 'True / False' : 'Multiple Choice'
})
</script>

<template>
  <dl class="info">
    <dt>Question</dt>
    <dd class="num">{{ questionNo }}</dd>
    <dt>Topic</dt>
    <dd>{{ question?.category ?? '—' }}</dd>
    <dt>Difficulty</dt>
    <dd>Easy</dd>
    <dt>Type</dt>
    <dd>{{ typeLabel }}</dd>
  </dl>
</template>

<style scoped>
.info {
  margin: 0; display: grid; grid-template-columns: auto 1fr;
  gap: 10px var(--space-3); font-size: 13px;
}
dt { color: var(--color-neutral-700); }
dd { margin: 0; }
.num { font-variant-numeric: tabular-nums; }
</style>
