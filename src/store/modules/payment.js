/* eslint-disable */
import Vue from 'vue';
import router from '../../routes';

const payment={
    state:{
        payment:false,
        formData:{
            tipo:'',
            value:'',
            description:'',
            days:''
        },
        order:{},
        orders:{},
        orders_copy:{},
        orders_copy_price:{},
        order_admin:{},
        orders_admin:{},
        orders_admin_copy:{},
        games:{},
        games_copy:{},
        products:{},
        products_copy:{},
        product:{},
        cupoms:{},
        dropout:{},
        dropout_copy:{},
        isSearch:false,
        eloboost:{
            value:'',
            days:''
        },
        mercadoPagoId:'',
        playerPassword:null,
        show:false,
        disable:false
    },
    getters:{
        getAccess(state){
            return state.payment
        },
        getProduct(state){
            return state.formData
        },
        getOneOrder(state){
            return state.order_admin
        },
        getOneOrderProduct(state){
            return state.order
        },
        getOrders(state){
            if(state.isSearch){
                return state.orders_admin_copy
            }else{
                return state.orders_admin
            }
        },
        getOrdersPrice(state){
            if(state.isSearch){
                return state.orders_copy_price
            }else{
                return state.orders
            }
        },
        getGames(state){
            if(state.isSearch){
                return state.games_copy
            }else{
                return state.games
            }
        },
        getProducts(state){
            if(state.isSearch){
                return state.products_copy
            }else{
                return state.products
            }
        },  
        getOneProduct(state){
            return state.product
        },  
        getCupoms(state){
            return state.cupoms
        },
        getDropout(state){
            if(state.isSearch){
                return state.dropout_copy
            }else{
                return state.dropout
            }
        },
        getEloBoost(state){
            return state.eloboost
        },
        getMercadoPagoId(state){
            return state.mercadoPagoId
        },
        getPlayerPassword(state){
            return state.playerPassword
        },
        getShow(state){
            return state.show
        },
        getDisable(state){
            return state.disable
        }
    },
    mutations:{
        accessMutation(state,data){
            state.payment=data
        },
        confirmOrderMutation(state,data){
            state.formData.tipo=data.tipo
            state.formData.value=data.value
            state.formData.description=data.description
            state.formData.days=data.days
            router.push('/pagamento')
        },
        ordersMutation(state,data){
            state.orders=data.filter(e=>{return e.paymentsStatus=='APROVADO'})
        },
        ordersMutationPannel(state,data){
            state.orders_admin=data
        },
        orderMutationFilterPannel(state,data){
            state.order_admin=state.orders_admin.filter(e=>{return e._id===data})
        },
        orderMutation(state,data){
            state.order=state.orders.filter(e=>{return e._id===data})
            console.log(state.order)
        },
        gamesMutation(state,data){
            state.games=data
        },
        productsMutation(state,data){
            state.products=data
        },
        productMutation(state,data){
            state.product=state.products.filter(e=>{return e._id==data})
        },
        cupomValidMutation(state,data){
            state.formData.value=((parseFloat(state.formData.value))*(1-(data/100))).toFixed(2)
        },
        allCupomMutation(state,data){
            state.cupoms=data
        },
        addCupomMutation(state,data){
            state.cupoms.push(data)
        },
        redirectMutation(){
            router.push('/sucesso')
        },
        updateOrders(state,data){
            state.isSearch=false
            state.orders=data.filter(e=>{return e.paymentsStatus!='AGUARDANDO'})
        },
        searchProductMutation(state,data){
            if(data!=''){
                state.isSearch=true
                state.orders_admin_copy=state.orders_admin.filter(e=>{return e.code==data.toUpperCase()})
                // if(state.orders_copy.length==0){
                //    state.orders_copy=state.orders
                // }
            }else{
                state.isSearch=false
            }
        },
        changeSeachMutation(state){
            state.isSearch=false
        },
        searchStatusMutation(state,data){
            if(data!=''){
                state.isSearch=true
                if(data=='ELOBOOST' || data=='ELOCOACH'){
                    state.products_copy=state.products.filter(e=>{return e.tipo==data})
                }else{
                    state.products_copy=state.products.filter(e=>{return e.status==data.toUpperCase()})
                }
                if(state.products_copy.length==0){
                    state.products_copy=state.products
                }
            }
        },
        searchMyGamesMutation(state,data){
            if(data!=''){
                state.isSearch=true
                state.games_copy=state.games.filter(e=>{return e.status==data.toUpperCase()})
                if(state.games_copy.length==0){
                    state.games_copy=state.games
                }
            }else{
                state.isSearch=false
            }
        },
        searchPriceMutation(state,data){
            state.isSearch=true
            if(data=='barato'){
                state.orders_copy_price=state.orders.sort(function(a, b) {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0); 
                });
            }
            else if(data=='caro'){
                state.orders_copy_price=state.orders.sort(function(a, b) {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0); 
                });
            }else{
                state.isSearch=false
            }
        },
        showDropMutation(state,data){
            state.dropout=data
        },
        updateList(state,data){
            state.dropout=state.dropout.filter(e=>{return e._id!=data})
        },
        updateCupom(state,data){
            state.cupoms=state.cupoms.filter(e=>{return e._id!=data})
        },
        dropoutsMutation(state,data){
            if(data!=''){
                state.isSearch=true
                console.log(state.dropout)
                state.dropout_copy=state.dropout.filter(e=>{return e.user.email==data})
            }else{
                state.isSearch=false
            }
        },
        eloboostMutation(state,data){
            state.eloboost.value=data.value
            state.eloboost.days=data.days
            state.show=true
        },
        redirectPaymentMutation(){
            router.push('/dashboard')
        },
        mercadoPagoIdMutation(state,data){
            state.mercadoPagoId=data
        },
        playerPasswordMutation(state,data){
            state.playerPassword=data
        },
        closeShowMutation(state){
            state.show=false
        },
        disableButtonMutation(state,data){
            state.disable=data
        },
        removeOrderMutation(state,data){
            state.orders_admin=orders_admin.filter(e=>{return e._id==data})
        }
    },
    actions:{
        //payment
        async callPaypal({commit},payload){
            const token=localStorage.getItem('token')
            let id=''
            await Vue.http.post('api/order/create',{...payload},{headers:{Authorization: token}})
            .then(response=>{
                id=response.body.order._id              
            }).catch()  

            const order=Object.assign(payload,{id:id})
            await Vue.http.post('api/paypal/buy',{order},{headers:{Authorization: token}})
            .then(response=>{
                window.location.href=response.body
                // window.open(response.body, "_target");
            }).catch()
            
        },
        async endPayPal({commit},payload){
            const token=localStorage.getItem('token')
            console.log('vai aqui?')
            await Vue.http.post(`api/paypal/success`,{...payload},{headers:{Authorization: token}})
            .then(response=>{
                commit('redirectPaymentMutation')
            }).catch()
        },
        async callMercadoPago({commit},payload){
            const token=localStorage.getItem('token')
            let id=''
            await Vue.http.post('api/order/create',{...payload},{headers:{Authorization: token}})
            .then(response=>{
                id=response.body.order._id
                localStorage.setItem('qweklwq',id)
            }).catch()

            const email=localStorage.getItem('email')
            const name=email.split('@')[0]
            const order=Object.assign(payload,{id:id,userName:name,userEmail:email})
            await Vue.http.post('api/mercadopago/',{order:order},{headers:{Authorization: token}})
            .then(response=>{
                window.location.href=response.body
                // window.open(response.body, "_target");
            }).catch()
        },
        async endMercadoPago({commit},payload){
            const token=localStorage.getItem('token')
            const id=localStorage.getItem('qweklwq')
            const data={'collection_id':payload,'OrderId':id}
            await Vue.http.post('api/mercadopago/success',{data},{headers:{Authorization: token}})
            .then(response=>{
                localStorage.removeItem('qweklwq')
                commit('redirectPaymentMutation')
            }).catch()
        },
        //all users and Orders
        async getAllOrdersPannel({commit}){
            const token=localStorage.getItem('token')
            await Vue.http.get('api/order/',{headers:{Authorization: token}})
            .then(response=>{
                commit('ordersMutationPannel',response.body)
            }).catch(err=>{Vue.noty.error('Ocorreu um erro ao buscar os dados!')})
        },
        async getAllOrders({commit}){
            const token=localStorage.getItem('token')
            await Vue.http.get('api/order/',{headers:{Authorization: token}})
            .then(response=>{
                const all=response.body.filter(e=>{return e.userPlayer==null})
                commit('ordersMutation',all)
            }).catch(err=>{Vue.noty.error('Ocorreu um erro ao buscar os dados!')})
        },
        //return results
        async myGames({commit}){
            const token=localStorage.getItem('token')
            const userId=localStorage.getItem('id')
            await Vue.http.get(`api/order/${userId}`,{headers:{Authorization: token}})
            .then(response=>{
                commit('gamesMutation',response.body)
            }).catch()
        },
        async myProducts({commit}){
            const token=localStorage.getItem('token')
            const userId=localStorage.getItem('id')
            await Vue.http.get(`api/order/${userId}`,{headers:{Authorization: token}})
            .then(response=>{
                commit('productsMutation',response.body)
            }).catch()
        },
        //cupom
        async useCupom({commit},payload){
            const token=localStorage.getItem('token')
            const name=payload
            await Vue.http.get(`api/cupom/${name}`,{headers:{Authorization:token}})
            .then(response=>{
                if(response.body.message){
                    Vue.noty.warning('Cupom expirado')
                    commit('disableButtonMutation',false)
                }else{
                    commit('cupomValidMutation',response.body.cupom[0].value)
                }
            }).catch()
        },
        async createCupom({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post('api/cupom/',{...payload},{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success('Cupom criado com sucesso!')
                commit('addCupomMutation',response.body.cupom)
            }).catch(err=>console.log(err))
        },
        async allCupoms({commit}){
            const token=localStorage.getItem('token')
            await Vue.http.get('api/cupom/',{headers:{Authorization: token}})
            .then(response=>{
                commit('allCupomMutation',response.body)
            }).catch()
        },
        async removeCupom({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.delete(`api/cupom/${payload}`,{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success(response.body)
                commit('updateCupom',payload)
                this.allCupoms()
                // commit('cupomMutation',response.body)
            }).catch()
        },
        //Job
        async selectJob({commit},payload){
            const token=localStorage.getItem('token')
            const id=payload
            const userPlayer=localStorage.getItem('id')
            const pedido={userPlayer:userPlayer}
            await Vue.http.put(`api/order/updateUser/${id}`,{pedido:pedido},{headers:{Authorization: token}})
            .then(response=>{
                // this.getAllOrders()
            }).catch()
        },
        async updateStatus({commit},payload){
            const token=localStorage.getItem('token')
            const id=payload.id
            const pedido={status:payload.status}
            await Vue.http.put(`api/order/updateStatus/${id}`,{pedido:pedido},{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success('Status do pedido foi atualizado')
            }).catch()
        },
        async dropoutOrder({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post(`api/order/dropouts/${payload.id}`,{...payload},{headers:{Authorization: token}})
            .then(response=>{
                Vue.noty.success('Serviço removido da sua lista!')
                commit('updateList',payload.productId)
            }).catch()
        },
        async getAllDropout({commit}){
            const token=localStorage.getItem('token')
            await Vue.http.get('api/order/dropouts/getAll',{headers:{Authorization: token}})
            .then(response=>{
                commit('showDropMutation',response.body)
            }).catch()
        },
        //get elo
        async sendEloMd10({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post('api/elos/md10/getValue',payload)
            .then(response=>{
                commit('eloboostMutation',response.body)
            }).catch(err=>console.log(err))
        },
        async sendEloBoost({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post('api/elos/',payload)
            .then(response=>{
                commit('eloboostMutation',response.body)
            }).catch(err=>console.log(err))
        },
        //cancelOrder
        async cancelOrder({commit},payload){
            const token=localStorage.getItem('token')
            await Vue.http.post('api/order/user/cancelOrder',{...payload},{headers:{Authorization:token}})
            .then(response=>{
                // commit('updateOrdeMutation',payload.id)
                Vue.noty.success(response.body.message)
            })
            .catch()
        },
        async goRefund({commit},payload){
            const token=localStorage.getItem('token')
            const orderId=payload
            await Vue.http.post('api/order/refund',{orderId},{headers:{Authorization: token}})
            .then(response=>{
                if(response.status==200){
                    Vue.noty.success(response.body.message)
                }
            }).catch()
        },
        async requestUserData({commit,state},payload){
            const token=localStorage.getItem('token')
            if(state.playerPassword==null){
                await Vue.http.post('api/order/getPlayer/Password',{orderId:payload},{headers:{Authorization: token}})
                .then(response=>{
                    commit('playerPasswordMutation',response.body.playerPassword)
                })
            }
        },
        async removeOrder({commit},payload){
            const id=payload
            const token=localStorage.getItem('token')
            await Vue.http.delete(`api/order/${id}`,{headers:{Authorization: token}})
            .then(response=>{
                commit('removeOrderMutation',id)
            })
        }
        
    }
}

export default payment;