<template>
    <div>
        <div class="modal fade" id="authentication" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-top">
                        <h4 v-if="!display" class="text-center text-login">Faça seu Login para efetivar a compra!</h4>
                        <h4 v-if="display" class="text-center text-login">Crie sua conta para efetivar a compra!</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                                <div v-if="display" class="form-group">
                                    <input class="form-control form-control-lg" type="text" placeholder="nome" v-model="formData.name">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="text" placeholder="email" v-model="formData.email">
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" type="password" placeholder="senha" v-model="formData.password">
                                </div>
                                <button v-if="!display" class="btn btn-primary btn-lg btn-block" @click="enter()" data-dismiss="modal" aria-label="Close" aria-controls="navbarColor01">Entrar</button>
                                <button v-if="display" class="btn btn-primary btn-lg btn-block" @click="enter()" data-dismiss="modal" aria-label="Close">Cadastrar</button>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                    </div>
                    <div class="modal-bottom" style="background: #51a945">
                        <h4 v-if="!display" class="text-center text-register">Ainda não tem uma conta? <span @click="register()" class="text-register">Clique aqui</span></h4>
                        <h4 v-if="display" class="text-center text-register">Já possui uma conta? <span @click="register()" class="text-register">Clique aqui</span></h4>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return{
            display:false,
            menu:false,
            formData:{
                name:'',
                email:'',
                password:'',
                status:'CLIENTE'
            },
        }
    },
    methods:{
        register(){
            this.display=!this.display
        },
        enter(){
            localStorage.setItem('datas',JSON.stringify(this.data))
            if(!this.display){
                this.$store.dispatch("loginToBuy",this.formData)
            }else{
                this.$store.dispatch("registerToBuy",this.formData)
            }
        },
    }
}

</script>
