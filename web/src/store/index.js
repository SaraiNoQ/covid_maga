import { createStore } from "vuex";
import user from './modules/user'
import student from './modules/student'

const store = createStore({
    modules: {
        user,
        student
    }
})

export default store