<script setup lang="ts">
import { popModal } from 'jenesius-vue-modal'
import SvgIcon from '@/components/SvgIcon.vue'

const handleCloseModal = () => {
    popModal()
}
</script>

<template>
    <div class="w-2/4 h-3/4 bg-slate-800 text-white relative p-6">
        <div class="absolute right-4 top-4 cursor-pointer" @click="handleCloseModal">
            <SvgIcon iconId="icon-close" width="20" height="20" />
        </div>

        <h2 class="mb-2 font-medium text-lg text-center">
            Edit Task
        </h2>

        <div class="mb-2 font-medium text-base">
            something text...
        </div>
    </div>
</template>