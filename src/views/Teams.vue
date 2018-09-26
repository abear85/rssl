<template>
  <div class="teams">
    <h2 v-if="loading">Loading {{loading}}</h2>
    <div class="dropdown-wrapper" v-bind:class="{ open: teamsOpen}">
      <a class="teams-btn" v-on:click="teamsToggle">Teams</a>
      <ul>
        <li v-for="team in teams"
        :key="team.id">
             <a v-on:click="changeTeams(team.slug)" v-html="team.title.rendered"></a>
        </li>
      </ul>
    </div>
    <div class="output-wrapper" v-if="!loading">
        <ul>
            <li v-for="team in teams" :key="team.id" v-if="team.slug == selectedTeam">
                <h1 v-html="team.title.rendered"></h1>
                <h3>Owner/GM {{team.meta_box.owner}}</h3>
                <div v-for="keeper in team.meta_box.keeperDetails" :key="keeper[0]">
                  <p>Player: {{keeper[0]}}</p>
                  <p>Team: {{keeper[1]}}</p>
                  <p>Contract: {{keeper[2]}}</p>
                  <hr/>
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
      loading: true,
      teams:[],
      keepers:[],
      errors: []
    }
  },
  methods:{
      teamsToggle: function(){
          this.teamsOpen = !this.teamsOpen
      },
      changeTeams: function(team){
        this.teamsOpen = false;
        this.selectedTeam = team;
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