<template>
    <div v-if="error" class="text-red-500 p-2 bg-red-100 rounded">
        {{ error }}
    </div>
</template>

<script setup lang="ts">
defineProps<{ error: string | null }>();
</script>