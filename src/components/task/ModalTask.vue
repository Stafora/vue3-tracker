<script setup lang="ts">
import { useModalTask } from '@/composables/useModalTask'
import SvgIcon from '@/components/SvgIcon.vue'
import InputCustom from '@/components/form-ui/Input.vue'
import SelectCustom from '@/components/form-ui/Select.vue'
import DatePicker from '@/components/form-ui/DatePicker.vue'
import ButtonCustom from '@/components/buttons/Button.vue'
import { ModalTaskType } from '@/types/task-types';

const props = defineProps<{
    type: ModalTaskType;
    id?: IDBValidKey;
}>();

const {
    errors,
    formTitle,
    formDescription,
    formStatus,
    formDateExpired,
    getButtonName,
    getTitle,
    sendForm,
    closeModal,
} = useModalTask(props);
</script>

<template>
    <div class="w-2/4 bg-slate-800 text-white relative p-6 grid grid-flow-row auto-rows-max">
        <div class="absolute right-4 top-4 cursor-pointer" @click="closeModal">
            <SvgIcon iconId="icon-close" width="20" height="20" />
        </div>

        <h2 class="font-medium text-lg text-center">
            {{ getTitle }}
        </h2>

        <div class="mt-6 mb-6">
            <InputCustom label="Title" v-model="formTitle" :error="errors.title" />
            <InputCustom label="Description" v-model="formDescription" :error="errors.description" />
            <SelectCustom label="Status" v-model="formStatus" :error="errors.status" />
            <DatePicker label="Date Expired" v-model="formDateExpired" :error="errors.dateExpired" />
        </div>

        <div>
            <ButtonCustom @click="sendForm">
                {{ getButtonName }}
            </ButtonCustom>
        </div>
    </div>
</template>