<template>
    <div class="task-home">
    task
        <div class="task-list-container">
            <TaskList v-for="task in taskList" :key="task.id">
            </TaskList>
        </div>
        <div class="add-task">
        </div>
    </div>
</template>

<script>
import TaskList from './TaskList'

export default {
    name: 'TaskHome',
    data() {
        return {
            taskList:[]
        }
    }
}
</script>

<style lang="scss">

</style>