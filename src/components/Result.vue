<template>
    <div class="flex flex-col justify-end">
        <div class="result-box p-10">
            <div class="w-100 h-100  flex flex-col justify-start items-start" v-if="places.length">
                <h3 class="flex flex-col items-start m-0"><b>Search results</b></h3>
                <div class="flex flex-col justify-start items-start mt-10" v-if="places.length">
                    <div v-for="place in places" :key="place.place_id" class="mt-3 flex- jistify-start items-start" >
                       <li style="{text-align: start;}"> {{ place.name }} </li>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center h-100" v-else>
                <img src="../assets/no-record1.png" alt="" width="200">
                <h4><b>Result not found!</b></h4>
                <button class="mt-10 btn" @click="back">Go Back</button> 
            </div>
        </div>
        <div class="w-100 flex justify-end" v-if="places.length">
            <button class="mt-10 btn" @click="back">Go Back</button> 
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ResultList',
    data() {
        return {
            places: this.$store.state.places
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
  