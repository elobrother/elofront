<template>
    <div>
        <div class="modal fade" id="detalhe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" data-backdrop="static">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Jogador</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="display=true" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body" v-if="display">
                  <div class="row">
                    <div class="col">
                        <h4><span class="text-modal-detail"><i class="fas fa-signature"></i> Nome:</span> <span style="color:#666"><strong> {{person[0].name ||''}}</strong></span></h4>
                        <hr> 
                        <h4><span class="text-modal-detail"><i class="fas fa-at"></i> E-mail:</span> <span style="color:#666"><strong>{{person[0].email||''}}</strong></span></h4>
                        <hr> 
                        <h4><span class="text-modal-detail"><i class="fas fa-phone"></i> Telefone:</span> <span style="color:#666"><strong>{{person[0].phoneNumber||''}}</strong></span></h4>
                        <hr>
                        <div class="card card-board" v-if="person[0].bankAccount">
                          <h5 class="text-modal-detail text-center mt-1 mb-2">Dados Bancários</h5>
                          <p class="text-center">Nome Completo: <strong>{{person[0].bankAccount.fullName}}</strong></p> 
                          <p class="text-center">CPF: <strong>{{person[0].bankAccount.cpf}}</strong></p> 
                          <p class="text-center">Agência: <strong>{{person[0].bankAccount.agency}}</strong></p> 
                          <p class="text-center">ContaCorrente: <strong>{{person[0].bankAccount.account}}</strong></p> 
                        </div>
                        <div v-if="!person[0].bankAccount">
                          <p class="text-center">{{person[0].name |''}} ainda não atualizou os dados bancários</p>
                        </div>
                        <button class="btn btn-block btn-outline-danger mt-2" @click="display=!display">Excluir Jogador</button>
                    </div>
                  </div>  
              </div>
              <div class="modal-body" v-if="!display">
                <h4 class="text-center mb-4">Deseja realmente excluir {{person[0].name}}?</h4>
                <div class="row justify-content-center">
                  <div class="col-6">
                    <span class="btn btn-outline-danger cursor" @click="display=!display">Cancelar</span>
                    <span class="btn btn-outline-success cursor ml-4" data-dismiss="modal" @click="remove(person[0]._id)">Sim, excluir</span>
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
          display:true
        }
    },
    computed:{
        person(){
            return this.$store.getters['getOnePlayer']
        },
    },
    methods: {
      remove(id){
        this.display=true
        this.$store.dispatch('removePlayer',id)
      },
    },
}
</script>