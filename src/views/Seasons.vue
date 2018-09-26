<template>
  <div class="history">
    <h2 v-if="loading">Loading {{loading}}</h2>
    <div class="dropdown-wrapper" v-bind:class="{ open: seasonsOpen}">
      <a class="seasons" v-on:click="seasonsToggle">Seasons</a>
      <ul >
          <li v-for="season in seasons"
          :key="season.meta_box.year">
              <a v-on:click="changeYear(season.meta_box.year)">{{season.title.rendered}}</a>
          </li>
      </ul>
    </div>
    <span>Selected season: {{selectedSeason}}</span>
    <div class="output-wrapper" v-if="!loading">
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
      loading: true,
      seasons: [],
      teams:[],
      errors: []
    }
  },
  methods:{
      seasonsToggle: function(){
          this.seasonsOpen = !this.seasonsOpen
      },
      changeYear: function(year){
        this.seasonsOpen = false;
        this.selectedSeason = year;
      }
  },
  //fetch posts
  created(){
    axios.get('http://api.albertobonora.ca/wp-json/wp/v2/seasons').then(response => {
      this.seasons = response.data,
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
    title: 'Seasons',
    titleTemplate: '%s | RSSL',
  }
};
</script>
<style scoped lang="scss">

</style>