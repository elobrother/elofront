<template>
    <div class="topo">

        <Modal :data="formData" />

        <div class="container">
            <div class="row margin-top-160">
                <div class="col">
                    <h1 class="text-center text-information">Escolha um dos nossos pacotes</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-12">
                    <div class="card bronze-color mb-3 shadow-lg">
                        <div class="card-header text-white text-information">
                            Nível Bronze - R$ {{getValor[0].value}}.00 /AULA
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-8 col-md-8">
                                    <div class="text-white">
                                        <h3>Para jogadores iniciante</h3>
                                        <p>Temas abordados: principais heróis de cada rota, builds, builds situacionais, fase de rotas, talentos, páginas de runas, utilização do mapa e farm.</p>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4 col-md-4">
                                    <button 
                                        class="btn btn-success button-choice btn-lg btn-block" 
                                        @click="select('item1',getValor[0].value)"
                                    >
                                        {{bronze.item1}}
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2" v-if="this.bronze.item1=='Selecionado'">
                                <div class="col-12 col-md-5">
                                    <select class="custom-select select-custom" v-model="aula1" @click="updateDays(aula1,getValor[0].value)">
                                        <option value="1">Quantidade de aulas</option>
                                        <option value="1">1 aula</option>
                                        <option value="2">2 aulas</option>
                                        <option value="3">3 aulas</option>
                                        <option value="5">5 aulas</option>
                                        <option value="10">10 aulas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card platinum-color mb-3 shadow-lg">
                        <div class="card-header text-black text-information">
                            Nível Platina - R$ {{getValor[1].value}}.00 /AULA
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-8 col-md-8">
                                    <div class="text-black">
                                        <h3>Para jogadores intermediários</h3>
                                        <p>Temas abordados: counter-picks, posicionamento e foco em team fight e late Game, kiting, ganks, roaming, zoning, lidar com jogadores ragers no chat, disputa de visão e objetivos globais.</p>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4 col-md-4">
                                    <button
                                     class="btn btn-success button-choice btn-lg btn-block"
                                     @click="select('item2',getValor[1].value)"
                                    >
                                        {{platina.item2}}
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2" v-if="this.platina.item2=='Selecionado'">
                                <div class="col-5">
                                    <select class="custom-select select-custom" v-model="aula2" @click="updateDays(aula2,getValor[1].value)">
                                        <option value="1">Quantidade de aulas</option>
                                        <option value="1">1 aula</option>
                                        <option value="2">2 aulas</option>
                                        <option value="3">3 aulas</option>
                                        <option value="5">5 aulas</option>
                                        <option value="10">10 aulas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card diamond-color mb-3 shadow-lg">
                        <div class="card-header text-white text-information">
                            Nível Diamante - R$ {{getValor[2].value}}.00 /AULA
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-8 col-md-8">
                                    <div class="text-white">
                                        <h3>Para jogadores avançados</h3>
                                        <p>Temas abordados: ShoutCaller de objetivos para seu time, como obter e distribuir vantagem entre seu time após ganhar a lane, mapear a selva inimiga, roaming avançado e mais.</p>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4 col-md-4">
                                    <button 
                                        class='btn btn-success button-choice btn-lg btn-block'
                                        @click="select('item3',getValor[2].value)"
                                    >
                                        {{diamante.item3}}
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-2" v-if="this.diamante.item3=='Selecionado'">
                                <div class="col-5">
                                    <select class="custom-select select-custom" v-model="aula3" @click="updateDays(aula3,getValor[2].value)">
                                        <option value="1">Quantidade de aulas</option>
                                        <option value="1">1 aula</option>
                                        <option value="2">2 aulas</option>
                                        <option value="3">3 aulas</option>
                                        <option value="5">5 aulas</option>
                                        <option value="10">10 aulas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div v-if="display">
                        <button 
                            v-if="formData.value!='0.00'"
                            :class="btn.enable" 
                            @click="confirm()"
                        >
                            Total: R$ {{formData.value}} - Confirmar Pedido
                        </button>
                    </div>
                    <div v-else>
                        <button 
                            v-if="formData.value!='0.00'"
                            :class="btn.enable" 
                            data-toggle="modal" data-target="#authentication"
                        >
                            Total: R$ {{formData.value}} - Confirmar Pedido
                        </button>
                    </div>
                    <button 
                        v-if="formData.value=='0.00'"
                        :class="btn.disable" 
                        @click="confirm()"
                    >
                        Total: R$ 0,00 - Confirmar Pedido
                    </button>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    </div>
</template>

<script>
import './style.css'
import Modal from '../Modal/modal-login.vue'

export default {
    data(){
        return{
            goto:{
                page:'elocoach',
                status:true
            },
            bronze:{
                item1:'selecionar',
                valor:'25.00'
            },
            platina:{
                item2:'selecionar',
                valor:'30.00'
            },
            diamante:{
                item3:'selecionar',
                valor:'35.00'
            },
            btn:{
                enable:'btn btn-danger shadow-lg button-confirm btn-lg btn-block',
                disable:'btn btn-secondary shadow-lg button-confirm btn-lg btn-block'
            },
            total:'0.00',
            formData:{
                tipo:'ELOCOACH',
                value:'0.00',
                description:'',
                days:'1'
            },
            aula1:'1',
            aula2:'1',
            aula3:'1',
            display:localStorage.getItem('id')
        }
    },
    components:{
        Modal
    },
    computed: {
        getValor(){
            console.log(this.$store.getters['getEloCoach'])
            return this.$store.getters['getEloCoach']
        }
    },
    created() {
        this.$store.commit("changeStatusFooter",false)
        // this.$store.commit("changeStatusMutation",this.goto) 
        this.$store.dispatch("elocoach")
    },
    methods:{
        select(event,valor){
            if(event=='item1'){
                this.bronze.item1='Selecionado'
                this.platina.item2=this.diamante.item3='selecionar'
                this.formData.value=`${valor}.00`
                this.formData.days='1'
                this.formData.description='Bronze'
            }
            if(event=='item2'){
                this.platina.item2='Selecionado'
                this.bronze.item1=this.diamante.item3='selecionar'
                this.formData.value=`${valor}.00`
                this.formData.days='1'
                this.formData.description='Platina'
            }
            if(event=='item3'){
                this.diamante.item3='Selecionado'
                this.platina.item2=this.bronze.item1='selecionar'
                this.formData.value=`${valor}.00`
                this.formData.days='1'
                this.formData.description='Diamante'
            }
        },
        confirm(){
            if(this.formData.value.length>4){
                this.$store.commit('confirmOrderMutation',this.formData)
            }else{
                this.$noty.warning('Selecione um serviço')
            }
        },
        updateDays(qtd,value){
            if(this.formData.days!=qtd){
                this.formData.days=qtd
                this.formData.value=`${parseFloat(value)*parseInt(this.formData.days)}.00`
            }
        }
        
    },
    destroyed(){
        this.$store.commit("changeStatusFooter",true)
        this.$store.commit('deslogadoMutation')
        this.formData={tipo:'ELOCOACH',value:'0.00',description:'',days:'1'}
    }
}
</script>