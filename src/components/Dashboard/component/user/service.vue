<template>
    <div>
        <h3 class="text-center text-information">Você ainda não tem nenhum pedido</h3>
        <h4 class="text-center">Contrate um dos nossos planos</h4>
        <hr>  
        <div class="row justify-content-around mb-5">
            <div class="col-sm-5 col-md-5">
                <div class="card shadow">
                <div class="card-body">
                    <h4 class="card-title text-center">ELO BOOST</h4>
                    <div class="card mb-4 height-card">
                        image
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" @click="page('eloboost')">Contratar</button>
                </div>
                </div>
            </div>
            <div class="col-sm-5 col-md-5">
                <div class="card shadow">
                <div class="card-body">
                    <h4 class="card-title text-center">ELO COACH</h4>
                    <div class="card mb-4 height-card">
                        image
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" @click="page('elocoach')">Contratar</button>
                </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import router from '../../../../routes';
export default {
    data(){
        return{
            
        }
    },
    methods:{
        page(element){  
            router.push(`/${element}`)
        }
    }
}    
</script>