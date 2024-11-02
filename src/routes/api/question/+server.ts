import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prisma } from '$lib/prisma'

export const POST: RequestHandler = async ({ request }) => {
  const { author, subjects } = await request.json()

  try {
    if (!author || !subjects) {
      return json({ error: 'author and subjects must be informed' }, { status: 400 })
    }

    if (subjects[0] === '') {
      const questions = await prisma.question.findMany({
        where: {
          author: {
            name: {
              equals: String(author),
            },
          },
        },
        include: {
          options: true,
        },
      })

      return json(questions, { status: 200 })
    } else {
      const questions = await prisma.question.findMany({
        where: {
          author: {
            name: {
              equals: String(author),
            },
          },
          subject: {
            in: subjects,
          },
        },
        include: {
          options: true,
        },
      })

      return json(questions, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return json({ error }, { status: 500 })
  }
}
