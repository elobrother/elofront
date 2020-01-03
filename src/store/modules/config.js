/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const config={
    state:{
        elo:false,
        header:true,
        footer:true,
        elocoach:{}
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
            state.elocoach=data.filter(e=>{return e.type=='elocoach'})
            console.log(state.elocoach)
        }
    },
    actions:{
        sendMessage(payload){
            Vue.http.post('api/sendMail/',{...payload})
            .then(response=>{
                Vue.noty.success('Mensagem enviada, em breve entraremos em contato com você!')
            }).catch()
        },
        elocoach({commit}){
            Vue.http.get('api/elos/')
            .then(response=>{
                commit('elocoachMutation',response.body)
            }).catch()
        }
    }
}

export default config;