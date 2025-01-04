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
        <VueDatePicker :placeholder="props.placeholder" v-model="model"></VueDatePicker>
        <div class="w-full text-red-600">
            {{ props.error }}
        </div>
    </label>
</template>