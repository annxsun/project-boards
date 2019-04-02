import axios from '../axios'
import url from './url'

export default {
    login(obj) {
        return axios.post(url.user.login, obj);
    },
    register(obj) {
        return axios.post(url.user.register, obj);
    },
    userList() {
        return axios.get(url.user.userList);
    }
}

