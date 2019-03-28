const host = {
    dev: 'http://localhost:4000'
}

export default {
    "task": {
        /** GET */
        "taskList": `${host.dev}/task/tasklist`,
        /** POST PARAMS */
        "taskListAdd": `${host.dev}/task/tasklist/add`,
        /** PUT */
        "taskListUpdateName": `${host.dev}/task/tasklist/id/{id}/name/{name}`,
        /** DELETE */
        "taskListDelete": `${host.dev}/task/tasklist/id/{id}`,
        /** PUT PARAMS */
        "taskListMvALL": `${host.dev}/task/tasklist/fromId/{fromId}/toId/{toId}`,
        /** POST PARAMS */
        "taskItemAdd": `${host.dev}/task/taskItem/add`,
        /** DELETE PARAMS */
        "taskItemDelete": `${host.dev}/task/taskItem/{taskListId}/taskId/{taskId}`,
        /** PUT PARAMS */
        "taskItemUpdate": `${host.dev}/task/taskItem/update`,
        /** PUT */
        "taskItemMv": `${host.dev}/task/taskItem/fromId/{fromId}/toId/{toId}/task/{id}`,
    },
    "user": {
       /** POST */
       "login": `${host.dev}/login`,
    }
}