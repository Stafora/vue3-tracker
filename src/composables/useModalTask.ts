import { computed, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { ModalTaskType, ModalTaskEnum } from '@/types/task-types';
import { taskModel, TaskStatusEnum, TaskStatusType } from '@/models/task-model';
import { popModal } from 'jenesius-vue-modal';
import { eventBus } from '@/utils/event-bus';

export function useModalTask(props: { type: ModalTaskType; id?: IDBValidKey }) {
    const schema = toTypedSchema(
        yup.object({
            title: yup.string().min(6).required(),
            description: yup.string().min(10).required(),
            status: yup.string().required(),
            dateExpired: yup.date().required(),
        })
    );

    const { errors, defineField, validate } = useForm({
        validationSchema: schema,
        initialValues: {
            status: TaskStatusEnum.NEW,
        },
    });

    const [formTitle] = defineField('title');
    const [formDescription] = defineField('description');
    const [formStatus] = defineField<'status', TaskStatusType>('status');
    const [formDateExpired] = defineField<'dateExpired', Date>('dateExpired');

    const getButtonName = computed(() => {
        switch (props.type) {
        case ModalTaskEnum.NEW:
            return 'Create';
        case ModalTaskEnum.EDIT:
            return 'Update';
        }
    });

    const getTitle = computed(() => {
        switch (props.type) {
        case ModalTaskEnum.NEW:
            return 'Create Task';
        case ModalTaskEnum.EDIT:
            return 'Update Task';
        }
    });

    const getTaskById = async (id: IDBValidKey): Promise<void> => {
        if (id) {
            const data = await taskModel.getById(id);
            formTitle.value = data.title;
            formDescription.value = data.description;
            formStatus.value = data.status;
            formDateExpired.value = data.expirationDate;
        }
    };

    const sendForm = async () => {
        const validation = await validate();

        if (validation.valid) {
            switch (props.type) {
                case ModalTaskEnum.NEW:
                    await createHandle();
                    break;
                case ModalTaskEnum.EDIT:
                    await updateHandle();
                    break;
            }
        }
    };

    const createHandle = async () => {
        await taskModel.add({
            title: formTitle.value,
            description: formDescription.value,
            status: formStatus.value,
            expirationDate: formDateExpired.value,
            dateCreated: new Date(),
        });
        closeModal();
    };

    const updateHandle = async () => {
        await taskModel.update({
            id: props.id,
            title: formTitle.value,
            description: formDescription.value,
            status: formStatus.value,
            expirationDate: formDateExpired.value,
        });
        closeModal();
    };

    const closeModal = () => {
        popModal();
        eventBus.emit('event-fetch-task');
    };

    onMounted(() => {
        getTaskById(props.id);
    });

    return {
        errors,
        formTitle,
        formDescription,
        formStatus,
        formDateExpired,
        getButtonName,
        getTitle,
        sendForm,
        closeModal,
    };
}