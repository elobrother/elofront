<template>
    <div>
        <div class="modal fade" id="teste" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Novo Jogador</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Nome</label>
                            <input class="form-control form-control-lg" type="text" v-model.trim="formData.name">
                        </div>
                    </div> 
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">E-mail</label>
                            <input class="form-control form-control-lg" type="text" v-model.trim="formData.email">
                        </div>
                    </div> 
                  </div>
                  <!-- <div class="row">
                      <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Senha</label>
                            <input class="form-control form-control-lg" type="password" v-model="formData.password">
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Confirmar Senha</label>
                            <input class="form-control form-control-lg" type="password" v-model="confpass">
                        </div>
                      </div>
                  </div> -->
              </div>
              <div class="modal-footer">
                <!-- <button type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">Cancelar</button> -->
                <button type="button" class="btn btn-success btn-lg btn-block" data-dismiss="modal" @click="saveUser()">Adicionar</button>
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
            formData:{
                name:'',
                email:'',
                password:false,
                status:'JOGADOR',
            },
        }
    },
    methods:{
        saveUser(){
            if(this.formData.name=='' && this.formData.email==''){
                this.$noty.error('Preencha todos os campos!')
            }else{
                this.formData.email=this.formData.toLowerCase()
                this.$store.dispatch('addPlayer',this.formData)
            }
        }
    }
}
</script>