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
            payerid:''
        }
    },
    methods: {
        
    },
    created(){
        this.query=this.$route.query.paymentId
        this.token=this.$route.query.token
        this.payerid=this.$route.query.PayerID
        const data={'paymentId':this.query,'payerId':this.payerid}
        console.log(data)
        this.$store.dispatch('endPayPal',data)
        // setTimeout(()=>{
        //     router.push('/dashboard')
        // },3000)
    },
    mounted(){
        this.$store.commit("changeStatusFooter",false)
        // this.transition=this.$router.query.transition
    },
    beforeDestroy(){
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>