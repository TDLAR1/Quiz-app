<script setup>
import AnswerButton from './AnswerButton.vue'

const props = defineProps({
  answers: { type: Array, required: true },
  correct: { type: String, required: true },
  picked: { type: String, default: null },
})
defineEmits(['pick'])

function stateOf(answer) {
  if (props.picked === null) return 'idle'
  if (answer === props.correct) return 'correct'
  if (answer === props.picked) return 'wrong'
  return 'muted'
}
</script>

<template>
  <div class="answers">
    <AnswerButton
      v-for="(answer, i) in answers"
      :key="answer"
      :letter="String.fromCharCode(65 + i)"
      :text="answer"
      :state="stateOf(answer)"
      @pick="$emit('pick', answer)"
    />
  </div>
</template>

<style scoped>
.answers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  border-top: 2px solid var(--color-divider);
  border-left: 2px solid var(--color-divider);
}
</style>
