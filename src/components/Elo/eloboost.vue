<template>
    <div class="topo">
        <Modal :data="formData" />
        <div class="container">
            <div class="row margin-top-160">
                <div class="col">
                    <h1 class="text-center text-information">Faça sua escolha</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="card text-white bg-secondary mb-3 shadow-lg">
                        <div class="card-header text-center text-information">Elo atual</div>
                        <div class="card-body"> 
                            <Select
                                :boost="boost" 
                                :name="selectNameAtual" 
                                :pos="selectPosAtual" 
                                @data="atual"  
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="card text-white bg-secondary mb-3 shadow-lg">
                        <div class="card-header text-center text-information">Elo desejado</div>
                        <div class="card-body">
                            <Select 
                                :boost="boost" 
                                :name="selectNameDesejado" 
                                :pos="selectPosDesejado"
                                @data="desejado" 
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-md-4">
                    <button class="btn btn-primary btn-block button-validate" @click="confirm()">Confirmar ELOs</button>
                </div>
            </div> 
            <div class="row mt-5 mb-5">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div v-if="show">
                        <button v-if="display"
                            class="btn btn-success shadow-lg button-confirm btn-lg btn-block"
                            @click="seleciona()"
                        >
                            Total: R$ {{returnElo.value}}.00 - {{returnElo.days}} dias - Avançar
                        </button>
                        <button v-else
                            class="btn btn-success shadow-lg button-confirm btn-lg btn-block mb-5"
                            data-toggle="modal" data-target="#authentication" 
                        >
                            Total: R$ {{returnElo.value}}.00 - {{returnElo.days}} dias - Avançar
                        </button>
                    </div> 
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    </div>
</template>

<script>
import './style.css'
import Select from './component/select.vue';
import Modal from '../Modal/modal-login.vue'
import router from '../../routes';
import config from '../../helper/config';
import eloId from '../../helper/elos';

export default {
    data(){
        return{
            goto:{page:'eloboost',status:true},
            selectNameDesejado:'Ferro',
            selectPosDesejado:'Selecione',
            selectNameAtual:'Ferro',
            selectPosAtual:'Selecione',
            boost:{
                names:[
                    {state:'Ferro'},
                    {state:'Bronze'},
                    {state:'Prata'},
                    {state:'Ouro'},
                    {state:'Platina'},
                    {state:'Diamante'},
                ],
                positions:[
                    {state:'Selecione'},
                    {state:'IV'},
                    {state:'III'},
                    {state:'II'},
                    {state:'I'},
                ]
            },
            formData:{
                value:'',
                tipo:'ELOBOOST',
                description:'',
                days:''
            },
            display:localStorage.getItem('id'),
            inicio:'FerroIV',
            numAtual:1,
            fim:'FerroIV',
            numDesejado:1,
            button:false,
            order:null,
            show:false,
            currentElo:null,
            requiredElo:null
        }
    },
    components:{
        Select,
        Modal
    },
    created() {
        // this.$store.commit("changeStatusMutation",this.goto) 
        this.$store.commit("changeStatusFooter",false)
    },
    computed: {
        returnElo(){
            this.formData.value=`${this.$store.getters['getEloBoost'].value}.00`
            this.formData.days=this.$store.getters['getEloBoost'].days
            return this.$store.getters['getEloBoost']
        }
    },
    methods:{
        atual(value){
            this.selectNameAtual=value.stage;
            this.selectPosAtual=value.level;
            this.inicio=`${this.selectNameAtual}${this.selectPosAtual}`
            this.currentElo=this.inicio
            const resp=eloId.value(this.inicio).shift()
            this.inicio=null
            this.numAtual=resp.id
        },
        desejado(value){
            this.selectNameDesejado=value.stage;
            this.selectPosDesejado=value.level;
            this.fim=`${this.selectNameDesejado}${this.selectPosDesejado}`
            this.requiredElo=this.fim
            const resp= eloId.value(this.fim).shift()
            this.fim=null;
            this.numDesejado=resp.id
            this.order=`Atual: ${this.selectNameAtual} ${this.selectPosAtual} para Desejado: ${this.selectNameDesejado} ${this.selectPosDesejado}`
        },
        seleciona(){
            console.log(this.formData)
            this.$store.commit('confirmOrderMutation',this.formData)
        },
        confirm(){
            if(this.numAtual<this.numDesejado){
                this.numAtual=1
                this.numDesejado=1
                this.formData.description=this.order 
                this.selectNameDesejado='Ferro',
                this.selectPosDesejado='Selecione',
                this.selectNameAtual='Ferro',
                this.selectPosAtual='Selecione',
                this.button=false 
                const data={currentElo:this.currentElo,requiredElo:this.requiredElo}
                this.$store.dispatch('sendEloBoost',data)
                this.show=true
            }else{
                this.$noty.warning('O ELO desejado deve ser maior que o atual')
                this.button=true
                this.show=false
            }
        }
    },
    destroyed(){
        this.numAtual=this.numDesejado=1
        this.fim=this.inicio='FerroIV',
        this.formData={value:'',tipo:'ELOBOOST',description:'',days:''}
        this.$store.commit('deslogadoMutation')
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>