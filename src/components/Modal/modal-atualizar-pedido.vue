<template>
    <div>
        <div class="modal fade" id="atualizarPedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Status do pagamento</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group">
                            <h4 class="text-modal-detail">Status do pagamento do pedido</h4>
                            <select class="custom-select" v-model="status">
                                <option value="AGUARDANDO">Aguardando</option>
                                <option value="APROVADO">Aprovado</option>
                                <option value="DEVOLVIDO">Devolvido</option>
                                <option value="RECUSADO">Recusado</option>
                            </select>
                        </div>
                    </div> 
                  </div>
                  <div class="row justify-content-center">
                      <div class="col-10">
                          <button class="btn pull-right btn-primary" data-dismiss="modal" @click="send()">Confirmar</button>
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
    props:['id'],
    data(){
        return {
            status:'',
        }
    },
    methods:{
        send(){
            const obj=Object.assign({status:this.status,id:this.id})
            this.$store.dispatch('updateStatusPayment',obj)
        },
    }
}
</script>