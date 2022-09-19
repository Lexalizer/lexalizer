<template>
  <div class="main-header">
    <div class="top-right-edge" />
    <div class="title-container">
      <h1 class="main-title">Lexalizer</h1>
    </div>
  </div>
</template>

<style lang="scss">
.main-header {
  background: $background-header;
  height: 60px;
  display: flex;
  flex-direction: row;
  box-shadow: $header-shadow;
  position: relative;

  .top-right-edge {
    position: absolute;
    bottom: -40px;
    background: $background-header-1;
    height: 40px;
    width: 40px;
    clip-path: polygon(0 0, 100% 0, 0 100%);

    &::after {
      content: '';
      position: absolute;
      height: 40px;
      width: 40px;
      background: $background-primary;
      border-radius: 25px 0 0 0;
    }
  }

  .title-container {
    height: 100%;
    display: flex;

    .main-title {
      margin: auto 0;
      font-size: 1.5rem;
      color: $text-light;
      padding: 0 20px;
    }
  }
}
</style>
