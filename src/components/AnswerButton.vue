<script setup>
import { computed } from 'vue'

const props = defineProps({
  letter: { type: String, required: true },
  text: { type: String, required: true },
  // 'idle' | 'correct' | 'wrong' | 'muted'
  state: { type: String, default: 'idle' },
})
defineEmits(['pick'])

const mark = computed(() =>
  props.state === 'correct' ? 'Correct' : props.state === 'wrong' ? 'Wrong' : '',
)
</script>

<template>
  <button class="answer" :class="`is-${state}`" :disabled="state !== 'idle'" @click="$emit('pick')">
    <span class="letter">{{ letter }}</span>
    <span class="text">{{ text }}</span>
    <span v-if="mark" class="mark">{{ mark }}</span>
  </button>
</template>

<style scoped>
.answer {
  display: flex; align-items: center; justify-content: flex-start; gap: var(--space-3);
  text-align: left; min-height: 72px; padding: var(--space-3);
  font: inherit; font-size: 16px;
  border: 0; border-right: 2px solid var(--color-divider); border-bottom: 2px solid var(--color-divider);
  border-radius: 0; cursor: pointer;
  background: transparent; color: var(--color-text);
}
.answer.is-idle:hover { background: var(--color-accent-100); }
.answer:disabled { cursor: default; }
.answer.is-correct { background: var(--color-text); color: var(--color-bg); }
.answer.is-wrong { background: var(--color-accent); color: var(--color-bg); }
.answer.is-muted { color: var(--color-neutral-500); }

.letter {
  font-family: var(--font-heading); font-weight: 700; font-size: 13px;
  width: 28px; height: 28px; flex: none;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid currentColor;
}
.text { flex: 1; text-wrap: pretty; }
.mark { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
</style>
