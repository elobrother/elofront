<template>
    <div>
        <Detail/>

        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Meus Pedidos</h3>
                <hr>  
            </div>  
        </div>
        <div class="row justify-content-center mb-4">
            <div class="col text-center">
                <router-link class="btn btn-primary" to="/servicos">Comprar serviço</router-link>
                <!-- <button  @click="services()"></button> -->
            </div>
        </div>
        <div class="row">
            <div class="col">
                <!-- <span class="form-inline my-2 my-lg-0" v-if="products.length!=0">
                    <input class="form-control mr-sm-2" type="text" id="calendario" v-model="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">buscar por status</button>
                </span> -->
                <!-- <select v-if="products.length!=0" class="custom-select mb-2" v-model="element" @click="search()">
                    <option value="#">Selecione</option>
                    <option key="AGUARDANDO">Aguardando</option>
                    <option key="EM ANDAMENTO">Em andamento</option>
                    <option key="CONCLUIDO">Concluido</option>
                </select> -->
                <div v-if="products.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">
                                <select v-if="products.length!=0" class="custom-select" v-model="tipo" @click="search()">
                                    <option value="Tipo">Tipo</option>
                                    <option key="ELOBOOST">ELOBOOST</option>
                                    <option key="ELOCOACH">ELOCOACH</option>
                                </select>
                            </th>
                            <th scope="col">
                                <select v-if="products.length!=0" class="custom-select" v-model="status" @click="search()">
                                    <option value="Status">Status</option>
                                    <option key="AGUARDANDO">Aguardando</option>
                                    <option key="EM ANDAMENTO">Em andamento</option>
                                    <option key="CONCLUIDO">Concluido</option>
                                </select>
                            </th>
                            <th scope="col">Pagamento</th>    
                            <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active" v-for="(product,index) in myProducts" :key="index">
                                <th scope="row">{{product.tipo}}</th>
                                <td>{{product.status}}</td>
                                <td>{{product.paymentsStatus}}</td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="detail(product._id)">Detalhes</button></td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
                <div v-if="products.length==0">
                    <p class="text-center">Você ainda não obteve um serviço</p>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import Detail from '../../../Modal/modal-product.vue'; 
import io from 'socket.io-client';
export default {
    data(){
        return{
            status:false,
            socket :io('https://elobrotherapi.herokuapp.com'),
            // socket :io('https://elobrother-api.herokuapp.com'),
            // socket : io('http://localhost:3000'),
            myProducts:{},
            tipo:'Tipo',
            status:'Status',
        }
    },
    components:{
        Detail
    },
    computed:{
        products(){
            this.myProducts=this.$store.getters['getProducts']
            return this.myProducts
        },
    },
    methods: {
        detail(id){
            this.$store.commit('productMutation',id)
        },
        search(){
            let element=''
            if(this.status!='Status'){
                element=this.status
            }
            else if(this.tipo!='Tipo'){
                element=this.tipo
            }
            this.$store.commit('searchStatusMutation',element)
        },
    },
    created(){
        this.$store.dispatch('myProducts')
    },
    mounted(){
        this.socket.on('orderStatus',data=>{
            console.log(data)
            console.log('==========')
            console.log(this.myProducts)
            this.myProducts=this.myProducts.filter(e=>{
                console.log('id aqui: '+e._id)
                console.log('isso aqui: '+data.updateOrder)
                if(e._id===data.updateOrder){
                    console.log('entrou aqui')
                    return e.status=data.status
                }
            })
            console.log('Novo atual')
            console.log(this.myProducts)
        })
    },
    destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>