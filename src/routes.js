/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home/index.vue';
import Admin from './components/Home/admin.vue';
import Pannel from './components/Pannel/main.vue';

import EloBoost from './components/Elo/eloboost.vue';
import EloMd from './components/Elo/md10.vue';
import EloCoach from './components/Elo/elocoach.vue';
import Pagamento from './components/Elo/payment.vue';
import SucessoPay from './components/Elo/success.vue';
import SucessoMercado from './components/Elo/successMercado.vue';
import Elos from './components/Elo/elos.vue';

import Dashboard from './components/Dashboard/index.vue';
import FeedDashboard from './components/Dashboard/feed.vue';

Vue.use(VueRouter)

const authentication={
    beforeEnter: async (to, from, next) => {
        const auth= localStorage.getItem('id') || ''
        var id='asd'
        await Vue.http.get(`api/user/${auth}`)
        .then(response=>{
            if(response.body.user){
                id = response.body.user[0]._id
                return;
            }
        })
        if(auth!=null && id===auth){
            if(to.path==='/'){
                next()
            }
            else{
                next()
            }    
        }else{
            if(to.path==='/'){
                next()
            }
            else{
                next('/')
            }    
        }
    }

}    

const adminArea={
    beforeEnter: async (to, from, next) => {
        const auth= localStorage.getItem('id') || ''
        const status= localStorage.getItem('mdfkwe_r')
        let admin=''
        if(auth){
            await Vue.http.get(`api/user/${auth}`)
            .then(response=>{
                if(response.body.user){
                    admin = response.body.user[0].status
                    return;
                }
            })
        }
        if(status==='ADMIN' && status===admin ){
            if(to.path==='/admin'){
                next('/pannel')
            }
            else if(to.path==='/pannel'){
                next()
            }
            else{
                next('/')
            }    
        }else{
            if(to.path==='/admin'){
                next()
            }
            else{
                next('/') 
            }
        }
    }
}

const routes=[
    {path:'/',component:Home},
    {path:'/servicos',component:Elos},
    {path:'/eloboost',component:EloBoost},
    {path:'/elocoach',component:EloCoach},
    {path:'/md10',component:EloMd},
    {path:'/pagamento',component:Pagamento,...authentication},
    {path:'/sucesso-paypal/',component:SucessoPay,...authentication},
    {path:'/sucesso-mercadopago/',component:SucessoMercado,...authentication},
    {path:'/admin',component:Admin,...adminArea},
    {path:'/pannel',component:Pannel,...adminArea},
    {path:'/dashboard',component:FeedDashboard,...authentication},                              
    {path:'*', component:Home}
]

export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from,to,savedPosition){
        return{ x:0, y:0}
    }
})