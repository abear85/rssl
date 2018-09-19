<template>
    <div class="seasons-wrapper">
        <h1>Seasons</h1>
        <ul>
            <li v-for="season in seasons">
                <h1>{{season.Season}}</h1>
                <span>Winner: {{ season.Winner.Team }}</span>
                <span>Runner Up{{ season.RunnerUp.Team }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Seasons',
    data() {
        return {
            seasons: [],
            errors: []
        }
    },
    //fetch posts
    created(){
        axios.get('http://rssl.albertobonora.ca/api/rssl-app.json').then(response => {
            this.seasons = response.data.History
        })
        .catch( e=> {
            this.errors.push(e)
        })
    }
};
</script>
<style scoped lang="scss">
ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
        padding: 0;
        margin: 0;
        span{
            display: block;
        }
    }
}
</style>