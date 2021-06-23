<script lang="ts">
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<div class="w-100 vh-100 px-3 px-sm-5 py-5">
  <slot />
</div>

<style global>
  :root {
    --bs-font-sans-serif: Inter, 'Source Han Sans SC', system-ui, -apple-system, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
    --bs-font-monospace: 'JetBrains Mono', 'Fira Mono', SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace !important;
  }

  body {
    font-family: var(--bs-font-sans-serif);
  }
</style>
