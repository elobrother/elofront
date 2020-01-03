<template>
    <div>
        <div class="modal fade" id="cupom" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                    <h5 class="modal-title" id="TituloModalLongoExemplo">Novo cupom</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
              <div class="modal-body">
                  <div class="row justify-content-center">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Nome do cupom</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.name">
                        </div> 
                    </div> 
                    <div class="col-6">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Desconto em %</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.value" maxlength="2" placeholder="Exemplo: 15">
                        </div> 
                    </div> 
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Quando expira? (Em dias)</label>
                            <datepicker class="col-form-label col-form-label-lg" :format='format' v-model="formData.expirationTime"></datepicker>  
                            <!-- <input class="form-control form-control-lg" type="text" v-model="formData.expirationTime" placeholder="Exemplo: 10"> -->
                        </div> 
                    </div> 
                    <div class="col-6">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg">Quantidade</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.amount">
                        </div> 
                    </div> 
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success btn-lg center-img" data-dismiss="modal" @click="create()">Adicionar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
export default {
    data(){
        return {
            formData:{
                name:'',
                value:'',
                expirationTime:'',
                amount:''
            },
            format:'dd/MM/yyyy',
            today:moment().format('DD'),
            day:null
        }
    },
    components:{
        Datepicker
    },
    methods:{
        create(){
            this.formData.expirationTime=moment(this.formData.expirationTime).format('DD/MM/YYYY')
            this.day=this.formData.expirationTime.split('/')[0]
            if(this.formData.name==''&&this.formData.value==''&&
            this.formData.expirationTime=='Invalid date'&&this.formData.amount==''){
                this.$noty.error('Preencha todos os campos!')
            }else{
                if(!moment(this.today).isAfter(this.day)){
                    this.$noty.warning('O dia escolhido já passou!')
                }else{
                    this.$noty.success('Ta valendo')
                    this.$store.dispatch('createCupom',this.formData)
                }
            }
        }
    },
    destroyed(){
        this.formData={name:'',value:'',expirationTime:'',amount:''}
    }
}
</script>