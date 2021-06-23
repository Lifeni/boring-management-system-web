<script lang="ts">
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<div class="w-100 vh-100 px-3 px-sm-5 py-5">
  <slot />
</div>

<style global>
  :root {
    --bs-font-sans-serif: Inter, '阿里巴巴普惠体 2.0', 'Source Han Sans SC', system-ui,
      -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
    --bs-font-monospace: 'JetBrains Mono', 'Fira Mono', SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace !important;

    font-size: 18px;
    font-weight: 600;
  }

  body {
    font-family: var(--bs-font-sans-serif);
    min-width: 1024px;
  }

  .fs-7 {
    font-size: 0.875rem !important;
  }
</style>
