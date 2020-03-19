<template>
    <div>
        <Atualizar :id="id" />

        <div class="modal fade" id="detalhe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo"><span class="text-modal-detail">Codigo do pedido: </span> <strong> {{product.code}}</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar" @click="cancel=true">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row justify-content-center" v-if="cancel">
                    <div class="col-10">
                      <div>
                        <h3><span class="color-modal">Tipo: </span> <span class="text-modal-detail">{{product.tipo}}</span></h3>
                        <h4><span class="color-modal">Status do jogo: </span> <span class="text-modal-detail">{{product.status}}</span></h4>
                        <h4><span class="color-modal">Status do pagamento: </span> <span class="text-modal-detail">{{product.paymentsStatus}}</span></h4>
                        <h4><span class="color-modal">Valor: </span> <span class="text-modal-detail">R$ {{product.valor}}</span></h4>
                        <h4><span class="color-modal">Descrição: </span> <span class="text-modal-detail">{{product.description}}</span></h4>
                        <button class="btn btn-primary" @click="seeName(product.userPlayer)">Ver Nome jogador</button>
                        <h4 v-if="admin && playerName && allowed">
                          <span class="color-modal">Jogador: </span>
                          <span class="text-modal-detail">
                            {{ playerName ? playerName[0].name  : 'Sem jogador' }}
                          </span>
                        </h4>
                      </div>
                    </div> 
                  </div>
                  <div class="row justify-content-center" v-if="!cancel">
                    <div class="col-10">
                      <h4 class="text-center mb-3">Ficamos tristes em saber que você quer desistir da compra. nos diga o motivo antes de prosseguir!</h4>
                      <div class="form-group">
                            <div class="form-group">
                                <textarea class="form-control" id="exampleTextarea" rows="5" v-model="motivo"></textarea>
                            </div>
                        </div>
                    </div>    
                  </div>
                  <div class="row justify-content-center mt-4" v-if="cliente">
                    <div class="col-10">
                      <span v-if="cancel" class="btn btn-block btn-danger" @click="giveup()">Desistir do pedido</span>
                      <button v-if="!cancel" class="btn btn-block btn-primary" data-dismiss="modal" @click="confirm(product.code)">Confirmar desistência</button>
                      <p v-if="!cancel" class="text-center mt-3 decoration-text cursor" @click="cancel=true">Voltar</p>
                    </div>
                  </div>
                  <div class="row justify-content-center mt-4" v-if="admin">
                    <div class="col-10">
                      <span class="btn btn-block btn-danger cursor" @click="refund(product._id)">Refund</span>
                    </div>
                  </div>

                  <div class="row justify-content-center mt-3">
                    <div class="col-10">
                      <button class="btn btn-primary btn-block" data-toggle="modal" data-dismiss="modal" data-target="#atualizarPedido" @click="getId(product._id)">Atualizar</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Atualizar from './modal-atualizar-pedido.vue'

export default {
    data(){
        return {
            user:'',
            cancel:true,
            orderCode:'',
            motivo:'',
            cliente:false,
            admin:false,
            id:'',
            player:false,
            playerId:null,
            allowed: false,
            teste: ''
        }
    },
    components:{
      Atualizar
    },
    computed:{
      product(){
        this.allowed = false;
        if(localStorage.getItem('mdfkwe_r')=='CLIENTE'){
          this.cliente = true;
          let order= this.$store.getters['getOneProduct']
          return order[0] || '';
        }
        if(localStorage.getItem('mdfkwe_r')=='ADMIN'){
          this.admin = true;
          let order= this.$store.getters['getOneOrder']
          return order[0] || '';
        }
        return false;
      },
      playerName(){
        return this.$store.getters['getPlayerName'];
      }
    },
    methods: {
      giveup(){
        this.cancel=false
      },
      confirm(code){
        if(this.motivo == '') {
          this.$noty.warning('Nos informe o motivo!')
        }else{
          const data = {'description':this.motivo,'orderCode':code,'email':localStorage.getItem('email')}
          this.$store.dispatch('cancelOrder',data)
        }
      },
      refund(orderId){
        this.$store.dispatch('goRefund',orderId)
      },
      getId(id){
        this.id = id
      },
      async seeName(id) {
        this.allowed = true;
        this.$store.dispatch('getPlayer',id)
      }
    },
    destroyed(){
      this.motivo=''
      this.allowed = false;
      this.cliente = false
      this.admin = false
    }
}
</script>