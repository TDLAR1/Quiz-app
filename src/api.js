const BASE = 'https://opentdb.com'
const RATE_LIMIT_DELAY = 5200
const MAX_RETRIES = 4

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchCategories() {
  const res = await fetch(`${BASE}/api_category.php`)
  const data = await res.json()
  return data.trivia_categories || []
}

export function shuffle(list) {
  const a = list.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Loads one easy question. OpenTDB answers with response_code 5 when requests
// come in faster than ~5s, so retry a few times after a short pause.
export async function fetchQuestion(category, attempt = 0) {
  const cat = category ? `&category=${category}` : ''
  const res = await fetch(`${BASE}/api.php?amount=1&difficulty=easy&encode=url3986${cat}`)
  const data = await res.json()

  if (data.response_code === 5 && attempt < MAX_RETRIES) {
    await wait(RATE_LIMIT_DELAY)
    return fetchQuestion(category, attempt + 1)
  }
  if (data.response_code !== 0 || !data.results?.length) {
    throw new Error('No question could be loaded for this selection.')
  }

  const raw = data.results[0]
  const dec = decodeURIComponent
  const question = {
    category: dec(raw.category),
    question: dec(raw.question),
    type: raw.type,
    correct: dec(raw.correct_answer),
  }
  const answers =
    question.type === 'boolean'
      ? ['True', 'False']
      : shuffle([question.correct, ...raw.incorrect_answers.map(dec)])

  return { question, answers }
}
