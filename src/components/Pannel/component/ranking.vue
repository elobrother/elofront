<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Ranking</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <span class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Nome do jogador" v-model="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">Buscar</button>
                </span>
                <div v-if="ranking.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Qtd Concluidos</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr class="table-active" v-for="(rank,index) in ranking" :key="index">
                                <td scope="row">{{rank.name}}</td>
                                <td>{{rank.email}}</td>
                                <td>{{rank.pedidos}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="ranking.length==0">
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
        ranking(){return this.$store.getters['getRanking']},
    },
    methods:{
        search(){
            
        }
    },
    created(){
        this.$store.dispatch('showRanking')
    }
    
}
</script>