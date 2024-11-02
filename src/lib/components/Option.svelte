<script lang="ts">
  import { quizStore } from '$lib/stores/gameStore'

  const {
    option,
    selectOption,
    answer,
  }: { option: string; selectOption: () => void; answer: string } = $props()

  const correctCSS = '!bg-green-500 '
  const selectedCSS = '!border-4 !border-white font-bold '
</script>

<button
  type="button"
  onclick={() => {
    selectOption()
  }}
  class={'!mb-4 !transform !cursor-pointer !rounded-lg !bg-[#3c0e70] !p-4 !opacity-80 !transition duration-300 ease-in-out hover:scale-105 hover:border-4 hover:shadow-2xl hover:shadow-green-500/50 ' +
    ($quizStore.answerSelected && option === answer ? correctCSS : '') +
    ($quizStore.answerSelected === option ? selectedCSS : '') +
    ($quizStore.answerSelected === option && $quizStore.answerSelected !== answer
      ? '!bg-red-500'
      : '')}
>
  <p>{option}</p>
</button>
