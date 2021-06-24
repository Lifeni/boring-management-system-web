<script lang="ts">
  import LoginBox from '$lib/components/LoginBox.svelte'
</script>

<svelte:head>
  <title>登录 | 一个教务管理系统</title>
</svelte:head>

<main class="h-100 d-flex justify-content-evenly align-items-center">
  <section class="text-center">
    <h1 class="fs-2">一个教务管理系统</h1>
    <p class="fs-5 mb-3">
      <code>boring-management-system</code>
    </p>
  </section>
  <LoginBox />
</main>
