import { TaskStatusDescriptions } from '@/types/task-types'
import { computed } from 'vue';
import { useFilterStore } from '@/stores/filter-store'
import { TaskStatusType } from '@/models/task-model';
import { LocalStorageService } from '@/services/local-storage-service'

export function useFilter() {
    const filterStore = useFilterStore()
    const STORAGE_STATUS = 'status'

    const storageStatuses = LocalStorageService.getItem<TaskStatusType[]>(STORAGE_STATUS)

    if(storageStatuses){
        filterStore.setStatuses(storageStatuses)
    }

    const taskStatuses = Object.entries(TaskStatusDescriptions);

    const choosedStatuses = computed({
        get: () => filterStore.currentStatus,
        set: (value: TaskStatusType[]) => {
            filterStore.setStatuses(value)
            LocalStorageService.setItem<TaskStatusType[]>(STORAGE_STATUS, value)
        },
    });

    return {
        taskStatuses,
        choosedStatuses
    }
}