export default {
    state: () => ({
        name: 'SaraiNoQ'
    }),
    mutations: {
        setName(state, payload) {
            state.name = payload
        }
    },
    actions:{
        saveName({ commit }, data) {
            commit('setName', data)
        }
    }
}