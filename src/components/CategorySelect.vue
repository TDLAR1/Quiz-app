<script setup>
defineProps({
  categories: { type: Array, required: true },
})
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="field">
    <label for="category">Category</label>
    <select id="category" v-model="model" class="input">
      <option value="">All categories</option>
      <option v-for="c in categories" :key="c.id" :value="String(c.id)">{{ c.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 6px; }
.field > label { margin-bottom: 0; }
select.input { appearance: auto; }
</style>
