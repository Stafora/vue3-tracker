<script setup lang="ts">
import DefaultButton from '@/components/buttons/button.vue'
import Checkbox from '@/components/form-ui/checkbox.vue';

import { ref } from 'vue';

const items = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
];

const selectedValues = ref<number[]>([])
</script>

<template>
    <div class="w-3/4 h-full p-2 bg-slate-700">
        <h3 class="text-white text-2xl mb-4 font-medium">
            Tasks
        </h3>

        <DefaultButton type="primary" @click="console.log('aasd')">
            primary
        </DefaultButton>
        <DefaultButton type="secondary" @click="console.log('aasd')">
            secondary
        </DefaultButton>
        <DefaultButton type="danger" @click="console.log('aasd')">
            danger
        </DefaultButton>

        <Checkbox 
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            :label="item.label"
            v-model="selectedValues"
        />

        {{ selectedValues }}
    </div>
</template>