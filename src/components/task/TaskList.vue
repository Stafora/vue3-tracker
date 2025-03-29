<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { openModal } from 'jenesius-vue-modal';
import TaskCard from './TaskCard.vue';
import ButtonCustom from '@/components/buttons/Button.vue';
import ModalTask from '@/components/task/ModalTask.vue';
import { ModalTaskEnum } from '@/types/task-types';
import { useTaskList } from '@/composables/useTaskList';
import Loader from '@/components/Loader.vue';
import ErrorDisplay from '@/components/ErrorDisplay.vue';

const { data, isLoading, error, fetchTasks, subscribeToFetchEvents, unsubscribeFromFetchEvents, filterStore } = useTaskList();

const handleOpenModal = async () => {
    const modal = await openModal(ModalTask, { 
        type: ModalTaskEnum.NEW
    });
    modal.onclose = onModalClose
};

const onModalClose = async () => {
    await fetchTasks();
    return true;
};

watch(() => filterStore.currentStatus, () => {
    fetchTasks()
})

onMounted(() => {
    subscribeToFetchEvents();
    fetchTasks();
});

onUnmounted(() => {
    unsubscribeFromFetchEvents();
});

const isTasksEmpty = computed(() => !isLoading.value && data.value.length === 0 && !error.value);
const hasTasks = computed(() => !isLoading.value && data.value.length > 0 && !error.value);
</script>

<template>
    <div class="w-3/4 h-full p-4 bg-slate-700 flex flex-col">
        <div class="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 class="text-white text-2xl font-medium">
                Tasks
            </h3>
            <ButtonCustom type="primary" @click="handleOpenModal">Add</ButtonCustom>
        </div>

        <div class="flex-1 overflow-y-auto">
            <Loader v-if="isLoading" />
            <ErrorDisplay v-else-if="error" :error="error" />
            <div v-else-if="isTasksEmpty" class="text-white">
                Tasks empty, add new
            </div>
            <div v-else-if="hasTasks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TaskCard 
                    v-for="task in data" 
                    :key="task.id" 
                    :task="task" 
                />
            </div>
        </div>
    </div>
</template>