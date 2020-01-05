<template>
    <div class="topo">

        <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="text-center text-information">Confirmar pagamento</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="card border-primary mb-3">
                        <div class="card-header text-center text-payment">Dados Pessoais do LoL</div>
                        <div class="card-body">
                            <p class="text-danger text-center">Atenção! Seus dados serão criptografados e armazenados em nossa base de dados.</p> 
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Usuário no LoL</label>
                                <input class="form-control form-control-lg" type="text" v-model="loginLol.playerName">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Senha no LoL</label> 
                                <input class="form-control form-control-lg" id="pass" type="password" v-model="loginLol.playerPassword">
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="seePass" @click="myFunction()">
                                <label class="custom-control-label" for="seePass">Ver senha</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="card border-primary mb-3">
                        <div class="card-header text-center text-payment">Resumo do seu Pedido</div>
                        <div class="card-body">
                            <h4 class="card-title"><span class="intense">ELOJOB:</span> {{formData.tipo}}</h4>
                            <h5 class="card-text">{{formData.description}}</h5>
                            <h5 class="card-text">{{formData.days===1 ? `${formData.days} dia` : `${formData.days} dias` }}</h5>
                            <div v-if="formData.tipo!='ELOCOACH'">
                                <hr>
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="check1" @change="alwaysCheck()" checked value="Chat Offline">
                                        <label class="custom-control-label" for="customCheck1">Chat Offline</label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck2" v-model="check2" @change="addTime()" value="Defina horários">
                                        <label class="custom-control-label" for="customCheck2">Defina horários <span class="text-danger">+10% no valor total</span></label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck3" v-model="check3" @change="addRoutes()" value="Escolha de Rotas">
                                        <label class="custom-control-label" for="customCheck3">Escolha de Rotas <span class="text-danger">+10% no valor total</span></label>
                                    </div>
                                    <div class="form-group" v-if="check2 || check3">
                                        <textarea class="form-control" placeholder="Ex.: Posso jogar apenas as terças depois das 20hrs" rows="3" v-model="descricao"></textarea>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="card border-primary mb-3">
                        <div class="card-header text-center text-payment">Pagamento</div>
                        <div class="card-body">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <div class="form-group text-center">
                                        <label><strong>CUPOM</strong></label>
                                        <span class="form-inline my-2 my-lg-0 center-img">
                                            <input class="form-control mr-sm-2" type="text" v-model="cupom" >
                                            <button :class=[button] @click="validate()">Validar</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <h2 class="text-center card-title">Total a pagar: <span class="intense color-value">R$ {{formData.value}}</span></h2>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <h4 class="text-center text-modal-detail mt-3">Formas de pagamento</h4>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="a" value="paypal" v-model="select">
                                    <label for="a">
                                        <img src="@/assets/paypal.png" alt="paypal" class="img-fluid payment-image"> 
                                    </label>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="custom-control custom-radio">    
                                    <input type="radio" id="c" value="mercadopago" v-model="select">
                                    <label for="c">
                                        <img src="@/assets/mercadopago.png" alt="mercadopago" class="img-fluid payment-image">
                                    </label>
                                </div>   
                            </div>    
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row" v-if="select!=''">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <button type="button" v-if="!load" class="btn btn-success btn-lg btn-block mb-5" @click="comprar()">{{btnName}}</button>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import './style.css'
import Modal from '../Modal/modal-login.vue'
import router from '../../routes';

export default {
    data(){
        return{
            formData:{
                tipo:'',
                value:'',
                description:'',
                days:''
            },
            loginLol:{
                playerName:'',
                playerPassword:''
            },
            element:{},
            mensagem:'paypal',
            cupom:'',
            message:'',
            load:false,
            disable:false,
            button:'btn btn-primary my-2 my-sm-0',
            aula:false,
            check1:true,
            check2:false,
            check3:false,
            descricao:'',
            select:'',
            nome:this.$store.getters.getUser.name,
            btnName:'Finalizar compra'
        }
    },
    computed:{
        order(){
            const datas=localStorage.getItem('datas')
            if(datas!=null){
                const data=JSON.parse(datas)
                this.formData.description=data.description
                this.formData.tipo=data.tipo
                this.formData.value=data.value
                this.formData.days=data.days
            }else{  
                const product=this.$store.getters['getProduct']
                this.formData=product;
                return product;
            }
        },
    },
    methods: {
        validate(){
            if(this.disable==false){
                this.button='btn btn-secondary my-2 my-sm-0'
                this.disable=true
                this.$store.dispatch('useCupom',this.cupom)
            }
        },
        comprar(){
            if(this.loginLol.playerName=='' || this.loginLol.playerPassword==''){
                this.$noty.warning('Seus dados do LoL são obrigatórios')
            }else{
                const email=localStorage.getItem('email')
                const id=localStorage.getItem('id')
                const obj = Object.assign(this.formData, this.loginLol,{userclientid:id,aditionals:{chatOffline:this.check1,timeToPlay:this.check2,description:this.descricao,routes:this.check3}});
                if(this.select=="paypal"){
                    this.btnName='Redirecionando...'
                    this.$store.dispatch('callPaypal',obj)
                }else{
                    this.btnName='Redirecionando...'
                    this.$store.dispatch('callMercadoPago',obj)
                }
            }
        },
        myFunction() {
            var x = document.getElementById("pass");
            if (x.type === "password") { x.type = "text"; } 
            else { x.type = "password"; }
        },
        addTime(){
            if(this.check2){
                this.formData.value=(this.formData.value*(1.1)).toFixed(2)
            }else{
                this.formData.value=(parseFloat(this.formData.value)/(1.1)).toFixed(2)
            }
        },
        addRoutes(){
            if(this.check3){
                this.formData.value=(this.formData.value*(1.1)).toFixed(2)
            }else{
                this.formData.value=(parseFloat(this.formData.value)/(1.1)).toFixed(2)
            }
        },
        alwaysCheck(){
            this.check1=true
        }
    },
    mounted(){
        this.order
        this.$store.commit("changeStatusFooter",false)
    },
    destroyed(){
        localStorage.removeItem('datas')
    },
}
</script>