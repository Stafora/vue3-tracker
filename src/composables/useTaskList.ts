import { ref } from 'vue';
import { TaskInterface, taskModel } from '@/models/task-model';
import { eventBus } from '@/utils/event-bus';
import { useFilterStore } from '@/stores/filter-store'

export function useTaskList() {
    const filterStore = useFilterStore()

    const data = ref<TaskInterface[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchTasks = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const arr = await taskModel.getAll();
            data.value = filteredData(arr)
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
        } finally {
            isLoading.value = false;
        }
    };
    const filteredData = (arr: TaskInterface[]) => {
        if(!filterStore.currentStatus.length) return arr

        return arr.filter((item) => {
            return filterStore.currentStatus.includes(item.status)
        })
    }

    const subscribeToFetchEvents = () => eventBus.on('event-fetch-task', fetchTasks);
    const unsubscribeFromFetchEvents = () => eventBus.off('event-fetch-task', fetchTasks);

    return {
        data,
        isLoading,
        error,
        fetchTasks,
        subscribeToFetchEvents,
        unsubscribeFromFetchEvents,
        filterStore
    };
}