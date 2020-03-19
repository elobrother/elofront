<template>
  <div> 
        <Modal />
        <comp-services/>
        <comp-info/>
        <comp-contact/>
  </div>
</template>

<script>
import compServices from './services.vue';
import compInfo from './info.vue';
import compContact from './contact.vue';
import Modal from '../Modal/modal-info.vue';

export default {
  data(){
    return{
      display:true
    }
  },
  name:'index',
  components: {
    compServices,
    compInfo,
    compContact,
    Modal
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
