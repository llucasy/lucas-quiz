<script lang="ts">
  import { onMount } from 'svelte'
  import src from '$lib/assets/quiz.svg';

  const { name }: { name: string } = $props()
  let subjects: [{ subject: string }] = $state([{ subject: '' }])

  onMount(async () => {
    const response = await fetch('/api/subject', {
      method: 'POST',
      body: JSON.stringify({ author: name }),
      headers: {
        'content-type': 'application/json',
      },
    })

    subjects = await response.json()
  })
</script>

<div class="flex max-w-[500px] flex-col items-center justify-center">
  <h2 class="mb-4 text-4xl font-bold">
    Seja bem-vinda, <span class="capitalize text-purple-500">{name}</span>!
  </h2>
  <p class="mb-4 text-[#8435de]">Clique no botão abaixo para começar:</p>
  <div class="flex gap-6">
    {#each subjects as subject}
      <button
        type="button"
        class="mb-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        {subject.subject}
      </button>
    {/each}
  </div>
  <button
    type="button"
    class="mt-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  >
    Iniciar
  </button>
  <img class="mt-8" {src} alt="Inicio do Quiz" />
</div>
