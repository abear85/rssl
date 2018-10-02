<template>
  <div class="teams">
    <div class="spinner" v-if="loading">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div class="dropdown-wrapper" v-bind:class="{ open: teamsOpen}" v-if="!loading">
      <a class="teams-btn" v-on:click="teamsToggle" v-html="selectedTeamTitle"></a>
      <ul>
        <li v-for="team in teams"
        :key="team.id">
             <a v-on:click="changeTeams(team.slug, team.title.rendered)" v-html="team.title.rendered"></a>
        </li>
      </ul>
    </div>
    <div class="output-wrapper" v-if="!loading">
        <ul>
            <li v-for="team in teams" :key="team.id" v-if="team.slug == selectedTeam">
                <!-- <h1 v-html="team.title.rendered"></h1> -->
                <h3>Owner/GM {{team.meta_box.owner}}</h3>
                <div v-for="keeper in team.meta_box.keeperDetails" :key="keeper[0]">
                  <p>Player: {{keeper[0]}}</p>
                  <p>Team: {{keeper[1]}}</p>
                  <img :src="sanatizeTeam(keeper[1])">
                  <!-- <img src="@/../assets/logo.png" /> -->
                  <p>Contract: {{keeper[2]}}</p>
                </div>
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
  name: 'teams',
  data() {
    return {
      teamsOpen: false,
      selectedTeam: "the-bears",
      selectedTeamTitle: "The Bears",
      loading: true,
      teams:[],
      keepers:[],
      errors: []
    }
  },
  mounted(){
    this.$ga.page({
      page: '/teams',
      title: 'Teams | RSSL',
      location: window.location.href
    });
  },
  methods:{
      teamsToggle: function(){
          this.teamsOpen = !this.teamsOpen
      },
      changeTeams: function(teamSlug, team){
        this.teamsOpen = false;
        this.selectedTeam = teamSlug;
        this.selectedTeamTitle = team;
      },
      sanatizeTeam: function(nhlTeam){
        var slug = nhlTeam;
        slug = slug.toLowerCase();
        slug = slug.replace(/\s+/g, '-');
        return require('./../assets/teams/'+slug+'.svg');
        //return 'https://www.dailyfaceoff.com/wp-content/themes/freshnews/nationnetwork/assets/img/svg-logos/dallas-stars.svg';
      }
  },
  //fetch posts
  created(){
    axios.get('http://api.albertobonora.ca/wp-json/wp/v2/teams').then(response => {
      this.teams = response.data,
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
    title: 'Teams',
    titleTemplate: '%s | RSSL',
  }
};
</script>
<style scoped lang="scss">

</style>