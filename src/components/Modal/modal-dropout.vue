<template>
    <div>
        <div class="modal fade" id="desistir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Devolver serviço para o mural</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group">
                            <div class="form-group">
                                <p class="text-center text-modal-detail">Nos conte o motivo para a desistência</p>
                                <textarea class="form-control" id="exampleTextarea" rows="5" v-model="formData.description"></textarea>
                            </div>
                        </div>
                    </div> 
                  </div>
                  <div class="row justify-content-center">
                      <div class="col-10">
                          <button class="btn pull-right btn-primary btn-block" data-dismiss="modal" @click="confirm()">Confirmar Desistência</button>
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
    props:['playerId','productId'],
    data(){
        return {
            formData:{
                idUser:'',
                id:'',
                description:''
            }
        }
    },
    methods:{
        confirm(){
            if(this.formData.description==''){
                this.$noty.warning('Nos diga o motivo da desistência!')
            }else{
                this.formData.idUser=this.playerId
                this.formData.id=this.productId
                this.$store.dispatch('dropoutOrder',this.formData)
            }
        }
    }
}
</script>