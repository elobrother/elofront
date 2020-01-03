<template>
    <div>
        <div class="modal fade" id="detalhe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Dados do jogador</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row mb-3">
                      <div class="col">
                        <!-- <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1"  v-model="check1" value="Chat Offline">
                            <label class="custom-control-label" for="customCheck1"><span class="text-modal-detail">Ver Login e Senha do usuário</span></label>
                        </div> -->
                        <button class="btn btn-primary" @click="request()">Obter senha do usuário no LoL</button>
                        <div class="form-group">
                            <h5><i class="fas fa-user"></i> Login: <span class="color-info">{{playerName}}</span></h5>    
                            <h5 v-if="check1"><i class="fas fa-key"></i> Senha: <span class="color-info">{{playerPassword}}</span></h5>    
                        </div>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <h4 class="text-modal-detail">Status do progresso do pedido</h4>
                            <select class="custom-select" v-model="status">
                                <option value="PARALISADO">Paralisado</option>
                                <option value="EM ANDAMENTO">Em andamento</option>
                                <option value="CONCLUIDO">Concluido</option>
                            </select>
                        </div>
                    </div> 
                  </div>
                  <div class="row">
                      <div class="col">
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
    props:['id','playerName','playerPassword'],
    data(){
        return {
            status:'',
            check1:false,
        }
    },
    computed:{
        usuario(){
            let user=this.$store.getters['getUser']
            return user;
        },
        playerPassword(){
            return this.$store.getters['getPlayerPassword']
        }
    },
    methods:{
        send(){
            const obj=Object.assign({status:this.status,id:this.id})
            this.$store.dispatch('updateStatus',obj)
        },
        request(){
            this.$store.dispatch('requestUserData',this.id)
        }
    }
}
</script>