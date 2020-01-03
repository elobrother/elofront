<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Alterar senha</h3>
                <hr>
            </div>
        </div>   
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg" for="inputLarge">Nova senha</label>
                            <input class="form-control form-control-lg" type="password" v-model="password">
                        </div>
                    </div>    
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg" for="inputLarge">Confirmar senha</label>
                            <input class="form-control form-control-lg" type="password" v-model="newPassword">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-success btn-lg btn-block mt-3 mb-3" @click="updateUser()">Salvar</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    data(){
        return{
            password:'',
            newPassword:''
        }
    },
    methods: {
        updateUser(){
            if(this.password==this.newPassword){
                this.$store.dispatch('account',{password:this.newPassword,type:'password'})
            }else{
                this.$noty.warning('As senhas devem ser iguais!')
            }
        }
    },
}
</script>
