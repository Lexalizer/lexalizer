<script setup lang="ts">
interface SidebarSectionProps {
  title: string;
  iconName: string;
  route?: string;
}

defineProps<SidebarSectionProps>();
</script>

<template>
  <div class="sidebar-section-item">
    <div class="sidebar-section-title">
      <unicon :name="iconName" />
      <p class="title">{{ title }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .sidebar-section-item {
    display: flex;
    flex-direction: column;
  
    .sidebar-section-title {
      display: flex;
      flex-direction: row;
  
      .title {
      }
    }
  }
  </style>
  