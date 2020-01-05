<template>
    <div class="fundo">
        <div id="services" class=" green-screen">
            <div class="container">
                <div class="row space-bottom space-top" v-scroll-reveal.reset={delay:250}>
                    <div class="col">
                        <p class="text-center mt-5 white-text">Serviços</p>
                        <hr class="underline-white"/>
                    </div>
                </div>
                <div class="row justify-content-around">
                    <div class="col-sm-4 col-md-4">
                        <div class="border-card shadow-sm shadow-hover" v-scroll-reveal.reset={delay:350}>
                            <div class="card-body">
                                <h4 class="card-title text-center text-modal-detail">ELOBOOST</h4>
                                <div class="mb-4 height-card">
                                    <img id="card-img" src="@/assets/boost.png" alt="" class="img-fluid center-img" style="height:200px">
                                </div>
                                <span class="text-info-elo center-img"></span>
                                <p class="text-info-elo text-center">Nós jogaremos com a sua conta</p>
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
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-4">
                        <div class="border-card shadow-sm shadow-hover" v-scroll-reveal.reset={delay:550}>
                        <div class="card-body">
                            <h4 class="card-title text-center text-modal-detail">ELOCOACH</h4>
                            <div class=" mb-4 height-card">
                                <img src="@/assets/coach.png" alt="" class="img-fluid center-img animated bounce delay-3s" style="height:200px">
                            </div>   
                            <p class="text-info-elo text-center">Suba de elo com a ajuda dos nossos instrutores</p>
                            <button type="button" class="btn btn-success btn-lg btn-block" @click="page('elocoach')">Contratar</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row space-bottom"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../../routes';

    export default {
        data(){
            return{
                
            }
        },
        methods:{
            page(element){
                this.$store.commit('logadoMutation')
                // this.$store.commit('goToElosPageMutation',element)  
                router.push(`/${element}`)
            }
        }
    }
</script>
