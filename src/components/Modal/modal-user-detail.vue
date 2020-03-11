<template>
    <div>
        <div class="modal fade" id="detalhe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Usuário</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row">
                    <div class="col">
                        <h4><span class="text-modal-detail"><i class="fas fa-signature"></i> Nome:</span> <span style="color:#666"><strong> {{person[0].name ||''}}</strong></span></h4>
                        <hr> 
                        <h4><span class="text-modal-detail"><i class="fas fa-at"></i> E-mail:</span> <span style="color:#666"><strong> {{person[0].email||''}}</strong></span></h4>
                        <hr> 
                        <h4><span class="text-modal-detail"><i class="fas fa-phone"></i> Telefone:</span> <span style="color:#666"><strong> {{person[0].phoneNumber||''}}</strong></span></h4>
                        <!-- <hr>  -->
                        <!-- <h4 class="text-modal-detail">Pedidos: {{person[0].pedidos.count || ''}}</h4> -->
                        <!-- <hr>  -->
                        <!-- <p class="text-modal-detail">Entrou na plataforma: 11/11/19</p>  -->
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
    computed:{
        person(){
            return this.$store.getters['getOneUser']
        }
    },
    methods:{
        
    }
}
</script>
