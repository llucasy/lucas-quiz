<script lang="ts">
  import Option from '$lib/components/Option.svelte'
  import {
    changeQuestion,
    changeState,
    checkAnswer,
    newGame,
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

  $: currentQuestion = $quizStore.questions[$quizStore.currentQuestion]

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
    <p>Carregando jogo para <span class="capitalize">{$userName}</span>...</p>
  {:then questions}
    {newGame()}
    {setQuestions(questions)}
    {changeState()}
    {reorderQuestions()}
    <div class="max-w-lg rounded-2xl bg-[#8435de] p-3 text-center">
      <p>
        Pergunta {$quizStore.currentQuestion + 1} de {$quizStore.questions.length} - Score: {$quizStore.score}
      </p>
      <h2 class="my-4">{currentQuestion.question}</h2>
      <div class="flex flex-col">
        {#each currentQuestion.options as option}
          <Option
            option={option.text}
            selectOption={() => onSelectOption(option)}
            answer={currentQuestion.answer}
          />
        {/each}
      </div>
      {#if $quizStore.answerSelected}
        <button
          type="button"
          onclick={() => changeQuestion()}
          class="mb-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Continuar
        </button>
      {/if}
    </div>
  {/await}
</main>

<style lang="postcss">
  button {
    @apply cursor-pointer rounded border-none bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-xl font-bold outline hover:scale-105 hover:from-purple-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-blue-500/50;
  }
</style>
