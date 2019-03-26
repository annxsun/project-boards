<template>
    <div class="task-header">
        <div class="task-title">
            <el-badge class="item count" :value="count" v-if="count !== 0" type="info"></el-badge>
            <span>{{title}}</span>
        </div>
        <div class="task-operations">
            <i @click="addTaskItem" class="event-element el-icon-plus"></i>
            <el-dropdown>
                <i class="event-element el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="editTaskListName"><i class="el-icon-edit"></i>修改列表名称</el-dropdown-item>
                    <el-dropdown-item @click.native="mvAllTaskItem"><i class="el-icon-document"></i>移动所有列表</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteTaskList"><i class="el-icon-delete"></i>删除列表</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import TaskListAdd from './TaskListAdd'
import TaskItemMoveAll from './TaskItemMoveAll'

export default {
    name: 'TaskHeader',
    components: {
       TaskListAdd,
       TaskItemMoveAll
    },
    props: {
        title: String,
        count: {
            type: Number,
            default: 0
        }
    },
    methods: {
        addTaskItem() {
            this.$emit('addTaskItem');
        },
        mvAllTaskItem() {
            this.$emit('mvAllTaskItem');
        },
        editTaskListName() {
            this.$emit('editTaskListName')
        },
        deleteTaskList() {
            this.$emit('deleteTaskList');
        }
    }
}
</script>

<style lang="scss">
.task-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0px;
    border-bottom: 1px solid #ccc;
    .task-title {
        padding-left: 10px;
        display: inline-flex;
        align-items: center;
        .count {
            margin-right: 10px;
            display: inline-flex;
        }
    }
    .task-operations {
        i {
            margin: 0px 10px;
        }
    }
}
</style>