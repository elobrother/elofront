<template>
    <div>

        <Detail :data="users" />

        <div class="row">
            <div class="col">
                <h3 class="text-center text-information">Usuários</h3>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <span class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Nome do usuário" v-model="formData.name">
                    <button class="btn btn-success my-2 my-sm-0" @click="search()">Buscar</button>
                </span>
                <div v-if="users.length!=0" style="height:400px;width:auto; overflow-y:auto">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody v-if="!load">
                            <tr class="table-active" v-for="(user,index) in users" :key="index">
                                <th scope="row">{{user.name}}</th>
                                <td>{{user.email}}</td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#detalhe" @click="seeUser(user._id)">Detalhes</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="users.length==0">
                    <p class="text-center">Não há usuários na base</p>
                </div>
                <!-- <div class="d-flex justify-content-center">
                    <div v-if="load" class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> -->
            </div>
        </div>    
    </div>
</template>

<script>
import Detail from '../../Modal/modal-user-detail.vue'; 

export default {
    data(){
        return{
            load:false,
            formData:{
                page:'user',
                name:''
            }
        }
    },
    components:{
        Detail
    },
    computed:{
        users(){
            return this.$store.getters['getAllUsers']
        }
    },
    methods: {
        search(){
            this.$store.commit('searchUsersMutation',this.formData)
        },
        seeUser(id){
            this.$store.commit('oneUserMutation',id)
        }
    },
    created(){
        this.$store.dispatch('allUsers');
    },
    destroyed(){
        this.$store.commit('changeSeachMutation')
    }
}
</script>