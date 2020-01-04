<template>
    <div>
        <div class="modal fade" id="detalhe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo"><span class="text-modal-detail">Código do produto:</span> <strong>{{order.code}}</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row">
                    <div class="col">
                        <div class="form-group text-center">
                            <h3><span class="color-modal">Serviço: </span> <span class="text-modal-detail">{{order.tipo}}</span></h3>   
                            <h4><span class="color-modal">Descrição: </span> <span class="text-modal-detail">{{order.description}}</span></h4>
                            <h4><span class="color-modal">Preço: R$ </span> <span class="text-modal-detail">{{order.valor}}</span></h4>
                            <h4><span class="color-modal">Data de publicação: </span> <span class="text-modal-detail">{{moment(order.createdAt).format('DD/MM/YYYY')}}</span></h4>
                            <div class="card card-board">
                                <h4 class="text-center ">Adicional</h4>
                                <h5><span class="color-modal">Chat Offline: </span> <span class="text-modal-detail">{{order.additional.chatOffline ? 'Sim' :'Não'}}</span></h5>
                                <h5><span class="color-modal">Horário definido: </span> <span class="text-modal-detail">{{order.additional.timeToPlay ? 'Sim' :'Não'}}</span></h5>
                                <h5 v-if="order.additional.description!=''"><span class="color-modal">Descrição: </span> <span class="text-modal-detail">{{order.additional.description}}</span></h5>
                                <h5><span class="color-modal">Rotas: </span> <span class="text-modal-detail">{{order.additional.routes ? 'Sim' :'Não'}}</span></h5>
                            </div>
                        </div>
                    </div> 
                  </div>
                  <div class="row justify-content-center">
                      <div class="col-9">
                          <button class="btn pull-right btn-success ml-2" data-dismiss="modal" @click="getJob(order._id)">Pegar trabalho</button>
                          <button class="btn pull-right btn-danger" data-dismiss="modal">Deixar para outro jogador</button>
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
    props:['status'],
    data(){
        return {
            formData:{}
        }
    },
    computed:{
        order(){
            let order= this.$store.getters['getOneOrder']
            return order[0]
        }
    },
    methods:{
        getJob(id){
            this.$store.dispatch('selectJob',id)
        }
    }
}
</script>