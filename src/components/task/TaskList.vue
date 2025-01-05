<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { openModal } from 'jenesius-vue-modal'
import TaskCard from './TaskCard.vue'
import ButtonCustom from '@/components/buttons/Button.vue'
import ModalTask from '@/components/task/ModalTask.vue'
import { ModalTaskEnum } from '@/types/task-types'
import { TaskInterface, taskModel } from '@/models/task-model'
import { eventBus } from '@/utils/event-bus'

const tasks = ref<TaskInterface[]>([])
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchTasks = async () => {
    isLoading.value = true
    try{
        const result = await taskModel.getAll()
        tasks.value = result
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
        isLoading.value = false
    }
}

const handleOpenModal = async () => {
    const modal = await openModal(ModalTask, {
        type: ModalTaskEnum.NEW
    })
    modal.onclose = () => {
        fetchTasks()
    }
}

onMounted(() => {
    eventBus.on('event-fetch-task', fetchTasks)
    fetchTasks()
});

onUnmounted(() => {
    eventBus.off('event-fetch-task', fetchTasks)
});
</script>

<template>
    <div class="w-3/4 h-full p-4 bg-slate-700">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-white text-2xl font-medium">
                Tasks
            </h3>

            <ButtonCustom type="primary" @click="handleOpenModal">
                Add
            </ButtonCustom>
        </div>

        <div v-if="tasks.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TaskCard 
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </div>
        <div v-else class="text-white">
            Tasks empty, add new
        </div>
    </div>
</template>