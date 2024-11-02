export interface Question {
  question: string
  options: { id: string; text: string; questionId: string }[]
  answer: string
  subject: string
  author: string
}
