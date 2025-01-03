<script setup lang="ts">
import { openModal } from 'jenesius-vue-modal'
import { dateFilter } from '@/utils/dateFilter'
import { computed } from 'vue'
import { TaskCardType } from '@/types/TaskTypes'
import SvgIcon from '@/components/SvgIcon.vue'
import ModalEdit from '@/components/task/ModalEdit.vue'

const props = defineProps<{
    task: TaskCardType
}>()

const formattedCreatedDate = computed(() => dateFilter(props.task.dateCreated))
const formattedExpirationDate = computed(() => dateFilter(props.task.expirationDate))

const handleOpenModal = () => {
    openModal(ModalEdit)
}
</script>

<template>
    <div class="bg-slate-800 text-white p-4 relative">
        <div class="absolute right-4 top-4" @click="handleOpenModal">
            <SvgIcon iconId="icon-edit" width="20" height="20" />
        </div>

        <div class="flex font-thin rounded-full border-2 border-white w-fit pl-3 pr-3 mb-2">
            {{ task.status }}
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
            Дата создания: {{ formattedCreatedDate }}
        </p>
        <p class="text-sm">
            Дата окончания: {{ formattedExpirationDate }}
        </p>
    </div>
</template>