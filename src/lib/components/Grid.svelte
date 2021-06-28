<script lang="ts">
  import { gridOptions } from '$lib/stores/readable'
  import Grid from 'gridjs-svelte'
  import { fade } from 'svelte/transition'

  export let columns: any
  export let data: Array<Array<string | number | Date | boolean>>

  let grid: Grid
  $: grid?.instance.updateConfig({ columns, data }).forceRender()
</script>

<div class="py-4 px-0" in:fade={{ duration: 200 }}>
  <div class="grid-tools">
    <slot />
  </div>
  <Grid bind:this={grid} {columns} {data} {...$gridOptions} />
</div>
