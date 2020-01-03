<template>
    <div>
        <div class="topo">
            <div class="container">
                <div class="row mb-5 space-top">
                    <div id="menu1" class="col-md-3 margin-bottom-40">
                        <div class="card shadow-lg">
                            <div class="card-header">
                                <h3 class="text-center text-name"><strong>{{usuario.name}}</strong></h3>
                                <p class="text-center text-name" v-if="usuario.status=='CLIENTE'">Usuário</p>
                                <p class="text-center text-name" v-if="usuario.status=='JOGADOR'">Jogador</p>
                                <p class="text-center">{{date}}</p>
                            </div>
                            <div v-if="usuario.status=='CLIENTE'" class="card-body">
                                <p v-bind:class="[product ? active : notactive]" @click="select('product')"><i class="fab fa-elementor"></i> Meus Pedidos</p>
                                <!-- <p v-bind:class="[ranking ? active : notactive]" @click="select('ranking')"><i class="fas fa-thermometer-full"></i> Meu Ranking</p> -->
                                <p v-bind:class="[account ? active : notactive]"  @click="select('account')"><i class="fas fa-user"></i> Minha Conta</p>
                                <p v-bind:class="[password ? active : notactive]"  @click="select('password')"><i class="fas fa-key"></i> Alterar senha</p>
                            </div>
                            <div v-else class="card-body">
                                <p v-bind:class="[main ? active : notactive]" @click="select('main')"><i class="fab fa-elementor"></i> Mural</p>
                                <p v-bind:class="[games ? active : notactive]" @click="select('games')"><i class="fas fa-thermometer-full"></i> Meus Jogos</p>
                                <p v-bind:class="[account ? active : notactive]"  @click="select('account')"><i class="fas fa-user"></i> Minha Conta</p>
                                <p v-bind:class="[password ? active : notactive]"  @click="select('password')"><i class="fas fa-key"></i> Alterar senha</p>
                            </div>
                        </div>
                    </div>
                    <div id="menu2" class="col-12 mb-5">
                        <div class="card">
                            <div class="card-header">
                                <p class="text-center text-name"><strong>{{usuario.name}}</strong></p>
                                <p class="text-center text-name" v-if="usuario.status=='CLIENTE'">Usuário</p>
                                <p class="text-center text-name" v-if="usuario.status=='JOGADOR'">Jogador</p>
                                <p class="text-center">{{date}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="usuario.status=='CLIENTE'" id="menu2" class="btn-group col-12 mb-5" role="group" aria-label="Basic example">
                        <button type="button" v-bind:class="[product ? responactive : responnotactive]" @click="select('product')"><i class="fab fa-elementor"></i> Meus Pedidos</button>
                        <!-- <button type="button" v-bind:class="[ranking ? responactive : responnotactive]" @click="select('ranking')"><i class="fas fa-info-circle"></i> Meu Ranking</button> -->
                        <button type="button" v-bind:class="[account ? responactive : responnotactive]" @click="select('account')"><i class="fas fa-user"></i> Minha Conta</button>
                        <button type="button" v-bind:class="[password ? responactive : responnotactive]" @click="select('password')"><i class="fas fa-key"></i> Alterar senha</button>
                    </div>
                    <div v-if="usuario.status=='JOGADOR'" id="menu2" class="btn-group col-12 mb-5" role="group" aria-label="Basic example">
                        <button type="button" v-bind:class="[main ? responactive : responnotactive]" @click="select('main')"><i class="fab fa-elementor"></i> Mural</button>
                        <button type="button" v-bind:class="[games ? responactive : responnotactive]" @click="select('games')"><i class="fas fa-info-circle"></i> Meus Jogos</button>
                        <button type="button" v-bind:class="[account ? responactive : responnotactive]" @click="select('account')"><i class="fas fa-user"></i> Minha Conta</button>
                        <button type="button" v-bind:class="[password ? responactive : responnotactive]" @click="select('password')"><i class="fas fa-key"></i> Aletar senha</button>
                    </div>
                    <div class="col-sm-12 col-md-9">
                        <div class="card shadow-lg mb-5">
                            <div class="card-header">
                                
                                <Product v-if="product && service && usuario.status=='CLIENTE'" />

                                <Account v-if="account" />

                                <Ranking v-if="ranking && usuario.status" />

                                <Main v-if="usuario.status=='JOGADOR' && main" />

                                <Games v-if="usuario.status=='JOGADOR' && games" />
                                
                                <Password v-if="password" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Product from './component/user/products.vue'
import Account from './component/account.vue'
import Ranking from './component/user/ranking.vue'
import Password from './component/password.vue'

import Games from './component/player/games.vue'
import Main from './component/player/main.vue'
import moment from 'moment';

export default {
    data(){
        return{
            notactive:'text-center list-group-item list-group-item-action cursor',
            active:'text-center list-group-item list-group-item-action cursor active',
            responactive:'btn btn-success size',
            responnotactive:'btn btn-secondary size',
            service:true,
            product:true,
            account:false,
            ranking:false,
            games:false,
            main:true,
            password:false,
            date:moment().format('DD/MM/YYYY')
        }
    },
    computed: {
        usuario(){
            let user=this.$store.getters['getUser']
            return user;
        }
    },
    components:{
        Product,
        Account,
        Ranking,
        Games,
        Main,
        Password
    },
    methods:{
        select(element){
            switch(element){
                case 'product':
                    this.product=true
                    this.account=this.ranking=this.password=false
                    break;

                case 'account':
                    this.account=true
                    this.product=this.ranking=this.games=this.main=this.password=false
                    break;
                    
                case 'ranking':
                    this.ranking=true
                    this.product=this.account=this.games=this.main=this.password=false
                    break;

                case 'games':
                    this.games=true
                    this.main=this.account=this.password=false
                    break;

                case 'main':
                    this.main=true
                    this.games=this.account=this.password=false
                    break;

                case 'password':
                    this.password=true
                    this.games=this.main=this.account=this.product=false
                    break;
            }
        },
        recuperaDados(){
            const id=localStorage.getItem('id');
            this.$store.dispatch('recuperaDados',id)
        },
    },
    created(){
        this.recuperaDados();
    },
    mounted(){
        this.$store.commit("changeStatusFooter",false)
    },
    beforeDestroy(){
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>