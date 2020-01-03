<template>
    <div class="topo">
        <Modal :data="formData" />
        <div class="container">
            <!-- <div class="row margin-top-160">
                <div class="col">
                    <h1 class="text-center text-information">Faça sua escolha</h1>
                </div>
            </div> -->
            <div class="row justify-content-center margin-top-160">
                <div class="col-8">
                    <div class="card text-white bg-secondary mb-3 shadow-lg">
                        <div class="card-header text-center text-information">Elo atual</div>
                        <div class="card-body"> 
                            <!-- <div class="row justify-content-center">
                                <div class="col-6">
                                     <img :src="require(`@/assets/iron/iron_IV.png`)" class="img-fluid center"/>
                                </div>
                            </div> -->
                            <div class="row justify-content-center mb-5">
                                <div class="col-8">
                                    <select class="custom-select select-custom" v-model="formData.description">
                                        <option key="UNRANKEDMD10">UNRANKED</option>
                                        <option value="FERROMD10">FERRO</option>
                                        <option value="BRONZEMD10">BRONZE</option>
                                        <option value="PRATAMD10">PRATA</option>
                                        <option value="OUROMD10">OURO</option>
                                        <option value="PLATINAMD10">PLATINA</option>
                                        <option value="DIAMANTEMD10">DIAMANTE</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-5 mb-4 margin-top-160">
                                <div class="col">
                                    <h4 class="text-center text-modal-detail">Quantidade de vitórias</h4>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <range-slider
                                        style="width:100%"
                                        min="1"
                                        max="10"
                                        step="1"
                                        v-model="sliderValue">
                                    </range-slider>
                                </div>
                                <div class="col-3"><h4 class="text-center" style="color:green"><strong>{{sliderValue}} {{sliderValue==1 ? 'Vitória':'Vitórias' }}</strong></h4></div>
                            </div> 
                            <div class="row mt-5 justify-content-center">
                                <div class="col-8">
                                    <button class="btn btn-primary btn-block button-validate" @click="select()">Confirmar ELOs</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div v-if="show">
                        <button v-if="display"
                            class="btn btn-success shadow-lg button-confirm btn-lg btn-block"
                            @click="confirm()"
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
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import Modal from '../Modal/modal-login.vue'
import router from '../../routes';

export default {
    data(){
        return{
            goto:{page:'md10',status:true},
            formData:{
                value:'',
                tipo:'MD10',
                description:'UNRANKEDMD10',
                days:''
            },
            display:localStorage.getItem('id'),
            button:false,
            order:null,
            show:false,
            sliderValue:4
        }
    },
    components:{
        Modal,
        RangeSlider
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
        select(){
            const data={eloName:this.formData.description,match:`${this.sliderValue}`}
            this.$store.dispatch('sendElo',data)
            this.show=true
        },
        confirm(){
            console.log(this.formData) 
            this.$store.commit('confirmOrderMutation',this.formData)
            this.show=false
        }
    },
    destroyed(){
        this.formData={value:'',tipo:'MD10',description:'',days:''}
        this.$store.commit("changeStatusFooter",true)
    }
}
</script>