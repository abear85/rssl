<template>
  <div class="teams">
    <h1>Teams Landing Page</h1>
    <a class="teams-btn" v-on:click="teamsToggle">Teams Toggle {{teamsOpen}}</a>

    <span>Selected Teams: {{selectedTeam}}</span><br />
    <ul v-bind:class="{ open: teamsOpen}">
        <li v-for="team in teams"
        :key="team.id">
             <a v-on:click="selectedTeam=team.slug; teamsToggle = false" v-html="team.title.rendered"></a>
        </li>
    </ul>
    <div class="teams-wrapper">
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
      teams:[],
      keepers:[],
      errors: []
    }
  },
  methods:{
      teamsToggle: function(){
          this.teamsOpen = !this.teamsOpen
      }
  },
  //fetch posts
  created(){
    axios.get('http://api.albertobonora.ca/wp-json/wp/v2/teams').then(response => {
      this.teams = response.data
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
.teams-wrapper{
  ul{
    display: block;
  }
}
</style>