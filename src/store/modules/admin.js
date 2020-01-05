/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const admin={
    state:{
        formData:{
            id:'',
            name:'',
            email:'',
            status:''
        },
        users:{},
        oneUser:{},
        players:{},
        players_copy:{},
        user_copy:{},
        onePlayer:{},
        isSearch:false,
        findUser:null,
        prices:{},
        tokenHash:null,
        counter:{
            userPlayer:'',
            userClient:'',
            order:'',
            dropouts:'',
            cupom:''
        },
        ranking:{}
    },
    getters:{
        getAdmin(state){
            return state.formData
        },
        getAllUsers(state){
            if(state.isSearch){
                return state.user_copy
            }else{
                return state.users
            }
        },
        getOneUser(state){
            return state.oneUser
        },
        getAllPlayers(state){
            if(state.isSearch){
                return state.players_copy
            }else{
                return state.players
            }
        },
        getOnePlayer(state){
            return state.onePlayer
        },
        getUserfinded(state){
            return state.findUser
        },
        getPrices(state){
            return state.prices
        },
        getToken(state){
            return state.tokenHash
        },
        getRelatory(state){
            return state.counter
        },
        getRanking(state){
            return state.ranking
        }   
    },
    mutations:{
        authenticationMutationAdmin(state,data){
            state.formData.id=data.user._id
            state.formData.name=data.user.name
            state.formData.email=data.user.email
            state.formData.status=data.user.status
            state.tokenHash=data.token
            localStorage.setItem('mdfkwe_r',data.user.status)
            router.push('/pannel')
        },
        allUsersMutation(state,data){
            state.users=data
        },
        allPlayersMutation(state,data){
            state.players=data
        },
        newPlayerMutation(state,data){
            state.players.push(data)
        },
        oneUserMutation(state,data){
            state.oneUser=state.users.filter(e=>{return e._id==data})
        },
        // onePlayerMutation(state,data){
        //     state.onePlayer=state.players.filter(e=>{return e._id==data})
        // },
        onePlayerMutation(state,data){
            state.onePlayer=state.players.filter(e=>{return e._id==data})
        },
        searchUsersMutation(state,data){
            if(data.page=='player'){
                if(data!=''){
                    state.isSearch=true
                    state.players_copy=state.players.filter(e=>{return e.name==data.name})
                }else{
                    state.isSearch=false
                }
            }
            if(data.page=='user'){
                if(data!=''){
                    state.isSearch=true
                    state.user_copy=state.users.filter(e=>{return e.name==data.name})
                }else{
                    state.isSearch=false
                }
            }
        },
        changeSeachMutation(state){
            state.isSearch=false
        },
        findUserByIdMutation(state,data){
            state.findUser=state.users.filter(e=>{return e._id==data})
        },
        priceMutation(state,data){
            state.prices=data.filter(e=>{return e.value!='0.00'})
        },
        refreshUserAdmin(state,data){
            state.formData.id=data._id
            state.formData.name=data.name
            state.formData.email=data.email
            state.formData.status=data.status
            state.tokenHash=data._id
        },
        relatoryMutation(state,data){
            state.counter.userClient=data.userClient
            state.counter.userPlayer=data.userPlayer
            state.counter.order=data.order
            state.counter.cupom=data.cupom
            state.counter.dropouts=data.droputs
        },
        rankingMutation(state,data){
            state.ranking=data.sort((a,b)=>{
                if(a.pedidos== b.pedidos){ return 0}
                if(a.pedidos< b.pedidos){ return -1}
                if(a.pedidos> b.pedidos){ return 1}
            })
        },
        removePlayerMutation(state,data){
            state.isSearch=false
            state.players=state.players.filter(e=>{return e._id!=data})
        }
    },
    actions:{
        loginPannel({commit},payload){
            Vue.http.post('api/user/login/admin',{...payload})
            .then(response=>{
                if(response.body.user){
                    localStorage.setItem("token",response.body.token)
                    localStorage.setItem("id",response.body.user._id)
                    commit('authenticationMutationAdmin',response.body)
                }else{
                    Vue.noty.warning(response.body.message)
                }
            }).catch()
        },
        addPlayer({commit},payload){
            const token=localStorage.getItem('token')
            const id=localStorage.getItem('id')
            Vue.http.post('api/user/create',{...payload},{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success('Jogador cadastrado na base')
                commit('newPlayerMutation',response.body.user)
            }).catch()
        },
        removePlayer({commit},payload){
            const id=payload
            const token=localStorage.getItem('token')
            Vue.http.delete(`api/user/${id}`,{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success(response.body)
                commit("removePlayerMutation",id)
            }).catch()
        },
        allUsers({commit}){
            const token=localStorage.getItem('token')
            const id=localStorage.getItem('id')
            Vue.http.get('api/user/',{headers:{Authorization: token}})
            .then(response=>{
                const users= response.body.filter(e=>{return e.status=='CLIENTE'})
                commit('allUsersMutation',users)
            }).catch()
        },
        allPlayers({commit}){
            const token=localStorage.getItem('token')
            const id=localStorage.getItem('id')
            Vue.http.get('api/user/',{headers:{Authorization: token}})
            .then(response=>{
                const players= response.body.filter(e=>{return e.status=='JOGADOR'})
                commit('allPlayersMutation',players)
            }).catch()
        },
        request({commit}){
            Vue.http.post('api')
            .then(response=>{

            }).catch()
        },
        updatePrice({commit},payload){
            const id=localStorage.getItem('id')
            const token=localStorage.getItem('token')
            Vue.http.put(`api/elos/`,{...payload},{headers:{Authorization: token}})
            .then(response=>{
            }).catch()
        },
        allPrice({commit},payload){
            const id=localStorage.getItem('id')
            const token=localStorage.getItem('token')
            Vue.http.get('api/elos/',{headers:{Authorization: token}})
            .then(response=>{
                commit('priceMutation',response.body)
            }).catch()
        },
        recuperaDadosAdmin({commit},payload){
            const token=localStorage.getItem('token')
            if(token){
                Vue.http.get(`api/user/${payload}`,{headers:{Authorization: token}})
                .then(response=>{
                    commit("refreshUserAdmin",response.body.user[0])
                }).catch()
            }
        },
        allRealotry({commit}){
            const id=localStorage.getItem('id')
            const token=localStorage.getItem('token')
            Vue.http.get('api/admin/getAll/count',{headers:{Authorization: token}})
            .then(response=>{
                commit('relatoryMutation',response.body)
            }).catch()
        },
        showRanking({commit}){
            const id=localStorage.getItem('id')
            const token=localStorage.getItem('token')
            Vue.http.get('api/admin/ranking',{headers:{Authorization: token}})
            .then(response=>{
                commit('rankingMutation',response.body.userPlayerRaking)
            }).catch()
        }
    }
}

export default admin;