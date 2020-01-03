<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Ranking</h3>
                <hr>
            </div>
        </div>    
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="row">
                        <div class="col mt-2">
                            <div class="text-center">
                                <img :src="require('@/assets/iron/iron_IV.png')" class="img-fluid" alt="iron_IV" height="70" width="70"/>
                                <i class="fas fa-long-arrow-alt-right fa-2x" style="color:#4c5870;"></i> 
                                <img :src="require('@/assets/iron/iron_I.png')" class="img-fluid" alt="iron_I" height="70" width="70"/> 
                            </div>
                        </div>
                    </div>
                    <div class="row">    
                        <div class="col mt-2">
                            <div class="text-center">
                                <div style="display:block" class="margin-top-10">
                                    <h2>Status: <strong>Jogando</strong></h2>
                                </div>
                                <div style="display:none" class="margin-top-10">
                                    <h2><i class="fas fa-rocket text-warning"></i>  <span class="text-info-elo">Seu elo subiu de nível</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>