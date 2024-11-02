<script lang="ts">
  import { newGame, quizStore } from '$lib/stores/gameStore'
  import src from '$lib/assets/wellDone.svg'
</script>

<div class="flex max-w-lg flex-col text-center [&>p]:mb-4 [&>p]:text-[#8435de]">
  <h2 class="mb-4">Fim de jogo!</h2>
  <p>Pontuação: {$quizStore.score}</p>
  <p>Voce acertou {$quizStore.score} de {$quizStore.questions.length} perguntas.</p>
  <p>Parabéns!</p>
  <img src={src} alt="Well Done" class="m-8 h-52" />
  <button type="button" onclick={() => newGame()}>Reiniciar o jogo</button>
</div>

<style lang="postcss">
  button {
    @apply cursor-pointer rounded border-none bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-xl font-bold outline hover:scale-105 hover:from-purple-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-blue-500/50;
  }
</style>
