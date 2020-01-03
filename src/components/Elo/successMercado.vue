<template>
    <div class="topo">

        <div class="container">
            <div class="row">
                <div class="col">
                    <h1 class="text-center text-information">Pagamento confirmado</h1>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card border-success mb-3">
                        <div class="text-center mt-5 mb-5">
                            <i class="far fa-smile-beam color-value fa-4x animated bounce infinite"></i>
                        </div>
                        <div class=" text-center text-payment color-value">Seu pagamento foi confirmado com sucesso!</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './style.css'
import router from '../../routes';

export default {
    data(){
        return{
            query:'',
            token:'',
            payerid:'',
            transition:''
        }
    },
    methods: {
        
    },
    created(){
        this.collection_id=this.$route.query.collection_id
        this.collection_status=this.$route.query.collection_status
        this.$store.dispatch('endMercadoPago',this.collection_id)
        // setTimeout(()=>{
        //     router.push('/dashboard')
        // },3000)
    },
    mounted(){
        this.$store.commit("changeStatusFooter",false)
    },
    beforeDestroy(){
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>