<template>
    <div>
        <div v-if="formData.stage=='Ferro'">
            <img :src="require(`@/assets/iron/iron_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div v-if="formData.stage=='Bronze'">
            <img :src="require(`@/assets/bronze/bronze_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div v-if="formData.stage=='Prata'">
            <img :src="require(`@/assets/silver/silver_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div v-if="formData.stage=='Ouro'">
            <img :src="require(`@/assets/gold/gold_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div v-if="formData.stage=='Platina'">
            <img :src="require(`@/assets/platinum/platinum_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div v-if="formData.stage=='Diamante'">
            <img :src="require(`@/assets/diamond/diamond_${formData.level!='Selecione'? formData.level : 'IV'}.png`)" class="img-fluid center image-size">
        </div>
        <div class="form-group">
            <select class="custom-select mb-3" @change="sendDataName($event)" v-model="formData.stage">
                <option v-for="element in boost.names" v-bind:key="element.state">{{element.state}}</option>
            </select>
            <select class="custom-select" @change="sendDataId($event)" v-model="formData.level">
                <option v-for="position in boost.positions" v-bind:key="position.state">{{position.state}}</option>
            </select>
        </div>    
    </div>
</template>

<script>
export default {
    props:['boost','name','pos'],
    data(){
        return{
            formData:{
                stage:this.name,
                level:this.pos,
                dirty:false
            }
        }
    },
    methods:{
        sendDataName(event){
            this.formData.stage=event.target.value;
            this.$emit('dataNome', event.target.value);
        },
        sendDataId(event){
            this.formData.level=event.target.value;
            this.$emit('dataId', event.target.value);
        },
    },
}
</script>