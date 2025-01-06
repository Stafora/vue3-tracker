import { TaskStatusType } from '@/models/task-model'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        statuses: [] as TaskStatusType[]
    }),
    actions: {
        setStatuses(statuses: TaskStatusType[]) {
            this.statuses = statuses
        }
    },
    getters: {
        currentStatus: (state) => {
            return state.statuses
        }
    }
})