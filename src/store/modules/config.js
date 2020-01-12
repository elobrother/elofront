/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const config={
    state:{
        elo:false,
        header:true,
        footer:true,
        elocoach:{},
        loading:true
    },
    getters:{
        getEloStatus(state){
            return state.elo
        },
        getHeaderStatus(state){
            return state.header
        },
        getFooterStatus(state){
            return state.footer
        },
        getEloCoach(state){
            return state.elocoach
        },
        getShowElocoach(state){
            return state.loading
        }
    },
    mutations:{
        changeStatusMutation(state,data){
            state.elo=data.status
            router.push(`/${data.page}`)
        },
        changeStatusHeader(state,data){
            state.header=data;
        },
        changeStatusFooter(state,data){
            state.footer=data;
        },
        goToElosPageMutation(data){
            if(data=='eloboost'){
                router.push('/eloboost')
            }else{
                router.push('/elocoach')
            }
        },
        goToServicesMutation(){
            router.push('/servicos')
        },
        elocoachMutation(state,data){
            state.loading=false
            state.elocoach=data.filter(e=>{return e.type=='elocoach'})
        },
        logadoMutation(state){
            state.elo=true
        },
        deslogadoMutation(state){
            state.elo=false
        }
    },
    actions:{
        sendMessage({commit},payload){
            Vue.http.post('api/sendMail/',{...payload})
            .then(response=>{
                Vue.noty.success('Mensagem enviada, em breve entraremos em contato com você!')
            }).catch()
        },
        async elocoach({commit}){
            await Vue.http.get('api/elos/')
            .then(response=>{
                commit('elocoachMutation',response.body)
            }).catch()
        }
    }
}

export default config;