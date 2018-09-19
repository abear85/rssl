<template>
  <div class="history">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <seasons/>
  </div>
</template>

<script>
// @ is an alias to /src
import seasons from '@/components/seasons.vue';

export default {
  name: 'history',
  components: {
    seasons,
  },
};
</script>
