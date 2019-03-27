<template>
    <div class="task-home">
        <TaskList 
        v-drap="{className:'drap-element', data: {taskList: list}, drapTag:'task-list'}"
        v-drop="{className:'drop-element', dropTagList:['task-list', 'task-item']}"
        @drop-result="dropResult($event, list)"
        v-for="list in lists"
        :key="list.id"
        :id="list.id">
            <TaskHeader 
            :title="list.name"
            :count="list.count"
            @addTaskItem="handleAddTaskItem(list.id)"
            @mvAllTaskItem="handleMvAll(list.id, list.name)"
            @editTaskListName="handleEditTaskList(list.id, list.name)"
            @deleteTaskList="handleDeleteTaskList(list.id, list.name)"
            ></TaskHeader>
            <TaskItem 
            v-for="task in list.tasks" 
            :key="task.id"
            :task="task"
            :taskListId="list.id"
            @editTaskItem="handleEditTaskItem(list.id, task)"
            @deleteTaskItem="handleDeleteTaskItem(task.id, task.taskIndex, list.id, list.name)">
            </TaskItem>
        </TaskList>
        <div class="add-task event-element" @click="addTaskList">
            <i class="el-icon-plus">添加</i>
        </div>
        <TaskListAdd 
        :dialogVisible="tlsDialogVisible" 
        :title="tlsTitle"
        :taskListId="tlsTaskListId"
        :taskListName="tlsTaskListName"
        @close="closeTaskListAdd"></TaskListAdd>
        <TaskItemAdd 
        :dialogVisible="tisDialogVisible" 
        :title="tisTitle"
        :id="tisId"
        :task="tisTask"
        @close="closeTaskItemAdd"
        ></TaskItemAdd>
        <TaskItemMoveAll 
        :dialogVisible="timaDialogVisible"
        :taskListId="timaTaskListId"
        :taskListNameArray="timaTaskListNameArray"
        @close="closeTaskItemMoveAll"></TaskItemMoveAll>
    </div>
</template>

<script>
import TaskList from './TaskList'
import TaskHeader from './TaskHeader'
import TaskItem from './TaskItem'
import TaskListAdd from './TaskListAdd'
import TaskItemAdd from './TaskItemAdd'
import TaskItemMoveAll from './TaskItemMoveAll'     
import taskService from '../../service/api/task.service'

export default {
    name: 'TaskHome',
    components: {
        TaskList,
        TaskHeader,
        TaskItem,
        TaskListAdd,
        TaskItemAdd,
        TaskItemMoveAll
    },
    data() {
        return {
            tlsDialogVisible: false,
            tlsTitle: '',
            tlsTaskListId: '',
            tlsTaskListName: '',
            tisDialogVisible: false,
            tisTitle: '',
            tisId:'',
            tisTask: {},
            timaDialogVisible: false,
            timaTaskListId: '',
            timaTaskListNameArray: [],
            lists:[]
        }
    },
    mounted() {
        this.initTaskList();
    },
    methods: {
        initTaskList() {
            taskService.taskList().then(res => {
                this.lists = res.data;
                console.log(res);
            }).catch(error=>{
                console.log(error);
            });
        },
        initTimaTaskListNameArray(id) {
            this.timaTaskListNameArray = [];
            this.lists.forEach(res=> {
                if(res.id !== id) {
                     this.timaTaskListNameArray.push({
                         id: res.id,
                         name: res.name,
                     });
                }
            })
        },
        dropResult($event, list) {
            let fromId = '';
            let toId = '';
            let taskId = undefined;
            if($event.dragInfo.drapTag === 'task-list') {
                fromId = $event.dragInfo.data.taskList.id;
                toId = list.id;
            }
            else {
                fromId = $event.dragInfo.data.taskListId;
                taskId =  $event.dragInfo.data.task.id;
                toId = list.id;
            }
            taskService.taskItemMv({"fromId": fromId, "toId": toId, "id": taskId}).then(res=> {
                this.initTaskList();
                this.$forceUpdate();
            });
        },
        addTaskList() {
            this.tlsTitle = '创建任务列表';
            this.tlsTaskListId = '';
            this.tlsTaskListName = '';
            this.tlsDialogVisible = '';
        },
        handleAddTaskItem(id) {
            this.tisTitle = '创建任务';
            this.tisId = id;
            this.tisTask = {};
            this.tisDialogVisible = true;
        },
        handleMvAll(id, name) {
            this.initTimaTaskListNameArray(id);
            this.timaTaskListId = id;
            this.timaDialogVisible = true;
        },
        handleEditTaskList(id, name) {
            this.tlsTitle = '编辑任务列表';
            this.tlsTaskListId = id;
            this.tlsTaskListName = name;
            this.tlsDialogVisible = true;
            console.log('this.tlsTaskListName', this.tlsTaskListName);
        },
        handleDeleteTaskList(id, name) {
            this.$confirm(`此操作将永久删除 '${name}' 任务列表, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
            .then(() => {
                taskService.taskListDelete({id: id}).then(res=> {
                    this.initTaskList();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleEditTaskItem(id, task) {
            this.tisTitle = '编辑任务';
            this.tisId = id;
            this.tisDialogVisible = true;
            this.tisTask = task;
        },
        handleDeleteTaskItem(taskId, taskIndex, listId, listName) {
             this.$confirm(`此操作将永久删除 '${listName}' 任务列表下的 '${taskIndex}' 任务, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
            .then(() => {
                taskService.taskItemDelete({'taskListId': listId, 'taskId': taskId}).then(res=> {
                    this.initTaskList();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        closeTaskListAdd(event) {
            if(event && event.refresh) {
                this.initTaskList();
            }
            this.tlsDialogVisible = false;
            this.tlsTitle = '';
            this.tlsTaskListId = '';
            this.tlsTaskListName = '';
        },
        closeTaskItemAdd(event) {
            if(event && event.refresh) {
                this.initTaskList();
            }
            this.tisDialogVisible = false;
            this.tisTitle = '';
            this.tisId = '';
        },
        closeTaskItemMoveAll(event) {
            if(event && event.refresh) {
                this.initTaskList();
            }
            this.timaDialogVisible = false;
            this.timaTaskListId = '';
            this.timaTaskListName = '';
        }
    }
}
</script>

<style lang="scss">
.task-home {
    display: flex;
    .add-task {
        height: 100px;
        width: 355px;
        border: 1px dashed #857f7f;
        color: #6b6767;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
}
.drap-element {
    border: 1px dashed #ccc;
    opacity: 0.5
}
.drop-element {
    background-color: dimgray;
}
</style>