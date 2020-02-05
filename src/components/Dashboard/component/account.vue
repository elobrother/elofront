<template>
    <div>
        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Minha Conta</h3>
                <hr>
            </div>
        </div>    
        <div class="row justify-content-center"> 
            <div class="col-10">
                <input type="hidden" v-model="user.name">
                <div class="row justify-content-center">
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg" for="inputLarge">Nome</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.name">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg" for="inputLarge">E-mail</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.email">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="col-form-label col-form-label-lg" for="inputLarge">Celular</label>
                            <input class="form-control form-control-lg" type="text" v-model="formData.phoneNumber">
                        </div>
                    </div>
                </div>
                <div v-if="status=='JOGADOR'">
                    <hr>
                    <div class="row">
                        <div class="col">
                            <h3 class="text-center text-information">Dados de pagamento</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Nome completo</label>
                                <input class="form-control form-control-lg" type="text" v-model="bank.fullName">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">CPF</label>
                                <input class="form-control form-control-lg" type="text" v-mask="'###########'" v-model="bank.cpf">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Agência</label>
                                <input class="form-control form-control-lg" type="text" v-model="bank.agency">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Conta Corrente</label>
                                <input class="form-control form-control-lg" type="text" v-model="bank.account">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="col-form-label col-form-label-lg" for="inputLarge">Nome do banco</label>
                                <input class="form-control form-control-lg" type="text" v-model="bank.name">
                            </div>
                        </div>
                    </div>
                </div> 
                <button class="btn btn-success btn-lg btn-block mt-3 mb-3" @click="updateUser()">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            formData:{
                name:'',
                email:'',
                phoneNumber:'',
            },
            bank:{
                fullName:null,
                cpf:null,
                agency:null,
                account:null,
                name:null
            },
            status:localStorage.getItem('mdfkwe_r')
        }
    },
    computed: {
        user(){
            const elements=this.$store.getters['getUser'];
            this.formData={name:elements.name,email:elements.email,phoneNumber:elements.phoneNumber}
            if(elements.bankAccount){
                this.bank={
                    name:elements.bankAccount.name,
                    agency:elements.bankAccount.agency,
                    account:elements.bankAccount.account,
                    fullName:elements.bankAccount.fullName,
                    cpf:elements.bankAccount.cpf
                }
            }
            return elements;
        }
    },
    created() {
        this.user
    },
    methods:{
        updateUser(){
            if(this.status=='JOGADOR'){
                const obj=Object.assign(this.formData,{bankAccount:this.bank})  
                this.$store.dispatch('account',obj)
            }else{
                this.$store.dispatch('account',this.formData)
            }
        }
    }
}
</script>
