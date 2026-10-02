import { createRouter, createWebHistory } from 'vue-router'
import QuizPage from './pages/QuizPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'quiz', component: QuizPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
})
