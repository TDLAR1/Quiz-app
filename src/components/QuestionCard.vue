<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>

<template>
  <h1 class="question">{{ text }}</h1>
</template>

<style scoped>
.question {
  margin: 0; font-family: var(--font-heading); font-weight: 700;
  font-size: clamp(26px, 4vw, 44px); line-height: 1.1;
  letter-spacing: -0.01em; text-wrap: pretty;
}
</style>
