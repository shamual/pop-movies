<template>
  <div class="list-movies">
    <!-- <h1> {{ msg }} </h1> -->
    <siteHeader>
      <h1 slot="pageTitle" class="modTitle" >Top Rated Movies</h1>
    </siteHeader>
    <ul v-if="!error">
        <li v-for="movie in movies">
          <router-link v-bind:to="'/details/'+ movie.id">
            <img v-bind:src="imgPath + movie.poster_path" alt="movie poster">
          </router-link>
        </li>
    </ul>
    <span class="error-msg" v-else><i class="fa fa-exclamation-circle" aria-hidden="true"></i>  Please check if API key is installed.</span>

  </div>
</template>

<script>
import siteHeader from './SiteHeader';
import api from '../api'

export default {
  components:{
    siteHeader
  },
  data () {
    return {
      msg: 'Top Rated Movies',
      error: false,
      apiKey: api[0].apiKey,
      imgPath: '//image.tmdb.org/t/p/w320/',
      moviePath:'//api.themoviedb.org/3/movie/',
      movies:{}
    }
  },
  methods:{

  },
  computed:{

  },
  created: function(){
    this.$http.get(this.moviePath + "top_rated?api_key=" + this.apiKey)
      .then((response) => {
        this.movies = response.data.results;
        // console.log(this.movies);
        // console.log(response.data.results);
      })
      .catch(e => {
        this.error = true;
        console.log(e);
      });
  }
}
</script>

<style scoped>
a{
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
}
ul{
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size:0;
  box-sizing: border-box;
}
li{
  display: inline-block;
  list-style: none;
  margin:0;
  padding:0;
  box-sizing: border-box;
  width: 50%;
}
li img{
  width: 100%;
}
</style>
