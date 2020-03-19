<template>
    <div>
        <div id="contact" style="background: #F5F5F5;">
            <div class="container space-bottom space-top">
                <div class="row">
                    <div class="col">
                        <h2 class="text-center mt-5 white-black" style="font-weight: bold;">Entre em contato conosco</h2>
                        <hr class="underline-black mb-5"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <div class="alert alert-dismissible alert-secondary">
                            <div class="row">
                                <div class="col-4">
                                    <i class="fas fa-envelope-open-text fa-4x"></i>
                                </div>
                                <div class="col-8">
                                    <strong>E-MAIL</strong>
                                    <p><a href="mailto:admelobrother@gmail.com">admelobrother@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-dismissible alert-secondary">
                            <div class="row">
                                <div class="col-4">
                                    <i class="far fa-clock fa-4x"></i>
                                </div>
                                <div class="col-8">
                                    <strong>HORÁRIO DE ATENDIMENTO</strong>
                                    <p>24 Horas</p>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-dismissible alert-secondary">
                            <div class="row">
                                <div class="col-4">
                                    <i class="fab fa-whatsapp fa-4x"></i>
                                </div>
                                <div class="col-8">
                                    <strong>Whatsapp</strong>
                                    <p>
                                        <a 
                                            href="https://api.whatsapp.com/send?phone=5521965246189&text=Ola"
                                            target="_blank"> 21 96524-6189</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Nome" id="contact" v-model="formData.name">
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Email" id="contact" v-model="formData.email">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control form-control-lg" placeholder="Mensagem" id="contact" rows="5" v-model="formData.message"></textarea>
                        </div>
                        <div style="z-index:10">
                            <button type="button" class="btn btn-secondary btn-lg btn-block" @click="send()">Enviar mensagem</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData:{
                name:'',
                email:'',
                message:''
            }
        }
    },
    methods:{ 
        send(){
            if(this.formData.message==''||this.formData.email==''||this.formData.name==''){
                this.$noty.warning('Preencha todos os campos')
            }else{
                this.$store.dispatch('sendMessage',this.formData)
                this.formData={name:'',email:'',message:''}
            }
        }
    }
}
</script>