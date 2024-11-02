<script lang="ts">
  import Option from '$lib/components/Option.svelte'
  import {
    changeState,
    checkAnswer,
    quizStore,
    reorderQuestions,
    setQuestions,
  } from '$lib/stores/gameStore'
  import { userName } from '$lib/stores/userStore'
  import type { Question } from '$lib/types'

  const getQuestions: () => Promise<Question[]> = async () => {
    const response = await fetch('/api/question', {
      method: 'POST',
      body: JSON.stringify({ author: $userName }),
      headers: {
        'content-type': 'application/json',
      },
    })
    return await response.json()
  }

  const currentQuestion = $quizStore.questions[$quizStore.currentQuestion]

  const onSelectOption = (option: { id: string; text: string; questionId: string }) => {
    checkAnswer(option, currentQuestion.answer)
  }
</script>

<svelte:head>
  <title>LucasQuiz - Jogo {$userName}</title>
  <meta name="description" content="Quiz criado pelo Lucas página do jogo" />
</svelte:head>

<main class="flex flex-col items-center justify-center pt-12 text-center">
  {#await getQuestions()}
    Carregando...
  {:then questions}
    {setQuestions(questions)}
    {changeState()}
    {reorderQuestions()}
    <div class="max-w-lg rounded-2xl bg-[#8435de] p-3 text-center">
      <p>
        Pergunta {$quizStore.currentQuestion + 1} de {$quizStore.questions.length} - Score: {$quizStore.score}
      </p>
      <h2 class="my-4">{currentQuestion.question}</h2>
      <div>
        {#each currentQuestion.options as option}
          <Option option={option.text} selectOption={() => onSelectOption(option)} answer={currentQuestion.answer} />
        {/each}
      </div>
    </div>
  {/await}
</main>
