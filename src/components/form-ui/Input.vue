<script setup lang="ts">
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
</script>

<template>
    <label class="w-full block mb-2">
        <div class="font-medium w-full mb-1">
            {{ props.label }}
        </div>
        <input type="text" :placeholder="props.placeholder" v-model="model" class="w-full text-slate-800 pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none">
        <div class="w-full text-red-600">
            {{ props.error }}
        </div>
    </label>
</template>