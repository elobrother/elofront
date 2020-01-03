<template>
  <div>
    <div class="navbar navbar-expand-lg fixed-top shadow-lg height-nav navbar-light bg-light bg-primary">
      <div class="container">
        <span class="navbar-brand" @click="mainPage()">
          <img src="@/assets/logo2.png" alt="EloBrother" style="height:40px" />
        </span>

        <ul v-if="!logado" class="navbar-nav ml-auto">
          <li v-if="!status" class="visible nav-item active">
            <router-link class="nav-link color" v-scroll-to="'#home'" to="#">Home</router-link>
          </li>
          <li v-if="!status" class="visible nav-item active">
            <router-link class="nav-link color" v-scroll-to="'#services'" to="#">Serviços</router-link>
          </li>
          <li v-if="!status" class="visible nav-item active">
            <router-link class="nav-link color" v-scroll-to="'#about'" to="#">Sobre a EloBrother</router-link>
          </li>
          <li v-if="!status" class="visible nav-item active">
            <router-link class="nav-link color" v-scroll-to="'#contact'" to="#">Contato</router-link>
          </li>
          <li class="nav-item active border-client-area">
            <span class="nav-link color" data-toggle="modal" data-target="#exampleModal" @click="open()">
                Área do cliente
            </span>
          </li>
        </ul>
        <ul v-else class="navbar-nav ml-auto">
          <li class="nav-item active dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                Perfil
            </a>
            <div class="dropdown-menu dropdown-menu-right" style="position: absolute; will-change: transform; top: 0px; transform: translate3d(0px, 37px, 0px);">
              <span class="dropdown-item cursor">
                <router-link v-if="whoIs!='ADMIN'" class="nav-link" to="/dashboard/">Painel</router-link>
                <router-link v-if="whoIs=='ADMIN'" class="nav-link" to="/pannel">Painel</router-link>
              </span>
              <div class="dropdown-divider"></div>
              <span v-if="whoIs!='ADMIN'" class="dropdown-item cursor" @click="logout()">Sair</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-top">
            <h4 v-if="!display" class="text-center text-login">Faça seu Login!</h4>
            <h4 v-if="display" class="text-center text-login">Crie sua conta!</h4>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div v-if="display" class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="nome" v-model.trim="formData.name"/>
                </div>
                <div class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="email" v-model.trim="formData.email"/>
                </div>
                <div class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="senha" v-model.trim="formData.password" @keyup.native.enter="enter()"/>
                </div>
                <div class="form-group" v-if="display">
                  <input class="form-control form-control-lg" type="password" placeholder="confirmar senha" v-model.trim="confpassword"/>
                </div>
                <p class="text-center cursor decoration-text" v-if="!display" data-toggle="modal" data-dismiss="modal" data-target="#passwordModal">Esqueci minha senha</p>
                <button v-if="!display" class="btn btn-primary btn-lg btn-block" data-dismiss="modal" aria-label="Close" @click="enter()">
                    Entrar
                </button>
                <button v-if="display" class="btn btn-primary btn-lg btn-block" data-dismiss="modal" aria-label="Close" @click="enter()">
                    Cadastrar
                </button>
              </div>
            </div>
          </div>
          <div class="modal-bottom" style="background: #51a945">
            <h4 v-if="!display" class="text-center text-register">
              Ainda não tem uma conta?
              <span @click="register()" class="text-register">Clique aqui</span>
            </h4>
            <h4 v-if="display" class="text-center text-register">
              Já possui uma conta?
              <span @click="register()" class="text-register">Clique aqui</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-top">
            <h4 class="text-center text-login">Esqueci minha senha</h4>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Coloque seu email" v-model.trim="email"/>
                </div>
                <button v-if="!display" class="btn btn-primary btn-lg btn-block mb-2" data-dismiss="modal" aria-label="Close" @click="recover()">
                    Pegar nova senha
                </button>
                <p class="text-center cursor decoration-text" v-if="!display" data-toggle="modal" data-dismiss="modal" data-target="#exampleModal">Voltar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../routes";
export default {
    data() {
        return {
            display: false,
            login: true,
            menu: false,
            formData: {name: "",email: "",password: "",status: "CLIENTE"},
            confpassword: "",
            goto: {page: "",status: false},
            message: "",
            fgtPsswrd:false,
            email:'',
            whoIs:''
        };
    },
    computed: {
        status() {
            return this.$store.getters["getEloStatus"];
        },
        logado() {
            return this.$store.getters["getUserLogado"];
        },
        typeUser() {
            return this.$store.getters["getUserStatus"];
        }
    },
    created() {
        this.status;
        this.logado;
        this.status;
        this.checkUser();
    },
    methods: {
        open() {
            this.menu = !this.menu;
        },
        mainPage() {
            const typeUser = localStorage.getItem("mdfkwe_r");
            if (typeUser != "JOGADOR") {
                console.log(typeUser)
                this.$store.commit("changeStatusMutation", this.goto);
            }
        },
        checkUser(){
          this.whoIs=localStorage.getItem("mdfkwe_r")
        },
        register() {
            this.formData = {name: "",email: "",password: "",status: "CLIENTE"};
            this.confpassword = "";
            this.message = this.display = !this.display;
        },
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        enter(){
            if(!this.display){
                if(this.validateEmail(this.formData.email)){
                  if(this.formData.password.length == 0 ||this.formData.email.length == 0){
                      this.$noty.error('Preencha todos os campos')
                  }else{
                      this.$store.dispatch("login", this.formData);
                      const id=localStorage.getItem('id')
                  }
                }else{
                  this.$noty.warning('Email não é valido')
                }
            } 
            else{
                if(this.formData.name == "" ||this.formData.password == "" ||this.formData.email == ""){
                    this.$noty.error('Preencha todos os campos')
                }else {
                  if(this.validateEmail(this.formData.email)){
                    if(this.formData.password !== this.confpassword){
                        this.$noty.warning('As senhas não são iguais!')
                    }else{
                        this.confpassword = "";
                        this.display = !this.display;
                        this.$store.dispatch("register", this.formData);
                    }
                  }else{
                    this.$noty.warning('Email não é valido')
                  }
                }
            }
        },
        recover(){
          const formData={email:this.email}
          this.$store.dispatch('recoverAccount',formData)
        },
        logout(){
            this.menu = !this.menu;
            this.formData = {name: "",email: "",password: "",status: "CLIENTE"}
            this.$store.commit("logoutMutation");
        }
    }
};
</script>