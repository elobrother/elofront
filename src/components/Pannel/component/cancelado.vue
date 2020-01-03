<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Pedidos Cancelados</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <div v-if="order.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Motivo</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr class="table-active" v-for="(ord,index) in order" :key="index">
                                <td scope="row">{{ord.name}}</td>
                                <td>{{ord.email}}</td>
                                <td>{{ord.qtd}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="order.length==0">
                    <p class="text-center">Ainda não há jogadores cadastrados</p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            element:''
        }
    },
    computed: {
        order(){return this.$store.getters['getRanking']},
    },
    methods:{
        search(){
            
        }
    },
    created(){
        this.$store.dispatch('showCancelOrder')
    }
    
}
</script>