<template>
  <div class="home flex justify-center">
    <SearchForm></SearchForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchForm from '@/components/SearchForm.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchForm
  },
});
</script>
