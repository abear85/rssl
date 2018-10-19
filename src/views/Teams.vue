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
             <a v-on:click="changeTeams(team.slug, team.title.rendered,team.id); testAB(team.id);" v-html="team.title.rendered"></a>
        </li>
      </ul>
    </div>
    <div class="output-wrapper" v-if="!loading">
        <ul>
            <li v-for="team in teams" :key="team.id" v-if="team.slug == selectedTeam">
                <h3>Owner/GM {{team.meta_box.owner}}</h3>
                <p>{{selectedTeamID}}</p>
                <div class="player" v-for="keeper in keepers" :key="keeper.id" v-if="keeper.meta_box.players_to_teams_to[0] == selectedTeamID">
                  <div class="circle">
                    <figure>
                      <img v-bind:src="keeper.meta_box.playerPhoto[0].full_url" v-bind:alt="keeper.title.rendered" v-bind:title="keeper.title.rendered"/>
                    </figure>
                  </div>
                  <div class="details">
                    <p v-html="keeper.title.rendered"></p>
                    <p v-html="keeper.meta_box.contractLength"></p>
                    <img :src="sanatizeTeam(keeper.meta_box.nhlTeam)">
                  </div>
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
      selectedTeamID: 27,
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
      changeTeams: function(teamSlug, team, teamID){
        this.teamsOpen = false;
        this.selectedTeam = teamSlug;
        this.selectedTeamTitle = team;
        this.selectedTeamID = teamID;
      },
      sanatizeTeam: function(nhlTeam){
        var slug = nhlTeam;
        slug = slug.toLowerCase();
        slug = slug.replace(/\s+/g, '-');
        return require('./../assets/teams/'+nhlTeam+'.svg');
        //return 'https://www.dailyfaceoff.com/wp-content/themes/freshnews/nationnetwork/assets/img/svg-logos/dallas-stars.svg';
      },
      testAB: function(teamID){
        axios.get('http://api.headless.localhost/wp-json/wp/v2/players').then(response => {
          this.keepers = response.data
        })
        .catch( e=> {
          this.errors.push(e)
        })
        .then(function(){
          //this.loading = true
        });
      }
  },
  //fetch posts
  created(){
    //http://api.headless.localhost/wp-json/wp/v2/teams
    //http://api.albertobonora.ca/wp-json/wp/v2/teams
    axios.get('http://api.headless.localhost/wp-json/wp/v2/teams').then(response => {
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
.player{
  text-align: left;
  margin-bottom: 10px;
  .circle{
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: white;
    text-align: center;
    display: inline-block;
    position: relative;
    z-index: 1;
    //box-shadow: inset 0 0 0 2px #666;
    &:before{
      position: absolute;
      top: 3px;
      left: 3px;
      width: 74px;
      height: 74px;
      display: block;
      content: "";
      box-shadow:  inset 0 0 0 2px #666;
      border-radius: 40px;
      overflow: hidden;
    }
  }
  figure{
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin:6px 0 0 0;
    padding: 0;
    img{
      width: 100%;
    }
  }
  .details{
    display: inline-block;
    width: calc(100% - 45px);
    margin-left: -45px;
    vertical-align: top;
    padding-left: 10px;
    font-size: 17px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    position: relative;
    z-index: 0;
    background-color: #fff;
    text-indent: 30px;
    text-align: center;
  }
}
</style>