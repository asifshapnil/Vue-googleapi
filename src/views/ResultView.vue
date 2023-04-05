<template>
    <div class="home flex justify-center items-center h-100 w-100">
        <ResultList></ResultList>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ResultList from '@/components/Result.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'ResultView',
    components: {
        ResultList
    },
});
</script>
  