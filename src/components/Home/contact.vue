<template>
    <div>
        <div id="contact" style="background: linear-gradient(to bottom left, #51a945 7%, #669999 100%);">
            <div class="container space-bottom space-top">
                <div class="row" v-scroll-reveal.reset={delay:250}>
                    <div class="col">
                        <h2 class="text-center mt-5 white-text">Entre em contato conosco</h2>
                        <hr class="underline-white mb-5"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <!-- <div class="alert mt-1 alert-dismissible alert-primary" v-scroll-reveal.reset={delay:350}>
                            <div class="row">
                                <div class="col-2 col-md-2">
                                    <i class="fab fa-whatsapp fa-4x"></i>
                                </div>
                                <div class="col-10 col-md-8 ml-5">
                                    <strong>WHATSAPP EM HORÁRIO COMERCIAL</strong>
                                    <p>(00) 0000-0000</p>
                                </div>
                            </div>
                        </div> -->
                        <div class="alert alert-dismissible alert-secondary" v-scroll-reveal.reset={delay:450}>
                            <div class="row">
                                <div class="col-4">
                                    <i class="fas fa-envelope-open-text fa-4x"></i>
                                </div>
                                <div class="col-8">
                                    <strong>E-MAIL</strong>
                                    <p>MEU@MAIL.COM</p>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-dismissible alert-secondary" v-scroll-reveal.reset={delay:550}>
                            <div class="row">
                                <div class="col-4">
                                    <i class="far fa-clock fa-4x"></i>
                                </div>
                                <div class="col-8">
                                    <strong>HORÁRIO DE ATENDIMENTO</strong>
                                    <p>SEG-DOM 9H-23H</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <div class="form-group" v-scroll-reveal.reset={delay:550}>
                            <input class="form-control form-control-lg" type="text" placeholder="Nome" id="contact" v-model="formData.name">
                        </div>
                        <div class="form-group" v-scroll-reveal.reset={delay:650}>
                            <input class="form-control form-control-lg" type="text" placeholder="Email" id="contact" v-model="formData.email">
                        </div>
                        <div class="form-group" v-scroll-reveal.reset={delay:750}>
                            <textarea class="form-control form-control-lg" placeholder="Mensagem" id="contact" rows="5" v-model="formData.message"></textarea>
                        </div>
                        <div v-scroll-reveal.reset={delay:750} style="z-index:10">
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