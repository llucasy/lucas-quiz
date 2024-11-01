<script lang="ts">
    import Welcome from "$lib/components/Welcome.svelte"
    import { userName } from "$lib/stores/userStore"
</script>

<main class="flex flex-col items-center justify-center text-center pt-12">
  <h1 class="text-3xl font-bold underline mb-8">Lucas Quiz</h1>
  <Welcome name={$userName} />
</main>