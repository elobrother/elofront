/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const user={
    state:{
        formData:{
            id:'',
            name:'',
            email:'',
            phoneNumber:'',
            cpf:'',
            status:'',
            bankAccount:{}
        },
        hash:false,
        logado:false,
        status:false
    },
    getters:{
        getUser(state){
            return state.formData
        },
        getUserStatus(state){
            return state.formData.status
        },
        getUserLogado(state){
            return state.logado
        },
        refreshUserId(state){
            return state.formData.id
        }
    },
    mutations:{
        authenticationMutation(state,data){
            state.formData.id=data.user._id
            state.formData.name=data.user.name
            state.formData.email=data.user.email
            state.formData.phoneNumber=data.user.phoneNumber
            state.hash=data.token
            state.formData.bankAccount=data.user.bankAccount
            state.logado=true
            localStorage.setItem('mdfkwe_r',data.user.status)
            state.formData.status=data.user.status
            router.push('/dashboard')
        },
        confirmRegister(state,data){
            state.formData.id=data.user._id
            state.formData.name=data.user.name
            state.formData.email=data.user.email
            state.logado=true
            localStorage.setItem('mdfkwe_r',data.user.status)
            state.formData.status=data.user.status
            router.push('/dashboard')
        },
        logoutMutation(state){
            localStorage.removeItem('codigo')
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('id')
            localStorage.removeItem('mdfkwe_r')
            state.elo=false
            state.logado=false
            state.formData={id:'',name:'',email:'',phone:'',cpf:'',status:'',bankAccount:{}};
            router.push('/')
        },
        refreshUser(state,data){
            state.formData.id=data[0]._id
            state.formData.name=data[0].name
            state.formData.email=data[0].email
            state.formData.phoneNumber=data[0].phoneNumber
            state.formData.bankAccount=data[0].bankAccount
            state.logado=true
            state.formData.status=data[0].status
        },
        authenticationMutationToBuy(state,data){
            state.formData.id=data._id
            state.formData.name=data.name
            state.formData.email=data.email
            state.formData.phoneNumber=data.phoneNumber
            state.formData.bankAccount=data.bankAccount
            state.logado=true
            localStorage.setItem('mdfkwe_r',data.status)
            state.formData.status=data.status
            router.push('/pagamento')
        },
        updateUserMutation(state,data){
            state.formData.phoneNumber=data.phoneNumber
            state.formData.bankAccount=data.bankAccount
            router.push('/dashboard')
        },
    },
    actions:{
        async login({commit},payload){
            await Vue.http.post('api/user/login',{...payload})
            .then(response=>{
                if(response.body.user){
                    localStorage.setItem("token",response.body.token)
                    localStorage.setItem("email",response.body.user.email)
                    localStorage.setItem("id",response.body.user._id)
                    commit("authenticationMutation",response.body)   
                }else{
                    Vue.noty.warning('Dados inválidos')
                }
            }).catch(err=>Vue.noty.error('Erro de servidor! Tente novamente'))
        },
        async register({commit},payload){
            await Vue.http.post('api/user/create',{...payload})
            .then(response=>{
                if(response.body.user){
                    localStorage.setItem("token",response.body.token)
                    localStorage.setItem("email",response.body.user.email)
                    localStorage.setItem("id",response.body.user._id)
                    commit("confirmRegister",response.body)
                }else{
                    Vue.noty.error('Erro ao cadastrar! Tente novamente')
                }
            }).catch()
        },
        async loginToBuy({commit},payload){
            await Vue.http.post('api/user/login',{...payload})
            .then(response=>{
                if(response.body.user){
                    localStorage.setItem("token",response.body.token)
                    localStorage.setItem("id",response.body.user._id)
                    localStorage.setItem("email",response.body.user.email)
                    commit("authenticationMutationToBuy",response.body.user)
                }else{
                    Vue.noty.warning('Dados inválidos')
                }
            }).catch()
        },
        async registerToBuy({commit},payload){
            await Vue.http.post('api/user/create',{...payload})
            .then(response=>{
                if(response.body.user){
                    localStorage.setItem("token",response.body.token)
                    localStorage.setItem("id",response.body.user._id)
                    localStorage.setItem("email",response.body.user.email)
                    commit("authenticationMutationToBuy",response.body.user)
                }else{
                    Vue.noty.warning('Dados inválidos')
                }

            }).catch()
        },
        async recuperaDados({commit,state},payload){
            const token=localStorage.getItem('token')
            if(token){
                if(state.formData.id==''){
                    await Vue.http.get(`api/user/${payload}`,{headers:{Authorization: token}})
                    .then(response=>{
                        commit("refreshUser",response.body.user)
                    }).catch()
                }
            }
        },
        async account({commit},payload){
            const token=localStorage.getItem('token')
            const id=localStorage.getItem('id')
            let user=null
            if(payload.type=='password'){
                user={password:payload.password}
            }else{
                user=payload
            }
            await Vue.http.put(`api/user/${id}`,{user},{headers:{'Authorization': token}})
            .then(response=>{
                Vue.noty.success(response.body)
                commit('updateUserMutation',payload)
            }).catch()
        },
        async recoverAccount({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post('api/user/user/forgotPassword',{...payload},{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.warning(response.body)
            }).catch()
        }, 
        // {
        //     headers:{
        //         'Content-Type':'application/x-www-form-urlencoded',
        //         'Authorization': token
        //     },
        // }
    }
}

export default user;