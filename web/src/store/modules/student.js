export default {
    state: () => ({
        stuToken: localStorage.getItem('token_output') ? localStorage.getItem('token_output') : ''
    }),
    mutations: {
        setStuToken(state, data) {
            state.stuToken = data
            localStorage.setItem('token_output', data)
        },
        removeStuToken(state) {
            state.stuToken = ''
            localStorage.removeItem('token_output')
        }
    }
}