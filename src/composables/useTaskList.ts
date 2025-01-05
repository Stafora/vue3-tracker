import { ref } from 'vue';
import { TaskInterface, taskModel } from '@/models/task-model';
import { eventBus } from '@/utils/event-bus';

export function useTaskList() {
    const data = ref<TaskInterface[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchTasks = async (): Promise<void> => {
        isLoading.value = true;
        try {
            data.value = await taskModel.getAll();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
        } finally {
            isLoading.value = false;
        }
    };

    const subscribeToFetchEvents = () => eventBus.on('event-fetch-task', fetchTasks);
    const unsubscribeFromFetchEvents = () => eventBus.off('event-fetch-task', fetchTasks);

    return {
        data,
        isLoading,
        error,
        fetchTasks,
        subscribeToFetchEvents,
        unsubscribeFromFetchEvents,
    };
}