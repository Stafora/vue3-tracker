<script setup lang="ts">
import { TaskStatusDescriptions } from '@/types/task-types'
const model = defineModel({ required: true })

const props = withDefaults(
  defineProps<{
    label: string;
    placeholder?: string;
    error?: string;
  }>(), 
  {
    error: ''
  }
);

const statusEntries = Object.entries(TaskStatusDescriptions)
</script>

<template>
    <label class="w-full block mb-2">
        <div class="font-medium w-full mb-1">
            {{ props.label }}
        </div>
        <select v-model="model" :placeholder="props.placeholder" class="w-full text-slate-800 pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none cursor-pointer">
            <option v-for="([status, description]) in statusEntries" :value="status">
                {{ description }}
            </option>
        </select>
        <div class="w-full text-red-600">
            {{ props.error }}
        </div>
    </label>
</template>