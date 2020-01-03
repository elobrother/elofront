<template>
    <div style="height:300vh;background: linear-gradient(to bottom left, #a5a5a5 7%, #669999 100%);">
            <div class="container">
                <div class="row space-top">
                    <div id="menu1" class="col-md-3">
                        <div class="card shadow-lg">
                            <div class="card-header" style="height:150px">
                                <p class="text-center">Bem vindo, {{this.$store.state.admin.formData.name}}</p>
                                <p class="text-center">{{date}}</p>
                                <button class="btn btn-danger btn-block" @click="exit()">Encerrar Sessão</button>
                            </div>
                            <div class="card-body">
                                <p v-bind:class="[usuarios ? active : notactive]" @click="select('usuarios')"><i class="fas fa-users"></i> Usuarios</p>
                                <p v-bind:class="[jogadores ? active : notactive]" @click="select('jogadores')"><i class="fas fa-user-astronaut"></i> Jogadores</p>
                                <p v-bind:class="[products ? active : notactive]"  @click="select('produtos')"><i class="fas fa-list"></i> Pedidos</p>
                                <p v-bind:class="[cupom ? active : notactive]" @click="select('cupom')"><i class="fas fa-ticket-alt"></i> Cupons</p>
                                <p v-bind:class="[desistencias ? active : notactive]" @click="select('desistencias')"><i class="fas fa-trash"></i> Desistencias</p>
                                <p v-bind:class="[price ? active : notactive]" @click="select('preco')"><i class="fas fa-dollar-sign"></i> Preço</p>
                                <p v-bind:class="[relatorio ? active : notactive]" @click="select('relatorio')"><i class="fas fa-print"></i> Relatório</p>
                                <p v-bind:class="[ranking ? active : notactive]" @click="select('ranking')"><i class="fas fa-fire"></i> Ranking</p>
                                <!-- <p v-bind:class="[cancelado ? active : notactive]" @click="select('cancelado')"><i class="fas fa-user-times"></i> Pedidos Cancelados</p> -->
                            </div>
                        </div>
                    </div>
                    <div id="menu2" class="col-12 mb-5">
                        <div class="card">
                            <div class="card-header">
                                <p class="text-center">Bem vindo, Admin</p>
                                <p class="text-center">{{date}}</p>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-danger btn-block" @click="exit()">Encerrar Sessão</button>
                            </div>
                        </div>
                    </div>
                    <div id="menu2" class="btn-group col-12 mb-5" role="group" aria-label="Basic example">
                        <button type="button" v-bind:class="[usuarios ? responactive : responnotactive]" @click="select('usuarios')"><i class="fas fa-users"></i> Usuarios</button>
                        <button type="button" v-bind:class="[jogadores ? responactive : responnotactive]" @click="select('jogadores')"><i class="fas fa-user-astronaut"></i> Jogadores</button>
                        <button type="button" v-bind:class="[products ? responactive : responnotactive]" @click="select('produtos')"><i class="fas fa-list"></i> Pedidos</button>
                        <button type="button" v-bind:class="[cupom ? responactive : responnotactive]" @click="select('cupom')"><i class="fas fa-ticket-alt"></i> Cupons</button>
                        <button type="button" v-bind:class="[desistencias ? responactive : responnotactive]" @click="select('desistencias')"><i class="fas fa-trash"></i> Desistencias</button>
                        <button type="button" v-bind:class="[price ? responactive : responnotactive]" @click="select('preco')"><i class="fas fa-dollar-sign"></i> Preço</button>
                        <button type="button" v-bind:class="[relatorio ? responactive : responnotactive]" @click="select('relatorio')"><i class="fas fa-print"></i> Relatório</button>
                        <button type="button" v-bind:class="[ranking ? responactive : responnotactive]" @click="select('ranking')"><i class="fas fa-fire"></i> Ranking</button>
                        <!-- <button type="button" v-bind:class="[cancelado ? responactive : responnotactive]" @click="select('cancelado')"><i class="fas fa-user-times"></i> Pedidos Cancelados</button> -->
                    </div>
                    <div class="col-md-9">
                        <div class="card shadow-lg mb-5">
                            <div class="card-header" v-if="authorization" >
                                <Players v-if="jogadores"/>
                                
                                <Products v-if="products" />

                                <Users v-if="usuarios" />

                                <Cupom v-if="cupom" />

                                <Desistencias v-if="desistencias" />

                                <Price v-if="price" />

                                <Relatorio v-if="relatorio" />

                                <Ranking v-if="ranking" />

                                <!-- <Cancelado v-if="cancelado" /> -->
                            </div>  
                        </div>
                    </div>
                </div>
            </div>          
    </div>
</template>

<script>
import Players from './component/players.vue'
import Products from './component/products.vue'
import Users from './component/users.vue'
import Cupom from './component/cupom.vue'
import Desistencias from './component/desistencias.vue'
import Relatorio from './component/relatory.vue'
import Price from './component/price.vue'
import Ranking from './component/ranking.vue'
// import Cancelado from './component/cancelado.vue'
import moment from 'moment';
import router from '../../routes'; 

    export default {
        data(){
            return{
                notactive:'text-center list-group-item list-group-item-action cursor',
                active:'text-center list-group-item list-group-item-action cursor active',
                responactive:'btn btn-success size',
                responnotactive:'btn btn-secondary size',
                service:false,
                usuarios:true,
                products:false,
                jogadores:false,
                cupom:false,
                desistencias:false,
                relatorio:false,
                price:false,
                ranking:false,
                cancelado:false,
                date:moment().format('DD/MM/YYYY')
            }
        },
        components:{
            Products,
            Players,
            Users,
            Cupom,
            Desistencias,
            Price,
            Relatorio,
            Ranking,
            // Cancelado
        },
        computed:{
            authorization(){
                console.log('refresh')
                console.log(this.$store.getters.getToken)
                return this.$store.getters.getToken
            }
        },
        methods:{
            select(element){
                console.log(element)
                switch(element){
                    case 'usuarios':
                        this.usuarios=true
                        this.products=this.jogadores=this.cupom=this.desistencias=this.relatorio=this.price=this.ranking=this.cancelado=false
                        break;

                    case 'produtos':
                        this.products=true
                        this.usuarios=this.jogadores=this.cupom=this.desistencias=this.relatorio=this.price=this.ranking=this.cancelado=false
                        break;

                    case 'jogadores':
                        this.jogadores=true
                        this.usuarios=this.products=this.cupom=this.desistencias=this.relatorio=this.price=this.ranking=this.cancelado=false
                        break;

                    case 'cupom':
                        this.cupom=true
                        this.jogadores=this.usuarios=this.products=this.desistencias=this.relatorio=this.price=this.ranking=this.cancelado=false
                        break;
                    case 'desistencias':
                        this.desistencias=true
                        this.jogadores=this.usuarios=this.products=this.cupom=this.relatorio=this.price=this.ranking=this.cancelado=false
                        break;
                    case 'relatorio':
                        this.relatorio=true
                        this.jogadores=this.usuarios=this.products=this.cupom=this.desistencias=this.price=this.ranking=this.cancelado=false
                        break;
                    case 'preco':
                        this.price=true
                        this.jogadores=this.usuarios=this.products=this.cupom=this.desistencias=this.relatorio=this.ranking=this.cancelado=false
                        break;
                    case 'ranking':
                        this.ranking=true
                        this.jogadores=this.usuarios=this.products=this.cupom=this.desistencias=this.relatorio=this.price=this.cancelado=false
                        break;
                    // case 'cancelado':
                    //     this.cancelado=true
                    //     this.jogadores=this.usuarios=this.products=this.cupom=this.desistencias=this.relatorio=this.price=this.ranking=false
                    //     break;
                }
            },
            exit(){
                this.$store.commit("logoutMutation");
            },
            recuperaDadosAdmin(){
                const id=localStorage.getItem('id');
                this.$store.dispatch('recuperaDadosAdmin',id)
            }
        },
        created(){
            this.recuperaDadosAdmin();
        },
        mounted(){
            this.$store.commit("changeStatusFooter",false)
            this.$store.commit("changeStatusHeader",false)
        },
        // beforeDestroy(){
        //     this.$store.commit("changeStatusFooter",true)
        //     this.$store.commit("changeStatusHeader",true)
        // },
        destroyed(){
            this.$store.commit("changeStatusFooter",true)
            this.$store.commit("changeStatusHeader",true)
        }        
    }
</script>