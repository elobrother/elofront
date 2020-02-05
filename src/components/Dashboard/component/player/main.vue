<template>
    <div>

        <Modal/>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Mural de pedidos</h3>
                <p class="text-center">Caro jogador, escolha os pedidos que melhor te atendem que nossos clientes comparam</p>
                <hr>
            </div>
        </div>   
        <div class="row justify-content-center">
            <div class="col">
                <!-- <span class="form-inline my-2 my-lg-0" v-if="orders.length!=0">
                    <input class="form-control mr-sm-2" type="text" id="calendario" v-model="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">buscar por preço</button>
                </span> -->
                <div v-if="orders.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Tipo
                                    <!-- <select v-if="orders.length!=0" class="custom-select" v-model="tipo" @click="searchType()">
                                        <option value="Tipo">Tipo</option>
                                        <option key="ELOBOOST">ELOBOOST</option>
                                        <option key="ELOCOACH">ELOCOACH</option>
                                    </select> -->
                                </th>
                                <th scope="col">Data de publicação</th>
                                <th scope="col">Dias</th>
                                <th scope="col">Valor
                                    <!-- <select v-if="orders.length!=0" class="custom-select" v-model="valor" @click="search()">
                                        <option value="Valor">Valor</option>
                                        <option key="barato">Mais barato</option>
                                        <option key="caro">Mais Caro</option>
                                    </select> -->
                                </th>
                                <th scope="col">Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active" v-for="(order,index) in orders" :key="index">
                                <td scope="row">{{order.tipo}} </td>
                                <td>{{moment(order.createdAt).format('DD/MM/YYYY')}}</td>
                                <td>{{order.days}}</td>
                                <td>R$ {{order.valor}}</td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="seeJob(order._id)">Visualizar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p class="text-center">Não há serviços no momento</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../../../Modal/modal-select.vue'
import io from 'socket.io-client';

export default {
    data(){
        return{
            socket : io('https://elobrotherapi.herokuapp.com'),
            // socket : io('http://localhost:3000'),
            pedidos:{},
            element:'',
            tipo:'Tipo',
            valor:'Valor'
        }
    },
    components:{
        Modal
    },
    computed:{
        orders(){
            // this.pedidos= this.$store.getters['getOrders']
            this.pedidos=Object.assign(this.$store.getters.getOrdersPrice) 
            return this.$store.getters.getOrdersPrice
        }
    },
    methods: {
        seeJob(id){
            this.$store.commit('orderMutation',id)
        },
        async callOrders(){
            await this.$store.dispatch('getAllOrders')
        },
        search(){
            this.$store.commit('searchPriceMutation',this.valor)
        },
        searchType(){
            this.$store.commit('searchStatusMutation',this.tipo)
        }
    },
    created(){
        this.callOrders()
        this.orders
    },
    mounted(){
        this.socket.on('orderUser', data => {
            this.$store.commit('updateOrders',data.updateOrder)
            // this.pedidos=data.updateOrder
        });

        this.socket.on('newOrder',data=>{
            this.$store.commit('updateOrders',data)
            // this.pedidos=data
        })
    },
    destroyed(){
        this.pedidos={}
        this.$store.commit('changeSeachMutation')
    }
}
</script>