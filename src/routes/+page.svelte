<script lang="ts">
  import src from '$lib/assets/quiz.svg';
</script>

<svelte:head>
  <title>Lucas - Quiz</title>
  <meta name="description" content="Quiz criado pelo Lucas" />
</svelte:head>

<main class="flex flex-col items-center justify-center pt-12 text-center">
  <h1 class="mb-8 text-3xl font-bold underline">Quiz Lucas</h1>
  <div class="flex max-w-[500px] flex-col items-center justify-center">
    <h2 class="mb-4 text-4xl font-bold">Perguntas e Respostas</h2>
    <p class="mb-4 text-[#8435de]">Escolha um nome abaixo para começar:</p>
    <div class="flex gap-6">
      <a href="/stella">
        <button
          type="button"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Stella
        </button>
      </a>
      <a href="/stefany">
        <button
          type="button"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Stefany
        </button>
      </a>
    </div>
    <img class="mt-8" {src} alt="Inicio do Quiz" />
  </div>
</main>
