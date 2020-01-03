<template>
  <div>
        <comp-home/>
        <comp-services/>
        <comp-about/>
        <comp-info/>
        <comp-contact/>
  </div>
</template>

<script>
import compHome from './home.vue';
import compServices from './services.vue';
import compAbout from './about.vue';
import compInfo from './info.vue';
import compContact from './contact.vue';

export default {
  data(){
    return{
      display:true
    }
  },
  name:'index',
  components: {
    compHome,
    compServices,
    compAbout,
    compInfo,
    compContact
  },
  methods: {
    close(){
      this.display=false;
    },
    recuperaDados(){
      const id=localStorage.getItem('id');
      this.$store.dispatch('recuperaDados',id)
    },
  },
  created(){
    this.recuperaDados();
  }
};
</script>
