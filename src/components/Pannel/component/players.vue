<template>
    <div>
        
        <Modal/>

        <Detail />

        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Jogadores</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center mb-4">
            <div class="col">
                <button class="btn btn-primary" data-toggle="modal" data-target="#teste">Adicionar novo jogador</button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <span class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Nome do jogador" v-model="formData.name">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">Buscar</button>
                </span>
                <div v-if="players.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        
                        <tbody v-if="!load">
                            <tr class="table-active" v-for="(player,index) in players" :key="index">
                                <th scope="row">{{player.name}}</th>
                                <td>{{player.email}}</td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="seePlayer(player._id)">Detalhes</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="players.length==0">
                    <p class="text-center">Ainda não há jogadores cadastrados</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import Modal from '../../Modal/add-player.vue'; 
import Detail from '../../Modal/modal-player-detail.vue'; 

export default {
    data(){
        return{
            load:false,
            formData:{
                page:'player',
                name:''
            },
            element:''
        }
    },
    components:{
        Modal,
        Detail
    },
    computed:{
        players(){
            return this.$store.getters['getAllPlayers']
        }
    },
    methods:{
        search(){
            this.$store.commit('searchUsersMutation',this.formData)
        },
        seePlayer(id){
            this.$store.commit('onePlayerMutation',id)
        }
    },
    mounted(){
        this.$store.dispatch('allPlayers');
    },
    destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>