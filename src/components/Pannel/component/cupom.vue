<template>
    <div>
        
        <Modal/>

        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Cupons</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <button class="btn btn-primary" data-toggle="modal" data-target="#cupom">Adicionar Cupom</button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr class="table-active" v-for="(cupom,index) in cupoms" :key="index">
                            <th scope="row">{{cupom.name}}</th>
                            <td>{{cupom.value}} %</td>
                            <td><button class="btn btn-danger" data-toggle="modal" data-target="#detalhe" @click="removeCupom(cupom._id)">Excluir</button></td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="cupoms.length==0">
                    <p class="text-center">Não há cupons criados</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import Modal from '../../Modal/modal-cupom.vue'; 


export default {
    data(){
        return{
        }
    },
    components:{
        Modal
    },
    computed:{
        cupoms(){
            return this.$store.getters.getCupoms
        }
    },
    methods:{
        removeCupom(id){
            this.$store.dispatch('removeCupom',id)
        }
    },
    created() {
        this.$store.dispatch('allCupoms')
    },
}
</script>