<script setup lang="ts">
import TaskCard from './TaskCard.vue';
const tasks = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description text',
        dateCreated: new Date(),
        expirationDate: new Date(),
        status: 'in-work'
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description text',
        dateCreated: new Date(),
        expirationDate: new Date(),
        status: 'in-work'
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description text',
        dateCreated: new Date(),
        expirationDate: new Date(),
        status: 'in-work'
    },
    {
        id: 4,
        title: 'Task 4',
        description: 'Description text',
        dateCreated: new Date(),
        expirationDate: new Date(),
        status: 'in-work'
    },
    {
        id: 5,
        title: 'Task 5',
        description: 'Description text',
        dateCreated: new Date(),
        expirationDate: new Date(),
        status: 'in-work'
    }
]
</script>

<template>
    <div class="w-3/4 h-full p-4 bg-slate-700">
        <h3 class="text-white text-2xl mb-4 font-medium">
            Tasks
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TaskCard 
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </div>
    </div>
</template>