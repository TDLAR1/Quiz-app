<script setup>
import { useRoute } from 'vue-router'
import ArrowRight from '../components/ArrowRight.vue'

const route = useRoute()
</script>

<template>
  <main class="not-found">
    <span class="code">404</span>
    <div class="rule"></div>
    <div class="row">
      <p class="message">This page does not exist: {{ route.path }}</p>
      <RouterLink to="/" class="btn back">
        <span class="label">Back to quiz</span>
        <ArrowRight />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  flex: 1; background: var(--color-accent); color: var(--color-bg);
  padding: var(--space-6) var(--space-4);
  display: flex; flex-direction: column; justify-content: flex-end; gap: var(--space-4);
}
.code {
  font-family: var(--font-heading); font-weight: 700;
  font-size: clamp(120px, 28vw, 360px); line-height: 0.85; letter-spacing: -0.04em;
}
.rule { height: 2px; background: var(--color-bg); }
.row {
  display: flex; flex-wrap: wrap; justify-content: space-between;
  align-items: flex-end; gap: var(--space-3);
}
.message { margin: 0; font-size: clamp(20px, 2.4vw, 28px); max-width: 30ch; overflow-wrap: anywhere; }
.back {
  background: var(--color-bg); color: var(--color-text);
  justify-content: flex-start; min-width: 200px; text-decoration: none;
}
.back:hover { color: var(--color-text); }
.label { flex: 1; }
</style>
