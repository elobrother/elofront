<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Relatório</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <div class="alert alert-primary">
                    <h2 class="text-center"><i class="fas fa-users"></i> Usuários</h2>
                    
                    <animated-number
                        style="font-size:30px; font-weight:bold;"
                        :value="counter.userClient"
                        :formatValue="formatToPrice"
                        :duration="300"
                    />
                </div>
            </div>
            <div class="col">
                <div class="alert alert-primary">
                    <h2 class="text-center"><i class="fas fa-user-astronaut"></i> Jogadores</h2>
                    
                    <animated-number
                        style="font-size:30px; font-weight:bold;"
                        :value="counter.userPlayer"
                        :formatValue="formatToPrice"
                        :duration="450"
                    />
                </div>
            </div>
            <div class="col">
                <div class="alert alert-primary">
                    <h2 class="text-center"><i class="fas fa-list"></i> Pedidos</h2>
                        <animated-number
                            style="font-size:30px; font-weight:bold;"
                            :value="counter.order"
                            :formatValue="formatToPrice"
                            :duration="300"
                        />
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                 <div class="alert alert-primary">
                    <h2 class="text-center"><i class="fas fa-ticket-alt"></i> Cupons</h2>
                        <animated-number
                            style="font-size:30px; font-weight:bold;"
                            :value="counter.cupom"
                            :formatValue="formatToPrice"
                            :duration="300"
                        />
                </div>
            </div>
            <div class="col">
                 <div class="alert alert-primary">
                    <h2 class="text-center"><i class="fas fa-trash"></i> Desistências</h2>
                        <animated-number
                            style="font-size:30px; font-weight:bold;"
                            :value="counter.dropouts"
                            :formatValue="formatToPrice"
                            :duration="300"
                        />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
    data(){
        return{
            desistencias: 0,
        }
    },
    components: {
        AnimatedNumber
    },
    computed: {
        counter(){return this.$store.getters['getRelatory']},
        // users(){ return this.$store.getters['getAllUsers'].length },
        // players(){ return this.$store.getters['getAllPlayers'].length},
        // products(){return this.$store.getters['getOrders'].length },
        // cupoms(){return this.$store.getters['getCupoms'].length },
        // drop(){return this.$store.getters['getDropout'].length },
    },
    methods: {
        formatToPrice(value) {
            return `<p class="text-center"> ${value.toFixed(0)}</p>`;
        }
    },
    created(){
        this.$store.dispatch('allRelatory')
    }
    
}
</script>