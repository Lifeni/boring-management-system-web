<script lang="ts">
  import Toast from '$lib/components/Toast.svelte'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'gridjs/dist/theme/mermaid.css'
  import 'pattern.css/dist/pattern.min.css'
</script>

<div class="w-100 vh-100 px-5 py-4">
  <slot />
</div>
<Toast />
