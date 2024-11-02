import { shuffleArray } from '$lib'
import type { Question } from '$lib/types'
import { writable } from 'svelte/store'

const STAGES = ['Start', 'Playing', 'End']

// Estado inicial
const initialState: {
  gameStage: string
  currentQuestion: number
  score: number
  answerSelected: string
  questions: Question[]
} = {
  gameStage: STAGES[0],
  currentQuestion: 0,
  score: 0,
  answerSelected: '',
  questions: [],
}

// Store principal
export const quizStore = writable({ ...initialState })

// Ações para manipular o estado
export const setQuestions = (newQuestions: Question[]) => {
  quizStore.update((state) => {
    const shuffledQuestions = newQuestions
      .map((question) => ({
        ...question,
        options: shuffleArray(
          question.options.map((option) => ({
            id: option.id,
            text: option.text,
            questionId: option.questionId,
          })),
        ).filter((option) => option.id !== ''), // Remover opções vazias
      }))
      .map((question) => ({
        ...question,
        options:
          question.options.length > 0 ? question.options : [{ id: '', text: '', questionId: '' }],
      }))
    return { ...state, questions: shuffledQuestions }
  })
}

export const changeState = () => {
  quizStore.update((state) => ({
    ...state,
    gameStage: STAGES[1],
  }))
}

export const reorderQuestions = () => {
  quizStore.update((state) => ({
    ...state,
    questions: state.questions.sort(() => Math.random() - 0.5),
  }))
}

export const changeQuestion = () => {
  quizStore.update((state) => {
    const nextQuestion = state.currentQuestion + 1
    const endGame = nextQuestion >= state.questions.length
    return {
      ...state,
      currentQuestion: nextQuestion,
      gameStage: endGame ? STAGES[2] : state.gameStage,
      answerSelected: '',
    }
  })
}

export const newGame = () => {
  quizStore.set({ ...initialState, gameStage: STAGES[1] })
}

export const checkAnswer = (option: { text: string }, answer: string) => {
  quizStore.update((state) => {
    if (state.answerSelected) return state
    const correctAnswer = answer === option.text
    return {
      ...state,
      score: correctAnswer ? state.score + 1 : state.score,
      answerSelected: option.text,
    }
  })
}
