<script setup lang="ts">
import CheckboxCustom from '@/components/form-ui/Checkbox.vue'
import { useFilter } from '@/composables/useFilter'

const { taskStatuses, choosedStatuses } = useFilter()
</script>

<template>
    <div class="w-1/4 h-full p-4 bg-slate-800 flex flex-col">
        <div class="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 class="text-white text-2xl font-medium">
                Filter
            </h3>
        </div>

        <div class="flex-1 overflow-y-auto">
            <div v-for="[status, description] in taskStatuses">
                <CheckboxCustom :value="status" :label="description" v-model="choosedStatuses" class="text-white" />
            </div>
        </div>
    </div>
</template>