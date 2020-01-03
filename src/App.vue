<template>
  <div>
    <comp-header v-if="getHeader"/>
    <router-view/>
    <comp-footer v-if="getFooter"/>
  </div>
</template>

<script>
import compHeader from './components/Header-Footer/Header.vue';
import compFooter from './components/Header-Footer/Footer.vue';
export default {
  components:{
    compHeader,
    compFooter,
  },
  computed: {
    getHeader(){
      return this.$store.getters['getHeaderStatus']
    },
    getFooter(){
      return this.$store.getters['getFooterStatus']
    }
  }
};


</script>

<style>
  @import './assets/css/style.css';
  
</style>


