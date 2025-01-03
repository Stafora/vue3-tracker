<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    iconId: string,
    width: string | number,
    height: string | number,
    customClass?: string
}>()

const normalizedWidth = computed(() => props.width.toString());
const normalizedHeight = computed(() => props.height.toString());
</script>

<template>
    <svg class="icon" :class="customClass" :width="normalizedWidth" :height="normalizedHeight" aria-hidden="true">
        <use :xlink:href="`/icons.svg#${iconId}`"></use>
    </svg>
</template>

<style scoped>
.icon {
  fill: currentColor; /* Поддержка цвета через CSS */
}
</style>