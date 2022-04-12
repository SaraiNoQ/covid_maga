export default {
    state: () => ({
        name: 'SaraiNoQ',
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        register: {
            user_name: '',
            password: '',
            nick_name: '',
        }
    }),
    mutations: {
        setName(state, payload) {
            state.name = payload
        },
        setToken(state, data) {
            state.token = data
            localStorage.setItem('token', data)
        },
        setRegister(state, data) {
            state.register = data
            sessionStorage.setItem('register', JSON.stringify(data))
        }
    },
    actions:{
        saveName({ commit }, data) {
            commit('setName', data)
        }
    }
}