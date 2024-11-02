import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import prisma from '$lib/prisma'

export const POST: RequestHandler = async ({ request }) => {
  const { author } = await request.json()

  try {
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
  } catch (error) {
    console.log(error)
    return json({ error }, { status: 500 })
  }
}
