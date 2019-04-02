import userService from '../../service/api/user.service'

const state = {
    token: sessionStorage.getItem('token') || '',
    user:  {},
}

const getters = {}

const mutations = {
    setToken(state, payload) {
        state.token = payload;
    },
    setUser(state, payload) {
        state.user = payload;
    }
}

const actions = {
   login({commit}, user) {
       return new Promise((resolve, reject) => {
            userService.login(user).then(res=> {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                commit('setToken', res.data.token);
                commit('setUser', res.data.user);
                resolve(res);
            }).catch(err =>{
                reject(err);
            });
       });  
   },
   register({commit}, user) {
    return new Promise((resolve, reject) => {
        userService.register(user).then(res=> {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            commit('setToken', res.data.token);
            commit('setUser', res.data.user);
            resolve(res);
        }).catch(err =>{
            reject(err);
        });
    });
   }
   
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}