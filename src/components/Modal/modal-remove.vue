<template>
<div>
    
    <div class="modal fade" id="remove" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Tem certeza que deseja remove esse pedido?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-justify text-modal-detail">
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <button class="btn btn-block btn-danger" data-dismiss="modal">Cancelar</button>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-block btn-success" data-dismiss="modal" @click="remove()">Excluir</button>
                        </div>
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
    methods:{
        remove(id){
            this.$store.dispatch('removeOrder',id)
        }
    }
}
</script>