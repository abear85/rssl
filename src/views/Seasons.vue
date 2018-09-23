<template>
  <div class="history">
    <a class="seasons" v-on:click="seasonsToggle">Seasons</a>
    {{seasonsOpen}}
    <span>Selected season: {{selectedSeason}}</span>
    <ul v-bind:class="{ open: seasonsOpen}">
        <li v-for="season in seasons"
        :key="season.meta_box.year">
             <a v-on:click="selectedSeason=season.meta_box.year">{{season.title.rendered}}</a>
        </li>
    </ul>
    <div class="seasons-wrapper">
        <ul>
            <li v-for="season in seasons" :key="season.meta_box.year" v-if="season.meta_box.year == selectedSeason">
                <h1>Winner: {{season.meta_box.winner}}</h1>
                <h3>Runner Up: {{season.meta_box.runnerUp}}</h3>
                <span v-for="standing in season.meta_box.standings" :key="standing.id">
                    {{standing[0]}}. {{standing[1]}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'seasons',
  data() {
    return {
      seasonsOpen: false,
      selectedSeason: 2013,
      seasons: [],
      teams:[],
      errors: []
    }
  },
  methods:{
      seasonsToggle: function(){
          this.seasonsOpen = !this.seasonsOpen
      }
  },
  //fetch posts
  created(){
    axios.get('http://api.albertobonora.ca/wp-json/wp/v2/seasons').then(response => {
      this.seasons = response.data
    })
    .catch( e=> {
      this.errors.push(e)
    });
  },
};
</script>
<style scoped lang="scss">
ul{
    list-style: none;
    padding: 0;
    margin: 0;
    display: none;
    &.open{
        display: block;
    }
    li{
        padding: 0;
        margin: 0;
        span{
            display: block;
        }
    }
}
.seasons-wrapper{
  ul{
    display: block;
  }
}
</style>