<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
    value: string | number,
    label: string,
    modelValue: (string | number)[]
}>()

const model = defineModel<(string | number)[]>({ required: true })
const isChecked = ref(false);

const updateChecked = (arr: (string | number)[]) => {
    if (Array.isArray(arr)) {
        isChecked.value = arr.includes(props.value);
    }
}

onMounted(() => {
    updateChecked(props.modelValue);
})

watch(() => props.modelValue, (newVal) => {
    updateChecked(newVal);
});
</script>

<template>
    <label class="flex items-center cursor-pointer mb-2 select-none">
        <input
            type="checkbox"
            :value="props.value"
            v-model="model"
            class="hidden"
        />
        <div class="w-6 h-6 mr-2 flex flex-shrink-0 items-center justify-center inline-block border-2 border-gray-300 bg-white" :class="{'border-slate-900': isChecked}">
            <div class="w-3 h-3 bg-slate-900 transition-all" v-if="isChecked"></div>
        </div>
        {{ props.label }}
    </label>
</template>
