<script lang="ts">
  import { quizStore } from '$lib/stores/gameStore'

  const { option, selectOption, answer }: { option: string; selectOption: () => void; answer: string } = $props()

  const correctCSS = '!bg-[#0bfc03] font-bold'
  const wrongCSS = 'bg-[#3c0e70] opacity-100'
</script>

<button
  type="button"
  onclick={() => selectOption()}
  class={'!mb-4 !transform !cursor-pointer !rounded-lg !bg-[#3c0e70] !p-4 !opacity-80 !transition duration-300 ease-in-out hover:scale-110 hover:opacity-100 ' +
    ($quizStore.answerSelected && option === answer ? correctCSS : '') +
    ($quizStore.answerSelected && option !== answer ? wrongCSS : '')}
>
  <p>{option}</p>
</button>
