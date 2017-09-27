<template>
  <div class="show-movie-details">
    <siteHeader>
      <a slot="goBackLink" class="goBackLink" href="/"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
      <h1 slot="pageTitle" class="modTitle" >Movie Details</h1>
    </siteHeader>
    <!-- <h1> {{ linkBack }} </h1> -->
      <div v-if="!error">
        <div class="header-bg">
          <h2 class="movie-title">{{ movieDetails.original_title }}</h2>
        </div>
        <div class="detailsWrapper">
          <div class="imagePane">
            <img v-bind:src="imgPath + movieDetails.poster_path" alt="poster">
          </div>
          <div class="detailsPane">
            <p class="release-date">{{ movieReleaseYear() }}</p>
            <p class="runtime">{{ movieDetails.runtime }} min</p>
            <p class="vote-average">{{ movieDetails.vote_average }} / 10</p>
            <!-- <button v-on:click="addToFavorite()">add to favorites</button> -->
            <span><i title="Add To Favorite" class="fa fa-heart" aria-hidden="true" v-on:click="addRemoveFav()" v-bind:class="{favorited:isFavoriteAlready(), favoriteButton:true}"></i></span>

            <span><i title="Watch Later" class="fa fa-bookmark" aria-hidden="true" v-on:click="addRemoveBookMark()" v-bind:class="{bookmarked:isBookmarkedAlready(), favoriteButton:true}"></i>
              </span>         

          </div>
        </div>
        <section>
          <p class="overview">{{movieDetails.overview}}</p>
        </section> 
        <section class="trailers">
          <trailers></trailers>
        </section>     

        <!-- //www.youtube.com/embed/c38r-SAnTWM?enablejsapi=1&autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en-US&modestbranding=1&fs=1 -->
      </div>
      <span class="error-msg" v-else><i class="fa fa-exclamation-circle" aria-hidden="true"></i>  Please check if API key is installed.</span>

    </div>
</template>

<script>
import siteHeader from './SiteHeader';
import trailers from './Trailers';
import api from '../api'

export default {
  components:{
    siteHeader,
    trailers
  },
  props:['linkBack'],
  data () {
    return {
      msg: 'Movie Details',
      error: false,
      id:this.$route.params.id,
      favorited: false,
      bookmarked: false,
      apiKey: api[0].apiKey,
      imgPath: '//image.tmdb.org/t/p/w500/',
      moviePath:"//api.themoviedb.org/3/movie/",
      movieDetails:{},
      favorite:"",
      bookmark:""
    }
  },
  methods:{
    goBack: function(){
      // return $router.go(-1);
      return window.history.back();
    },
    movieReleaseYear: function(){      
      var rel_date ="";
      if(this.movieDetails.release_date){
        rel_date = this.movieDetails.release_date;
      }
      if(rel_date.indexOf('-') > -1){
        return rel_date.split("-")[0];  
      }      
    },
    addRemoveFav: function(){
      if(localStorage.getItem("movie_favorite") !== null){          
          this.favorite = localStorage.getItem("movie_favorite");
          if(this.favorite.indexOf(this.id) > -1){            
            this.removeFromFavorite();
          }else{
            this.addToFavorite();
          }
        }else{
          this.addToFavorite();
        }   
    },
    addToFavorite: function(){
      if(localStorage.getItem("movie_favorite") !== null){
          this.favorite = localStorage.getItem("movie_favorite");
      }      
      if(this.favorite.indexOf(this.id) < 0){       
        if (this.favorite == ""){
          this.favorite = this.id;
        }else{
          this.favorite= this.favorite+","+ this.id;  
        }        
      }
      if (typeof(Storage) !== "undefined"){
        localStorage.setItem("movie_favorite",this.favorite);
      }
    },
    removeFromFavorite: function(){
      if(localStorage.getItem("movie_favorite") !== null){
          this.favorite = localStorage.getItem("movie_favorite");
      } 
      if(this.favorite.indexOf(this.id) > -1){
        var removeArray = this.favorite.split(',');        
        removeArray.splice(removeArray.indexOf(this.id), 1);        
        this.favorite=removeArray.join();
        localStorage.setItem("movie_favorite",this.favorite);
      }
    },
    isFavoriteAlready: function(){
      if(this.favorite.indexOf(this.id) > -1){
        return true;
      }else{
        return false;
      }
    },
    addRemoveBookMark: function(){
      console.log("Functionality not build yet!");
      this.bookmarked = !this.bookmarked;
    },
    isBookmarkedAlready: function(){
      return this.bookmarked;
    }
  },
  computed:{

  },
  created: function(){
    this.$http.get(this.moviePath + this.id + "?api_key=" + this.apiKey)
      .then((response) => {
        this.movieDetails = response.data;
        //console.log(this.movieDetails);
        // console.log(response.data);
      })
      .catch(e => {
        this.error = true;
        console.log(e);
      });
      // console.log(this.favorite);
      if (typeof(Storage) !== "undefined"){
        // Load
        if(localStorage.getItem("movie_favorite") !== null){
          this.favorite = localStorage.getItem("movie_favorite");
        }
      }

  }
}
</script>

<style scoped>
  .header-bg {
  width: 100%;
  /*height: 80.9px;*/
  background-color: #009688;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  clear: both;
  text-align: left;
}
.movie-title {
  /*width: 100%;*/
  /*height: 38px;*/
  font-family: Helvetica;
  font-size: 24px;
  font-weight: 300;
  text-align: left;
  color: #ffffff;
  display: inline-block;
  padding: 0 24px;
}
.detailsWrapper{
  display: block;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 24px;
  font-size: 0;
}
.detailsWrapper .imagePane{
  width: 50%;
  display: inline-block;
  text-align: left;
  box-sizing: border-box;
}
.detailsWrapper .imagePane img{
  width: 100%;

}
.detailsWrapper .detailsPane{
  width: 50%;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  font-size:24px;
  box-sizing: border-box;
  padding:0px 24px;
  color: #747474;
}
.detailsWrapper .detailsPane .vote-average{
  font-size: 16px;
  color:#000;
  margin-bottom: 35px;
  }
.overview{
  text-align: left;
  padding: 24px;
  padding: 0px 24px 24px;
  line-height: 22px;
}
.trailers{
  margin-bottom: 25px;
  display: block;
}
.favoriteButton{
  font-size: 34px;
  color:#ccc;
  padding: 0px 10px 0px 0px;  
}
.fa-heart{
  border-right: 1px solid #ccc;
}
.fa-bookmark{
  padding-left: 10px;
}
.favorited{
  color:red;
}
.bookmarked{
  color:#1565bd;
}
</style>
