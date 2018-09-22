<template>
    <header>
        <a class="seasons" v-on:click="seasonsToggle">Seasons</a>
        <ul v-bind:class="{ open: seasonsOpen}">
            <li v-for="season in seasons" :key="season.meta_box.year">
                <router-link :to="'seasons/'+season.meta_box.year">
                    {{season.title.rendered}}
                </router-link>
            </li>
        </ul>
    </header>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name: 'Header',
    data() {
        return {
            seasonsOpen: false,
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
        })
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
</style>