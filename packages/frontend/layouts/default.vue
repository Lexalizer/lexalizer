<script setup></script>

<template>
  <div class="main-container">
    <Head>
      <Title>Lexalizer</Title>
      <Meta
        name="description"
        content="Lexalizer is a tool for creating and managing lexical resources."
      />
    </Head>
    <main>
      <MainHeader />
      <div class="content">
        <Sidebar />
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
html,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  background-color: $background-primary;
  height: 100%;
  width: 100%;
  font-family: 'noto-sans', Helvetica, sans-serif;
  text-rendering: geometricPrecision;
}

.main-container,
main {
  height: 100%;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;

  .content {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>
