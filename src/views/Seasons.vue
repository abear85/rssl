<template>
  <div class="history">
    <div class="spinner" v-if="loading">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div class="dropdown-wrapper" v-bind:class="{ open: seasonsOpen}" v-if="!loading">
      <a class="seasons" v-on:click="seasonsToggle">Season {{selectedSeason}}</a>
      <ul >
          <li v-for="season in seasons"
          :key="season.meta_box.year">
              <a v-on:click="changeYear(season.meta_box.year)">{{season.title.rendered}}</a>
          </li>
      </ul>
    </div>
    <div class="output-wrapper" v-if="!loading">
        <div>
            <div v-for="season in seasons" :key="season.meta_box.year" v-if="season.meta_box.year == selectedSeason">
              <div class="winner">
                <figure>
                  <img src="./../assets/winner.png" alt="Winner" title="Winner"/>
                </figure>
                <h1 v-html="season.meta_box.winner"></h1>
              </div>
                <h3>Runner Up: {{season.meta_box.runnerUp}}</h3>
                <h5>Third Place: {{season.meta_box.thirdPlace}}</h5>
                <!-- <span v-for="standing in season.meta_box.standings" :key="standing.id">
                    {{standing[0]}}. {{standing[1]}}</span> -->
                <h6>Regular Season Standings</h6>
                <ol>
                  <li v-for="standing in season.meta_box.standings" :key="standing.id">{{standing[1]}}</li>
                </ol>
            </div>
        </div>
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
  mounted(){
    this.$ga.page({
      page: '/seasons',
      title: 'Seasons | RSSL',
      location: window.location.href
    })
  },
  methods:{
      seasonsToggle: function(){
          this.seasonsOpen = !this.seasonsOpen
      },
      changeYear: function(year){
        this.seasonsOpen = false;
        this.selectedSeason = year;
        console.log('track event here: ');
        this.$ga.event('season', 'filtered', year);
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
.output-wrapper{
  h1,h3,h5,h6{
    margin: 0;
    padding: 0;
    text-align: left;
  }
  h3{
    font-family: 'Kanit', sans-serif;
    font-weight: 400;
    font-size: 19px;
  }
  h5{
    font-family: 'Kanit', sans-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 17px;
  }
  h6{
    font-size: 16px;
    //text-transform: uppercase;
    border-bottom: solid 1px black;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
  ol{
    margin: 0;
    padding: 0 20px;
    text-align: left;
    list-style-position: outside;
    li{
      padding-left: 15px;
    }
  }
  .winner{
    text-align: left;
    figure{
      display: inline-block;
      width: 40px;
      margin:0;
      padding: 0;
      img{
        width: 100%;
      }
    }
    h1{
      display: inline-block;
      width: calc(100% - 50px);
      line-height: 90px;
      vertical-align: top;
      padding-left: 10px;
      font-size: 22px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
    }
  }
}
</style>