<template>
    <div class="topo">
        <div class="container">
            <div class="row margin-top-100">
                <div class="col justify-content-center">
                    <h3 class="text-center text-information">Nossos serviços</h3>
                </div>
            </div>
            <div class="row space-bottom justify-content-around margin-bottom-135">
                <div class="col-sm-4 col-md-4">
                    <div class="border-card shadow-sm shadow-hover" v-scroll-reveal.reset={delay:350}>
                        <div class="card-body">
                            <h4 class="card-title text-center text-modal-detail">ELOBOOST</h4>
                            <div class="mb-4 height-card">
                                <img id="card-img" src="@/assets/boost.png" alt="" class="img-fluid center-img" style="height:200px">
                            </div>
                            <span class="text-info-elo center-img"></span>
                            <p class="text-info-elo text-center">NÓS JOGAREMOS COM A SUA CONTA</p>
                            <button type="button" class="btn btn-success btn-lg btn-block" @click="page('eloboost')">Contratar</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-4">
                    <div class="border-card shadow-sm shadow-hover" v-scroll-reveal.reset={delay:450}>
                        <div class="card-body">
                            <h4 class="card-title text-center text-modal-detail">MD10</h4>
                            <div class="mb-4 height-card">
                                <img id="card-img" src="@/assets/md10.png" alt="" class="img-fluid center-img" style="height:200px">
                            </div>
                            <p class="text-info-elo text-center">Defina seu elo com as 10 primeiras partidas</p>
                            <button type="button" class="btn btn-success btn-lg btn-block" @click="page('md10')">Contratar</button>
                            <!-- <router-link class="btn btn-success btn-lg btn-block" to="/md10">Contratar</router-link> -->
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-4">
                    <div class="border-card shadow-sm shadow-hover" v-scroll-reveal.reset={delay:550}>
                    <div class="card-body">
                        <h4 class="card-title text-center text-modal-detail">ELOCOACH</h4>
                        <div class=" mb-4 height-card">
                            <img src="@/assets/coach.png" alt="" class="img-fluid center-img" style="height:200px">
                        </div>   
                        <p class="text-info-elo text-center">Suba de elo com a ajuda dos nossos instrutores</p>
                        <button type="button" class="btn btn-success btn-lg btn-block" @click="page('elocoach')">Contratar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './style.css'
    import router from '../../routes';
    export default {
        data(){
            return{
                goto:{
                    page:'servicos',
                    status:true
                }
            }
        },
        methods:{
            page(element){    
                this.goto.page=element
                this.$store.commit("changeStatusMutation",this.goto)  
            }
        },
        created() {
            // this.$store.commit("changeStatusMutation",this.goto) 
        }
    }
</script>