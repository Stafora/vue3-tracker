<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { popModal } from 'jenesius-vue-modal'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import SvgIcon from '@/components/SvgIcon.vue'
import InputCustom from '@/components/form-ui/Input.vue'
import SelectCustom from '@/components/form-ui/Select.vue'
import DatePicker from '@/components/form-ui/DatePicker.vue';
import ButtonCustom from '@/components/buttons/Button.vue'
import { ModalTaskType, ModalTaskEnum } from '@/types/task-types';
import { taskModel, TaskStatusEnum } from '@/models/task-model'
import { eventBus } from '@/utils/event-bus'

const props = defineProps<{
    type: ModalTaskType,
    id?: IDBValidKey
}>()

const schema = toTypedSchema(
    yup.object({
        title: yup.string().min(6).required(),
        description: yup.string().min(10).required(),
        status: yup.string().required(),
        dateExpired: yup.string().required()
    })
)
const { errors, defineField, validate } = useForm({
    validationSchema: schema,
    initialValues: {
        status: TaskStatusEnum.NEW
    }
});
const [formTitle] = defineField('title');
const [formDescription] = defineField('description');
const [formStatus] = defineField('status');
const [formDateExpired] = defineField('dateExpired');

const getButtonName = computed(() => {
    switch(props.type) {
        case ModalTaskEnum.NEW:
            return 'Create'
        case ModalTaskEnum.EDIT:
            return 'Update'    
    }
})
const getTitle = computed(() => {
    switch(props.type) {
        case ModalTaskEnum.NEW:
            return 'Create Task'
        case ModalTaskEnum.EDIT:
            return 'Update Task'    
    }
})

const getTaskById = async (id: IDBValidKey): Promise<void> => {
    if(id){
        const data = await taskModel.getById(id)
        formTitle.value = data.title
        formDescription.value = data.description
        formStatus.value = data.status
        formDateExpired.value = data.expirationDate
    }
}

const handleCloseModal = () => {
    popModal()
}
const sendForm = async () => {
    const validation = await validate()

    if(validation.valid){
        switch(props.type) {
            case ModalTaskEnum.NEW:
                createHandle()
                break
            case ModalTaskEnum.EDIT:
                updateHandle()
                break
        }
    }
}
const createHandle = async () => {
    await taskModel.add({
        title: formTitle.value,
        description: formDescription.value,
        status: formStatus.value,
        expirationDate: formDateExpired.value,
        dateCreated: new Date()
    })
    closeModal()
}
const updateHandle = async () => {
    await taskModel.update({
        id: props.id,
        title: formTitle.value,
        description: formDescription.value,
        status: formStatus.value,
        expirationDate: formDateExpired.value
    })
    closeModal()
}

const closeModal = () => {
    popModal()
    eventBus.emit('event-fetch-task')
}

onMounted(() => {
    getTaskById(props.id)
})
</script>

<template>
    <div class="w-2/4 bg-slate-800 text-white relative p-6 grid grid-flow-row auto-rows-max">
        <div class="absolute right-4 top-4 cursor-pointer" @click="handleCloseModal">
            <SvgIcon iconId="icon-close" width="20" height="20" />
        </div>

        <h2 class="font-medium text-lg text-center">
            {{ getTitle }} {{ id }}
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