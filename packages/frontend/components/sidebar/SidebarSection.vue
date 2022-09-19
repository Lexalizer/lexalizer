<script setup lang="ts">
interface SidebarSectionProps {
  title: string;
  route?: string;
  items?: {
    title: string;
    iconName: string;
    route?: string;
  }[];
}

defineProps<SidebarSectionProps>();
</script>

<template>
  <div class="sidebar-section">
    <div class="sidebar-section-title">
      <p class="title">{{ title }}</p>
    </div>
    <div class="sidebar-section-items">
      <SidebarSectionItem
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :iconName="item.iconName"
        :route="item.route"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  .sidebar-section-title {
    display: flex;
    flex-direction: row;
    font-size: 0.7rem;
    color: $text-semi-light;

    .title {
    }
  }
}
</style>
