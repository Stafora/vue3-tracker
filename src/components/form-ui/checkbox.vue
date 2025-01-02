<script setup lang="ts">
import { ref, watch } from 'vue';

    const props = defineProps<{
        name?: string,
        value: string | number,
        label: string,
        modelValue: {
            type: [String, Number, Boolean],
            required: true,
        },
    }>()

    const model = defineModel({ required: true })
    const isChecked = ref(false);

    watch(() => props.modelValue, (newVal) => {
        if(Array.isArray(newVal)){
            isChecked.value = newVal.includes(props.value) ? true : false
        }
    });
</script>

<template>
    <label class="flex items-center cursor-pointer mb-2">
      <input
        type="checkbox"
        :value="props.value"
        v-model="model"
        class="hidden"
      />
      <div class="w-6 h-6 mr-2 flex flex-shrink-0 items-center justify-center inline-block border-2 border-gray-300 bg-white" :class="{'border-slate-900': isChecked}">
        <!-- Кастомный чекбокс -->
        <div class="w-3 h-3 bg-slate-900 transition-all" v-if="isChecked"></div>
      </div>
      {{ props.label }}
    </label>
</template>