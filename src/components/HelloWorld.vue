<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const clicked = 'clicked'
</script>

<template>
    <h1 class="text-3xl font-bold underline">
        {{ msg }}
    </h1>

    <div class="card">
        <button type="button" @click="count++">
            count is {{ count }} {{ clicked }}
        </button>
    </div>
</template>