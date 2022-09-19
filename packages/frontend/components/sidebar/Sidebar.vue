<script setup lang="ts">
const sidebarConfig = {
  title: 'Your Documents',
  route: '/',
  items: [
    {
      title: 'New',
      iconName: 'estate',
      route: '/'
    }
  ]
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <SidebarBtnClose class="sidebar-btn-control" />
      <SidebarSection
        :title="sidebarConfig.title"
        :route="sidebarConfig.route"
        :items="sidebarConfig.items"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: $background-primary;
  height: 100%;
  width: 300px;

  .sidebar-btn-control {
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 200ms 500ms, transform 300ms 500ms;
  }

  &:hover {
    .sidebar-btn-control {
      transform: scale(1);
      opacity: 1;
      transition: opacity 200ms, transform 300ms;
    }
  }

  .sidebar-inner {
    background-color: $background-elevated;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin: 20px;
    border-radius: 15px;
    position: relative;
    box-shadow: $sidebar-shadow;
    padding: 15px 0 0 0;
  }
}
</style>
