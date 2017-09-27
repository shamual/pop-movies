<template>
  <div id="app">
    <!-- <listMovies></listMovies> -->
    <!-- <showMovieDetails></showMovieDetails> -->
     <router-view></router-view>
  </div>
</template>

<script>
// import Hello from './components/Hello'

// import siteHeader from './components/Header'
import listMovies from './components/ListMovies'
import showMovieDetails from './components/ShowMovieDetails'
import topRatedMovies from './components/TopRatedMovies'



export default {
  name: 'app',
  components: {
    listMovies,
    showMovieDetails,
    topRatedMovies
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x:hidden;
  /*margin-top: 60px;*/
}
</style>
