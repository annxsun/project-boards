<template>
    <div>
        <TaskHeader></TaskHeader>
        <TaskItem></TaskItem>
    </div>
</template>

<script>
import TaskHeader from './TaskHeader';
import TaskItem from './TaskItem';

export default {
    name: ' TaskList',
    components: {
        TaskHeader,
        TaskItem
    }
}
</script>

<style lang="scss">
</style>
