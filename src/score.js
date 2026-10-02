import { reactive } from 'vue'

// Session score, shared by the header and the quiz page.
export const score = reactive({ correct: 0, total: 0 })
