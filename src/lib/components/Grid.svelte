<script lang="ts">
  import { gridOptions } from '$lib/stores/readable'
  import Grid from 'gridjs-svelte'

  export let columns: any
  export let data: Array<Array<string | number>>

  let grid: Grid
  $: grid?.instance.updateConfig({ data }).forceRender()
</script>

<div class="p-5">
  <div class="grid-tools">
    <slot />
  </div>
  <Grid bind:this={grid} {columns} {data} {...$gridOptions} />
</div>
