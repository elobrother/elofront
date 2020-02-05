<template>
<div>
    

    <div class="modal fade" id="price" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Preços</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-justify text-modal-detail">
                    <div v-for="(price,index) in allPrices" :key="index">
                        <p>Tipo: {{price.type}} - Nome:{{price.name}} - Valor: {{price.value}}.00</p>
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
        return {

        }
    },
    computed:{
        allPrices(){
            return this.$store.getters['getPrices']
        }
    },
    mounted(){
        this.$store.dispatch('allPrice')
    }
}
</script>