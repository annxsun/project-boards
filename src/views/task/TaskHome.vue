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
            lists:[
                {
                    "id": "Sk2HaTagb",
                    "name": "待办",
                    "count": 2,
                    "tasks": [{
                        "id": "SD9CJISb",
                        "taskIndex": '#20',
                        "title": "流水线添加质量报告",
                        "dateStart": new Date(),
                        "dateEnd": new Date(),
                        "type": 'enhancement',
                        "creater": 'wmin5',
                        "assign": [{
                            'id': '#JKSDK0A',
                            'name': 'xsun28',
                            'avatar': ''
                        }],
                    },{
                        "id": "OPDFG78M",
                        "taskIndex": '#22',
                        "title": "组件共有化权限开发bug修复",
                        "dateStart": new Date(),
                        "dateEnd": new Date(),
                        "type": 'bug',
                        "creater": 'wmin5',
                        "assign": [{
                            'id': '#JKsqa0A',
                            'name': 'xwei24',
                            'avatar': ''
                        }]
                    }]
                },
                {
                    "id": "HK2GaTagb",
                    "name": "进行中",
                    "count": 1,
                    "tasks": [{
                        "id": "GSN6kmGS",
                        "taskIndex": '#25',
                        "title": "dashboard 添加燃尽图",
                        "dateStart": new Date(),
                        "dateEnd": new Date(),
                        "type": 'good first issue',
                        "creater": 'wmin5',
                        "assign": [{
                            'id': '#JLJJGa0A',
                            'name': 'xsun28',
                            'avatar': ''
                        }]
                    }]
                }
            ]
        }
    },
    methods: {
        dropResult($event, list) {
            if($event.dragInfo.drapTag === 'task-list') {
                let fromId = $event.dragInfo.data.taskList.id;
                let toId = list.id;
                let fromIndex = this.lists.findIndex(res=> { return res.id == fromId });
                let toIndex = this.lists.findIndex(res=> { return res.id == toId });
                let temp = {...this.lists[fromIndex]};
                this.lists[fromIndex] = this.lists[toIndex];
                this.lists[toIndex] = temp;
                this.$forceUpdate();
                return;
            }
            let taskListId = $event.dragInfo.data.taskListId;
            let taskId =  $event.dragInfo.data.task.id;
            let taskListIndex = this.lists.findIndex(res=> { return res.id == taskListId });
            let taskIndex = this.lists[taskListIndex].tasks.findIndex(res=> { return res.id == taskId });
            this.lists[taskListIndex].tasks.splice(taskIndex, 1);
            list.tasks.push($event.dragInfo.data.task);
            this.$forceUpdate();
        },
        addTaskList() {
            this.tlsTitle = '创建任务列表';
            this.tlsTaskListId = '';
            this.tlsTaskListName = '';
            this.tlsDialogVisible = '';
            this.lists.push(
                {
                    "id": "HHsKH90A",
                    "name": "已完成",
                    "tasks": [],
                }
            )
        },
        handleAddTaskItem(id) {
            this.tisTitle = '创建任务';
            this.tisId = '';
            this.tisTask = {};
            this.tisDialogVisible = true;
        },
        handleMvAll(id, name) {
            this.timaTaskListId = id;
            this.timaTaskListNameArray = (name==='进行中'? ['待办']: ['进行中']);
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
                this.$message({
                    type: 'success',
                    message: '删除成功!'
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
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        closeTaskListAdd() {
            this.tlsDialogVisible = false;
            this.tlsTitle = '';
            this.tlsTaskListId = '';
            this.tlsTaskListName = '';
        },
        closeTaskItemAdd() {
            this.tisDialogVisible = false;
            this.tisTitle = '';
            this.tisId = '';
        },
        closeTaskItemMoveAll() {
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