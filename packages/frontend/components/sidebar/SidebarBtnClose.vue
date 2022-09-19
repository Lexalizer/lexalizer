<template>
  <div class="sidebar-btn-close">
    <unicon name="angle-left" />
  </div>
</template>

<style lang="scss">
.sidebar-btn-close {
  position: absolute;
  right: -16px;
  top: 40px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: $background-elevated;
  border-radius: 25px;
  box-shadow: $floating-btn-shadow;
  transition: box-shadow 200ms, background-color 100ms;

  &:hover {
    box-shadow: $floating-btn-shadow-elevated;
  }

  &:active {
    background-color: $background-click;
  }
}
</style>
