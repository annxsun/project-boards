var Mock = require('mockjs');

const Random = Mock.Random;

var taskList = [{
    "id": "Sk2HaTagb",
    "name": "待办",
    "count": 2,
    "tasks": [{
        "id": "SD9CJISb",
        "taskIndex": "#20",
        "title": "流水线添加质量报告",
        "dateStart": Random.date('yyyy-MM-dd'),
        "dateEnd": Random.date('yyyy-MM-dd'),
        "type": "enhancement",
        "creater": "wmin5",
        "assign": [{
            "id": "#JKSDK0A",
            "name": "xsun28",
            "avatar": ""
        }]
    },{
        "id": "OPDFG78M",
        "taskIndex": "#22",
        "title": "组件共有化权限开发bug修复",
        "dateStart": Random.date('yyyy-MM-dd'),
        "dateEnd": Random.date('yyyy-MM-dd'),
        "type": "bug",
        "creater": "wmin5",
        "assign": [{
            "id": "#JKsqa0A",
            "name": "xwei24",
            "avatar": ""
        }]
    }]
},
{
    "id": "HK2GaTagb",
    "name": "进行中",
    "count": 1,
    "tasks": [{
        "id": "GSN6kmGS",
        "taskIndex": "#25",
        "title": "dashboard 添加燃尽图",
        "dateStart": Random.date('yyyy-MM-dd'),
        "dateEnd": Random.date('yyyy-MM-dd'),
        "type": "good first issue",
        "creater": "wmin5",
        "assign": [{
            "id": "#JLJJGa0A",
            "name": "xsun28",
            "avatar": ""
        }]
    }]
}];

module.exports = {
    taskList: function(request, reponse) {
        reponse.send(taskList);
    },
    taskListAdd: function(request, reponse) {
        let name = request.body.name;
        taskList.push({
            "id": Mock.Random.guid(),
            "name": name,
            "count": 0,
            "tasks": []
        });
        reponse.sendStatus(200);
    },
    taskListUpdateName: function(request, reponse) {
        let id = request.params.id;
        let name = request.params.name;
        let taskListIndex = taskList.findIndex(res =>{
            return res.id === id;
        });
        taskList[taskListIndex].name = name;
        reponse.sendStatus(200);
    },
    taskListDelete: function(request, reponse) {
        let id = request.params.id;
        let taskListIndex = taskList.findIndex(res =>{
            return res.id === id;
        });
        taskList.splice(taskListIndex, 1);
        reponse.sendStatus(200);
    },
    taskListMvALL: function(request, reponse) {
        let toId = request.params.toId;
        let fromId = request.params.fromId;
        let toIndex = taskList.findIndex(res =>{
            return res.id === toId;
        });
        let fromIndex = taskList.findIndex(res => {
            return res.id === fromId;
        });
        let toTask = taskList[toIndex].tasks;
        let fromTask = taskList[fromIndex].tasks;
        taskList[toIndex].count = toTask.count + fromTask.length;
        taskList[toIndex].tasks = toTask.concat(fromTask);
        taskList[fromIndex].count = 0;
        taskList[fromIndex].tasks = [];
        reponse.sendStatus(200);
    },
    taskItemAdd: function(request, reponse) {
        let taskListId = request.body.taskListId; 
        let task = { ...request.body.task,
            id: Mock.Random.guid(), 
            'taskIndex': Math.floor(Math.random() * 100), 
            "creater": "wmin5"
        }
        let index = taskList.findIndex(res =>{
            return res.id === taskListId;
        });
        taskList[index].count = taskList[index].count + 1;
        taskList[index].tasks.push(task);
        reponse.sendStatus(200);
    },
    taskItemDelete: function(request, reponse) {
        let taskListId = request.params.taskListId;
        let taskId = request.params.taskId;
        let taskListIndex = taskList.findIndex(res =>{
            return res.id === taskListId;
        });
        let taskIndex = taskList[taskListIndex].tasks.findIndex(res =>{
            return res.id === taskId;
        });
        taskList[taskListIndex].tasks.splice(taskIndex, 1);
        reponse.sendStatus(200);
    },
    taskItemUpdate: function(request, reponse) {
        let taskListId = request.body.taskListId; 
        let task = request.body.task;
        let taskListIndex = taskList.findIndex(res =>{
            return res.id === taskListId;
        });
        let taskIndex = taskList[taskListIndex].tasks.findIndex(res => {
            return res.id === task.id;
        });
        console.log('tas', task)
        taskList[taskListIndex].tasks[taskIndex] = task;
        reponse.sendStatus(200);
    },
    taskItemMv: function(request, reponse) {
        let toId = request.params.toId;
        let fromId = request.params.fromId;
        let id = request.params.id;
        let toIndex = taskList.findIndex(res =>{
            return res.id === toId;
        });
        let fromIndex = taskList.findIndex(res =>{
            return res.id === fromId;
        });
        if(id === 'undefined') {
            let temp = {...taskList[fromIndex]};
            taskList[fromIndex] = taskList[toIndex];
            taskList[toIndex] = temp;
            reponse.sendStatus(200);
        }
        else{
            let taskIndex = taskList[fromIndex].tasks.findIndex(res =>{
                return res.id === id;
            });
            taskList[toIndex].count = taskList[toIndex].count + 1;
            taskList[toIndex].tasks.push(taskList[fromIndex].tasks[taskIndex]);
            taskList[fromIndex].tasks.splice(taskIndex, 1);
            taskList[fromIndex].count =taskList[fromIndex].count - 1;
            reponse.sendStatus(200);
        }
        
    }
}
    