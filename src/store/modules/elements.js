/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const element={
    state:{
        
    },
    getters:{
        
    },
    mutations:{
        
    },
    actions:{
        //user
        myProducts(){
            //bring all products by user
            Vue.http.get().then().catch(err=>console.log(err))
        },
        ranking(){
            //get status of all products bought by user
            Vue.http.get().then().catch(err=>console.log(err))
        },
        //player
        alljobs({commit}){
            //show all jobs to players accept
            Vue.http.get().then().catch(err=>console.log(err))
        },
        myGames({commit}){
            // show the jobs selected by player 
            Vue.http.get().then().catch(err=>console.log(err))
        },
        updateMatch({commit},payload){
            // player must update the job status
            Vue.http.post().then().catch(err=>console.log(err))
        },
        takeJob({commit},payload){
            // player accept a job
            Vue.http.post().then().catch(err=>console.log(err))
        },
    }
}

export default element;