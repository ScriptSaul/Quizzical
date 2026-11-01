import { useState, useEffect } from 'react'
import './App.css'
import StartScreen from './components/StartScreen.jsx'
import QuizScreen from './components/QuizScreen.jsx'


function App() {
  const [quizState, setQuizState] = useState("start")
  const [questions, setQuestions] = useState([])
  const [quizId, setQuizId] = useState(0) // New state variable to track quiz ID
  const [selectedCategory, setSelectedCategory] = useState("any") // New state variable for selected category
  const [categories, setCategories] = useState([])
  const [difficulty, setDifficulty] = useState("any") // New state variable for selected difficulty
  const [questionCount, setQuestionCount] = useState(5) // New state variable for question count
  const [error, setError] = useState(null) // New state variable for error handling
  const [loading, setLoading] = useState(false)

  function backToSettings() {
    setQuizState("start")
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("https://opentdb.com/api_category.php")
      const data = await response.json()
      setCategories(data.trivia_categories)
    }
    fetchCategories()
  }, [])


const startQuiz = () => {
    setError(null)
    setQuestions([])
    setLoading(true)
    setQuizState("quiz")

    async function fetchQuestions() {
        try {
            const categoryParam = selectedCategory === "any" ? "" : `&category=${selectedCategory}`
            const difficultyParam = difficulty === "any" ? "" : `&difficulty=${difficulty}`
            const apiUrl = `https://opentdb.com/api.php?amount=${questionCount}&type=multiple${categoryParam}${difficultyParam}`

            const response = await fetch(apiUrl)
            const data = await response.json()

            if (data.response_code !== 0) {
                setError("Unable to fetch quiz questions.")
                return
            }

            const preparedQuestions = data.results.map(question => {
                const shuffledAnswers = shuffleArray([
                    question.correct_answer,
                    ...question.incorrect_answers
                ])

                return {
                    ...question,
                    shuffledAnswers: shuffledAnswers
                }
            })

            setQuestions(preparedQuestions)
            setQuizId(prevId => prevId + 1)

        } catch (error) {
            console.error("Request failed:", error)
            setError("Something went wrong. Please try again.")

        } finally {
            setLoading(false)
        }
    }

    fetchQuestions()
}


  function shuffleArray(answers) {
    const shuffled = [...answers]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

  return (
    <>
      {
      quizState === "start" && 
      <StartScreen 
      startQuiz={startQuiz} 
      category={selectedCategory} 
      setCategory={setSelectedCategory} 
      categories={categories}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      questionCount={questionCount}
      setQuestionCount={setQuestionCount}
      error={error}
      />
      
      }
      {quizState === "quiz" && 
      <QuizScreen 
      key={quizId} 
      questions={questions} 
      onPlayAgain={startQuiz} 
      onBackToSettings={backToSettings}
      error={error}
      loading={loading}
      />
      }
    </>
  )
}

export default App
















