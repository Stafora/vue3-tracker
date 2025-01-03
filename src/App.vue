<script setup lang="ts">
import Filter from '@/components/filter/Filter.vue'
import TaskList from '@/components/task/TaskList.vue'
import { container as WidgetContainerModal } from "jenesius-vue-modal";
</script>

<template>
    <Filter />
    <TaskList />

    <WidgetContainerModal />
</template>