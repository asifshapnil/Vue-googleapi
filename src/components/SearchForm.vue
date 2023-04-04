<template>
    <div class="form p-10">
      <div class="formGroup">
        <label class="label">Topic</label>
        <input v-model="formObj.topic" type="text" class="input">
      </div>
      <div class="formGroup mt-10">
        <label class="label">Location</label>
        <input v-model="formObj.location" type="text" class="input">
      </div>
      <div class="formGroup mt-10">
        <label class="label">Distance (Meter)</label>
        <input v-model="formObj.distance" type="number" class="input">
      </div>
      <div class="mt-10 flex justify-start align-start w-100">
          <button class="btn" @click="searchData()">Search</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'SearchForm',
    data() {
        return {
            formObj: {
                topic: '',
                location: '',
                distance: null
            }
        }
    },
    methods: {
        searchData() {
            console.log(this.formObj);            
        }
    }
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
 
  </style>
  