<template>
<div>

    <Price/>

    <div class="row">
        <div class="col">
            <h3 class="text-center text-information">Preços</h3>
            <hr>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-8">
            <button class="btn btn-lg btn-primary btn-block" data-toggle="modal" data-target="#price">Ver preços</button>    
        </div> 
    </div> 
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label class="col-form-label col-form-label-lg" for="inputLarge">Selecione o Elo</label>
                        <select class="custom-select mb-3" @change="update($event)">
                            <option value="#">Selecione</option>
                            <option value="eloboost">ELOBOOST</option>
                            <option value="elocoach">ELOCOACH</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div v-if="elo==='eloboost'" class="form-group">
                        <select class="custom-select mb-2" v-model="formData.name">
                            <option key="ferro">Ferro</option>
                            <option key="bronze">Bronze</option>
                            <option key="prata">Prata</option>
                            <option key="ouro">Ouro</option>
                            <option key="platina">Platina</option>
                            <option key="diamante">Diamante</option>
                        </select>
                    </div>
                    <div v-else-if="elo=='elocoach'" class="form-group">
                        <select class="custom-select mb-2" v-model="formData.name">
                            <option value="bronzecoach">Bronze</option>
                            <option value="platinacoach">Platina</option>
                            <option value="diamanteelocoach">Diamante</option>
                        </select>
                    </div>
                    <div v-else class="form-group">
                        <select class="custom-select mb-2">
                            <option>Selecione o Elo primeiro</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label class="col-form-label col-form-label-lg" for="inputLarge">Preço</label>
                        <input class="form-control form-control-lg" type="text" placeholder="Ex.: 15" v-model="formData.value">
                    </div>
                </div>
            </div>
        </div>
    </div>    
    <div class="row justify-content-center">
        <div class="col-8">
            <button class="btn btn-success btn-block btn-large mt-4 mb-4" @click="salvar()">Salvar</button>
        </div>
    </div>  
</div> 
</template>

<script>
import Price from '../../Modal/modal-price.vue'
export default {
    data(){
        return{
            formData:{
                name:'',
                value:''
            },
            elo:'',
        }
    },
    components:{
        Price
    },
    methods: {
        update(event){
            this.elo=event.target.value
            console.log(this.elo)
            this.formData.name=''
        },
        salvar(){
            if(this.formData.name==''||this.formData.name==''||this.formData.value==''){
                this.$noty.warning('Não pode haver campos vazios')
            }else{
                this.$store.dispatch('updatePrice',this.formData)
                this.formData={name:'Selecione',value:''}
                this.elo='#'
            }
        },
    },
}
</script>