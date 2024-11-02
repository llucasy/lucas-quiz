import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prisma } from '$lib/prisma'

export const POST: RequestHandler = async ({ request }) => {
  const { author } = await request.json()

  try {
    if (!author) {
      return json({ error: 'author must be informed' }, { status: 400 })
    }
    const subjects = await prisma.question.findMany({
        where: {
            author: {
              name: {
                equals: String(author),
              },
            },
          },
          select: {
            subject: true
          },
          distinct: ['subject'],
    })

    return json(subjects, { status: 200 })
  } catch (error) {
    console.log(error)
    return json({ error }, { status: 500 })
  }
}
 