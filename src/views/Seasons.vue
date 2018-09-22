<template>
  <div class="history">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <seasons :year="year"/>
    <h1 :if="!year">No Season Selected</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import seasons from '@/components/seasons.vue';

export default {
  name: 'history',
  props: ['year'],
  components: {
    seasons,
  },
};
</script>
