export default {
    state: () => ({
        name: 'SaraiNoQ',
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    }),
    mutations: {
        setName(state, payload) {
            state.name = payload
        },
        setToken(state, data) {
            state.token = data
            localStorage.setItem('token', data)
        }
    },
    actions:{
        saveName({ commit }, data) {
            commit('setName', data)
        }
    }
}