<template>
    <div>
        <Detail :status=status />

        <Delete :id=id />
        <span>{{payments}}</span>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Pedidos</h3>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" id="calendario" v-model.trim="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">Buscar por N* ordem</button>
                </span>
                <div v-if="orders.length!=0" style="height:400px;width:auto;display:block; overflow-y:auto" class="mt-5">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Tipo</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Código</th>
                                <th scope="col">Ação</th>
                                <th scope="col">Excluir</th>
                            </tr>
                        </thead>
                        <tbody v-if="!load" >
                            <tr class="table-active" v-for="(order,index) in orders" :key="index">
                                <th scope="row">{{order.tipo}}</th>
                                <td>R$ {{order.valor}}</td>
                                <td>{{order.code}}</td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="seeProduct(order._id)">Detalhes</button></td>
                                <td><button class="btn btn-danger" data-toggle="modal" data-target="#remove" @click="removeProduct(order._id)"><i class="fas fa-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="orders.length==0">
                    <p class="text-center mt-3">Esse código não existe</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Detail from '../../Modal/modal-product.vue'; 
import Delete from '../../Modal/modal-remove.vue'; 

export default {
    data(){
        return{
            status:true,
            load:false,
            total:null,
            element:'',
            id:''
        }
    },
    components:{
        Detail,
        Delete
    },
    computed:{
        orders(){
            this.load=false;
            this.total=this.$store.getters['getOrders'];
            return this.$store.getters['getOrders']
        },
        async payments(){
            let test = await this.$store.getters['getOrders'];
            console.log(test);
            const orderIds = test.map(order => order._id);
            return this.$store.getters['getAllPayments'];
        },
    },
    methods: {
        search(){
            this.$store.commit('searchProductMutation',this.element)
        },
        seeProduct(id){
            this.$store.commit('orderMutationFilterPannel',id)
        },
        removeProduct(id){
            this.id=id
            // this.$store.commit('orderMutationFilterPannel',id)
        },
    },
    created(){
        this.$store.dispatch('getAllOrdersPannel');
    },
    destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>