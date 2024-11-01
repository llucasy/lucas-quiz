import { shuffleArray } from '$lib'
import { get, writable } from 'svelte/store'

interface gameState {
  gameStage: string
  currentQuestion: number
  score: number
  answerSelected: boolean
  questions:
    | []
    | [{ question: string; options: string[]; answer: string; subject: string; author: string }]
}

interface gameActions {
  SET_QUESTIONS: 'SET_QUESTIONS'
  CHANGE_STATE: 'CHANGE_STATE'
  REORDER_QUESTIONS: 'REORDER_QUESTIONS'
  CHANGE_QUESTION: 'CHANGE_QUESTION'
  NEW_GAME: 'NEW_GAME'
  CHECK_ANSWER: 'CHECK_ANSWER'
}

let questions: [
  { question: string; options: string[]; answer: string; subject: string; author: string },
]
const STAGES = ['Playing', 'End']

const initialState: gameState = {
  gameStage: STAGES[0],
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  questions: [],
}

const state = writable({
  gameStage: STAGES[0],
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
  questions: [],
})

export const gameReducer = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: gameActions[keyof gameActions]; payload: any },
) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...get(state),
        questions: action.payload.questions,
      }
    case 'CHANGE_STATE':
      return {
        ...get(state),
        gameStage: STAGES[1],
        questions: questions.map((question) => {
          // embaralhar as opções
          return {
            ...question,
            options: shuffleArray(question.options),
          }
        }),
      }
    case 'REORDER_QUESTIONS':
      return {
        ...state,
        questions: questions.sort(() => Math.random() - 0.5),
      }
    case 'CHANGE_QUESTION': {
      state.update((state) => ({ ...state, currentQuestion: state.currentQuestion + 1 }))
      const nextQuestion = (get(state) as gameState).currentQuestion
      const endGame = nextQuestion >= (get(state) as gameState).questions.length
      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[2] : get(state).gameStage,
        answerSelected: false,
      }
    }
    case 'NEW_GAME':
      state.set({ ...initialState, questions: [] })
      return state
    case 'CHECK_ANSWER': {
      if (get(state).answerSelected) return state
      const option = action.payload.option.text
      return {
        ...state,
        score:
          action.payload.answer === option
            ? state.update((state) => ({ ...state, score: state.score + 1 }))
            : get(state).score,
        answerSelected: option,
      }
    }
  }
}

// switch (action.type) {
//   case 'SET_QUESTIONS':
//     questions = action.payload.questions
//     return { ...state }
//   case 'CHANGE_STATE':
//     return {
//       ...state,
//       gameStage: STAGES[1],
//       questions: questions.map((question: any) => {
//         // embaralhar as opções
//         return {
//           ...question,
//           options: shuffleArray(question.options),
//         }
//       }),
//     }
//   case 'REORDER_QUESTIONS':
//     return {
//       ...state,
//       questions: questions.sort(() => Math.random() - 0.5),
//     }
//   case 'CHANGE_QUESTION':
//     const nextQuestion = state.currentQuestion + 1
//     const endGame = nextQuestion >= state.questions.length
//     return {
//       ...state,
//       currentQuestion: nextQuestion,
//       gameStage: endGame ? STAGES[2] : state.gameStage,
//       answerSelected: false,
//     }
//   case 'NEW_GAME':
//     return initialState
//   case 'CHECK_ANSWER':
//     if (state.answerSelected) return state
//     const option = action.payload.option.text
//     return {
//       ...state,
//       score: action.payload.answer === option ? state.score + 1 : state.score,
//       answerSelected: option,
//     }
//   default:
//     return state
// }
