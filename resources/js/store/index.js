import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    },

    state: {
        sidebarMinimize: false,
        sidebarShow: true,
        flash: {
            type: 'success',
            message: ''
        }
    },

    mutations: {
        set(state, item) {
            state[item[0]] = item[1];
        },

        flash(state, data) {
            state.flash = {
                ...state.flash,
                ...data
            }
        }
    }
})
