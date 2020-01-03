<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Desistências</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <span class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Nome do jogador" v-model="element">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">Buscar</button>
                </span>
                <div v-if="dropout.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <div id="accordion" v-for="(drop,index) in dropout" :key="index">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <span class="nav-item cursor" data-toggle="collapse" @click="makeHash(index)">
                                    Nome: {{drop.user.name}} - Tipo: {{drop.order.tipo}} 
                                    </span>
                                </h5>
                            </div>
                            <div v-if="hash==index" data-parent="#accordion">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <strong>E-mail:</strong> {{drop.user.email}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <strong>Motivo da desistência:</strong> {{drop.description}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="dropout.length==0">
                    <p class="text-center">Não há desistências</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
export default {
    data(){
        return{
            load:false,
            element:'',
            hash:''
        }
    },
    computed:{
        dropout(){
            console.log(this.$store.getters['getDropout'])
            return this.$store.getters['getDropout']
        }
    },
    methods:{
        search(){
            this.load=true
            this.$store.commit('dropoutsMutation',this.element)
        },
        makeHash(index){
            this.hash=index
        }
    },
    created(){
        this.$store.dispatch('getAllDropout')
    },
    destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>