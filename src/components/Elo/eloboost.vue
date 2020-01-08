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
                                @dataNome="atualName"  
                                @dataId="atualId"  
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
                                @dataNome="desejadoName" 
                                @dataId="desejadoId" 
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
            <div class="row mt-5 mb-5 justify-content-center">
                <div class="col-md-8">
                    <div v-if="this.$store.getters.getShow">
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
                    <div v-if="updateButton">
                        <div v-if="!this.$store.getters.getShow" class="spinner-border text-success center-img" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import './style.css'
import Select from './component/select.vue';
import Modal from '../Modal/modal-login.vue'
import router from '../../routes';
import eloId from '../../helper/elos';

export default {
    data(){
        return{
            goto:{page:'eloboost',status:true},
            selectNameDesejado:'Ferro',
            selectPosDesejado:'IV',
            selectNameAtual:'Ferro',
            selectPosAtual:'IV',
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
            updateButton:false,
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
    mounted(){
        if(this.$store.getters.getShow){
            this.updateButton=false
        }
    },
    computed: {
        returnElo(){
            this.formData.value=`${this.$store.getters['getEloBoost'].value}.00`
            this.formData.days=this.$store.getters['getEloBoost'].days
            return this.$store.getters['getEloBoost']
        }
    },
    methods:{
        atualName(value){
            this.selectNameAtual=value
        },
        atualId(value){
            this.selectPosAtual=value
        },
        desejadoName(value){
            this.selectNameDesejado=value;
        },
        desejadoId(value){
            this.selectPosDesejado=value
        },
        seleciona(){
            this.$store.commit('confirmOrderMutation',this.formData)
        },
        confirm(){
            const respAtual=`${this.selectNameAtual}${this.selectPosAtual}`
            const respDesejado=`${this.selectNameDesejado}${this.selectPosDesejado}`
            const result1=eloId.value(respAtual).shift()
            const result2=eloId.value(respDesejado).shift()
            this.numAtual=result1.id
            this.numDesejado=result2.id
            if(this.numAtual<this.numDesejado){
                this.formData.description=`Atual: ${this.selectNameAtual} ${this.selectPosAtual} para Desejado: ${this.selectNameDesejado} ${this.selectPosDesejado}`
                this.button=false 
                const data={currentElo:respAtual,requiredElo:respDesejado}
                this.updateButton=true
                this.$store.dispatch('sendEloBoost',data)
            }else{
                this.$noty.warning('O ELO desejado deve ser maior que o atual')
                this.button=true
                this.$store.commit("closeShowMutation")
                this.updateButton=false
            }
        }
    },
    destroyed(){
        this.numAtual=this.numDesejado=1
        this.updateButton=false
        this.fim=this.inicio='FerroIV',
        this.formData={value:'',tipo:'ELOBOOST',description:'',days:''}
        this.$store.commit("closeShowMutation")
        this.$store.commit('deslogadoMutation')
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>