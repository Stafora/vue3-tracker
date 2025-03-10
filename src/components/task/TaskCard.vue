<script setup lang="ts">
import { openModal } from 'jenesius-vue-modal'
import { computed } from 'vue'

import { dateFilter } from '@/utils/filters'
import { ModalTaskEnum, TaskStatusDescriptions } from '@/types/task-types'
import { TaskInterface } from '@/models/task-model'
import SvgIcon from '@/components/SvgIcon.vue'
import ModalTask from '@/components/task/ModalTask.vue'
import ButtonCustom from '@/components/buttons/Button.vue'
import { taskModel, TaskStatusEnum } from '@/models/task-model'
import { eventBus } from '@/utils/event-bus'

const props = defineProps<{
    task: TaskInterface
}>()

const getFormattedCreatedDate = computed(() => dateFilter(props.task.dateCreated))
const getFormattedExpirationDate = computed(() => dateFilter(props.task.expirationDate))
const getStatusName = computed(() => {
    return TaskStatusDescriptions[props.task.status]
})

const handleOpenModal = (id: IDBValidKey): void => {
    openModal(ModalTask, {
        type: ModalTaskEnum.EDIT,
        id: id
    })
}
const handleRemoveTask = async (id: IDBValidKey): Promise<void> => {
    await taskModel.delete(id)
    eventBus.emit('event-fetch-task')
}
const getTaskTextColor = computed(() => 
    props.task.status === TaskStatusEnum.COMPLITED ? 'text-gray-400' : 'text-white'
);
const getTaskBorderColor = computed(() => 
    props.task.status === TaskStatusEnum.COMPLITED ? 'border-gray-400' : 'border-white'
);
</script>

<template>
    <div class="bg-slate-800 p-4 relative flex flex-col justify-between" :class="getTaskTextColor">
        <div class="flex flex-col">
            <div class="absolute right-4 top-4 cursor-pointer" @click="handleOpenModal(task.id)">
                <SvgIcon iconId="icon-edit" width="20" height="20" />
            </div>

            <div class="flex font-thin rounded-full border-2 w-fit pl-3 pr-3 mb-2" :class="getTaskBorderColor">
                {{ getStatusName }}
            </div>

            <h2 class="mb-2 font-medium text-lg">
                {{ task.title }}
            </h2>
            <hr class="mt-2">
            <div class="mt-2 mb-2 text-base">
                {{ task.description }}
            </div>
            <hr class="mb-2">
            <p class="text-sm">
                Date created: {{ getFormattedCreatedDate }}
            </p>
            <p class="text-sm">
                Date expired: {{ getFormattedExpirationDate }}
            </p>
        </div>
        <ButtonCustom class="mt-2" type="danger" @click="handleRemoveTask(task.id)">
            Delete
        </ButtonCustom>
    </div>
</template>