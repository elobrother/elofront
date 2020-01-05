/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';
import config from './modules/config';
import user from './modules/user';
import payment from './modules/payment';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        user,
        config,
        admin,
        payment
    }
})