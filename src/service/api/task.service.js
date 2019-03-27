import axios from '../axios'
import url from './url'
import { urlVariableAssignment } from '../../utils/index'

export default {
    taskList() {
        return axios.get(url.task.taskList)
    },
    taskListAdd(obj) {
        return axios.post(url.task.taskListAdd, obj)
    },
    taskListUpdateName(params) {
        return axios.put(urlVariableAssignment(url.task.taskListUpdateName, params));
    },
    taskListDelete(params) {
        return axios.delete(urlVariableAssignment(url.task.taskListDelete, params));
    },
    taskListMvALL(params) {
        return axios.put(urlVariableAssignment(url.task.taskListMvALL, params));
    },
    taskItemAdd(obj) {
        return axios.post(url.task.taskItemAdd, obj);
    },
    taskItemDelete(params) {
        return axios.delete(urlVariableAssignment(url.task.taskItemDelete, params));
    },
    taskItemUpdate(obj) {
        return axios.put(url.task.taskItemUpdate, obj);
    },
    taskItemMv(params) {
        return axios.put(urlVariableAssignment(url.task.taskItemMv, params));
    }
}

