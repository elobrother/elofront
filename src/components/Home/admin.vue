<template>
    <div style="height:100vh; background: linear-gradient(to bottom left, #a5a5a5 7%, #669999 100%);">
        <div class="container">

            <div class="row justify-content-center space-top">
                <div class="col">
                    <h5 class="text-center mt-5 white-text-admin">ELOBROTHER</h5>
                    <p class="text-center white-text-admin-no-size">Painel admin</p>
                    <hr class="underline-white"/>
                </div>
            </div>
            <!-- <div class="row justify-content-center mt-3 mb-4">
                <div class="col">
                    <img src="@/assets/logo4.png" class="img-fluid center-img" alt="" height="70" width="130">
                </div>
            </div>  -->
            <div class="row justify-content-center mb-5">
                <div class="col-sm-6 col-md-4 align-self-center">
                    <div class="card card-border shadow-lg">
                        <div class="space-between">
                            <div class="form-group">
                                <input type="text" class="form-control shadow" id="contact" placeholder="E-mail" v-model.trim="formData.email" >
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control shadow" id="contact" placeholder="Senha" v-model.trim="formData.password" >
                            </div>
                            <button type="button" class="btn btn-success btn-lg btn-block" @click="enter()">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import router from '../../routes';
export default {
    data(){
        return{
            formData:{
                email:'',
                password:''
            }
        }
    },
    methods: {
        enter(){
            if(this.formData.email!='' && this.formData.password!=''){
                this.formData.email=this.formData.email.toLowerCase()
                this.$store.dispatch('loginPannel',this.formData)
            }else{
                this.$noty.error('Preencha todos os campos')
            }
        }
    },
    created() {
        this.$store.commit("changeStatusHeader",false) 
        this.$store.commit("changeStatusFooter",false)
    },
    destroyed() {
        this.$store.commit("changeStatusHeader",true) 
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>