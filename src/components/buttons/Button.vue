<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    type?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}>()

const emit = defineEmits<{
    (event: 'click', e: MouseEvent): void
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const classes = computed(() => {
    switch(props.type){
        case 'primary':
            return 'p-1 min-w-[120px] rounded-sm text-white bg-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:border-green-500'
        case 'secondary':
            return 'p-1 min-w-[120px] rounded-sm text-green-400 border-2 border-solid border-green-400 text-center hover:text-green-500 hover:border-green-500'
        case 'danger':
            return 'p-1 min-w-[120px] rounded-sm text-white bg-red-400 border-2 border-red-400 text-center hover:bg-red-500 hover:border-red-500'
        default: 
            return 'p-1 min-w-[120px] rounded-sm text-white bg-green-400 border-2 border-green-400 text-center hover:bg-green-500 hover:border-green-500'
    }
})
</script>

<template>
    <button :class="classes" @click="handleClick">
        <slot />
    </button>
</template>
