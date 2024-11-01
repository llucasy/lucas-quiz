<script lang="ts">
  import { userName } from "$lib/stores/userStore"
  import src from '$lib/assets/quiz.svg'

    const getSubjects: () => Promise<[{ subject: string }]> = async () => {
    const response = await fetch('/api/subject', {
      method: 'POST',
      body: JSON.stringify({ author: $userName }),
      headers: {
        'content-type': 'application/json',
      },
    })
    return await response.json()
  }
</script>

<main class="flex flex-col items-center justify-center text-center pt-12">
  <h1 class="text-3xl font-bold underline mb-8">Lucas Quiz</h1>
  <div class="flex max-w-[500px] flex-col items-center justify-center">
    <h2 class="mb-4 text-4xl font-bold">
      Seja bem-vinda, <span class="capitalize text-purple-500">{$userName}</span>!
    </h2>
    <p class="mb-4 text-[#8435de]">Clique no botão abaixo para começar:</p>
    <div class="flex gap-6">
      {#await getSubjects()}
        <button
          type="button"
          class="mb-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Carregando...
        </button>
      {:then subjects}
        {#if subjects.length > 1}
          {#each subjects as subject}
            <button
              type="button"
              class="mb-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              {subject.subject}
            </button>
          {/each}
        {/if}
      {/await}
    </div>
    <button
      type="button"
      class="mt-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Iniciar
    </button>
    <img class="mt-8" {src} alt="Inicio do Quiz" />
  </div>
</main>