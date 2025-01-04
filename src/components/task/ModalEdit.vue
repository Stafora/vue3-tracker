<script setup lang="ts">
import { popModal } from 'jenesius-vue-modal'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import SvgIcon from '@/components/SvgIcon.vue'
import InputCustom from '@/components/form-ui/Input.vue'
import SelectCustom from '@/components/form-ui/Select.vue'
import DatePicker from '@/components/form-ui/DatePicker.vue';
import ButtonCustom from '@/components/buttons/button.vue'

const handleCloseModal = () => {
    popModal()
}

const schema = toTypedSchema(
    yup.object({
        title: yup.string().min(6).required(),
        description: yup.string().min(10).required(),
        status: yup.string().required(),
        dateExpired: yup.string().required()
    })
)
const { errors, defineField, validate } = useForm({
    validationSchema: schema
});

const [formTitle] = defineField('title');
const [formDescription] = defineField('description');
const [formStatus] = defineField('status');
const [formDateExpired] = defineField('dateExpired');

const sendForm = async () => {
    const isValid = await validate();
    console.log(isValid)
}
</script>

<template>
    <div class="w-2/4 bg-slate-800 text-white relative p-6 grid grid-flow-row auto-rows-max">
        <div class="absolute right-4 top-4 cursor-pointer" @click="handleCloseModal">
            <SvgIcon iconId="icon-close" width="20" height="20" />
        </div>

        <h2 class="font-medium text-lg text-center">
            Edit Task
        </h2>
        
        <div class="mt-6 mb-6">
            <InputCustom label="Title" v-model="formTitle" :error="errors.title" />

            <InputCustom label="Description" v-model="formDescription" :error="errors.description" />

            <SelectCustom label="Status" v-model="formStatus" :error="errors.status" />

            <DatePicker label="Date Expired" v-model="formDateExpired" :error="errors.dateExpired" />
        </div>

        <div>
            <ButtonCustom @click="sendForm">
                Create
            </ButtonCustom>
        </div>
    </div>
</template>