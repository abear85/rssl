<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="spinner" v-if="loading">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div v-html="pagedetails" v-if="!loading"></div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      pagedetails: [],
      loading: true,
    }
  },
  mounted(){
    this.$ga.page({
      page: '/',
      title: 'Home | RSSL',
      location: window.location.href
    });
  },
  created(){
    axios.get('http://api.albertobonora.ca/wp-json/wp/v2/pages/28').then(response => {
      this.pagedetails = response.data.content.rendered,
      this.loading = false
    })
    .catch( e=> {
      this.errors.push(e)
    })
    .then(function(){
      //this.loading = true
    });
  },
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | RSSL',
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
