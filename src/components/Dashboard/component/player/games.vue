<template>
    <div>
        <Modal :id="id" :playerName="playerName" :playerPassword="playerPassword" />

        <Desistir :playerId="playerId" :productId="productId"/>

        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Meus jogos</h3>
                <hr>
            </div>
        </div>    
        <div class="row justify-content-center">
            <div class="col">
                <span class="form-inline my-2 my-lg-0" v-if="games.length!=0">
                    <input class="form-control mr-sm-2" type="text" id="calendario" v-model="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">buscar por status</button>
                </span>
                <div v-if="games.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Tipo</th>
                                <th scope="col">Status</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active" v-for="(game,index) in games" :key="index">
                                <th scope="row">{{game.tipo}}</th>
                                <td>{{game.status}}</td>
                                <td>{{game.valor}}</td>
                                <td v-if="game.status=='CONCLUIDO'"><button class="btn btn-secondary">Concluido</button></td>
                                <td v-else><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="changeStatus(game._id,game.playerName,game.playerPassword,game.status)">{{btntext}}</button></td>
                                <td v-if="game.status!='CONCLUIDO'"><button class="btn btn-danger" data-toggle="modal" data-target="#desistir" @click="dropService(game._id)">Desistir</button></td>
                                <td v-else><button class="btn btn-secondary">Desistir</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="games.length==0">
                    <p class="text-center">Você ainda não pegou um serviço</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../../../Modal/modal-progress.vue'
import Desistir from '../../../Modal/modal-dropout.vue'
import io from 'socket.io-client';
export default {
    data(){
        return{
            id:'',
            playerName:'',
            playerPassword:'',
            socket:io('https://elobrotherapi.herokuapp.com'),
            // socket : io('http://localhost:3000'),
            matches:{},
            playerId:localStorage.getItem('id'),
            productId:'',
            btntext:'Detalhes',
            button:'',
            element:''
        }
    },
    components:{
        Modal,
        Desistir
    },
    computed:{
        games(){
            this.matches=this.$store.getters['getGames']
            const asd=this.$store.getters['getGames']
            return this.$store.getters['getGames']
        },
    },
    methods:{
        changeStatus(id,name,password){
            this.id=id
            this.playerName=name
            this.playerPassword=password
        },
        dropService(serviceId){
            this.productId=serviceId
        },
        search(){
            this.$store.commit('searchMyGamesMutation',this.element)
        },
    },
    created(){
        this.$store.dispatch('myGames')
    },
    mounted(){
        this.socket.on('orderStatus',data=>{
            console.log(data)
            console.log('==========')
            console.log(this.matches)
            this.games.filter(e=>{
                console.log('id aqui: '+e._id)
                console.log('isso aqui: '+data.updateOrder)
                if(e._id===data.updateOrder){
                    console.log('entrou aqui')
                    console.log('Aqui é o status via socket '+data.status)
                    return e.status=data.status
                }
            })
            console.log('Novo atual')
            console.log(this.games)
        })
    },
     destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>