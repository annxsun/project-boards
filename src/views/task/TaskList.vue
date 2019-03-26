<template>
    <div class="task">
        <slot></slot>
    </div>
</template>

<script>


export default {
    name: 'TaskList'
}
</script>

<style lang="scss">
.task {
    width: 355px;
    height: 600px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px 1px rgba(204, 204, 204, 0.3);
    margin-right: 20px;
}
</style>
