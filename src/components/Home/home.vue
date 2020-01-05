<template>
    <div>
        <Modal/>
        <div style="height:100vh" class="fundo-video">
            <video autoplay loop class="bg_video" muted style="position:absolute;width:100%; z-index:-1;">
                <source src="@/assets/video.mp4" type="video/mp4">
            </video>
            <div >
                <div id="home" >            
                <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="height-text-button">
                                    <h2 class="text-center text-information-white">Necessitando de ajuda para subir de elo?</h2>
                                    <button style="height:70px" class="btn btn-success btn-lg btn-block" v-scroll-to="'#services'">
                                        Clique aqui e conheça nossos serviços
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Modal from '../Modal/modal-info.vue';
import router from '../../routes';
export default {
    data(){
        return{
            display:true,
            goto:{
                page:'servicos',
                status:true
            },
            message:null
        }
    },
    components:{
        Modal,
    },
    methods: {
        close(){
            this.display=false;
        },
        servicos(){
            this.$store.commit('goToServicesMutation')
            // router.push('/servicos').catch(err => {})
        }
    },
    mounted(){
        this.message=this.$store.getters['getErrorMsg']
    }
}



</script>