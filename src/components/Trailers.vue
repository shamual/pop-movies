<template>
  <div class="trailers-wrapper" v-if="trailersAvailable">
    <hr>
    <h1> {{ msg }} </h1>
    <ul v-if="!error">
      <li v-for="(trailer,key) in trailers" class="trailer">                        
            <a v-bind:href="trailer" target="_blank" class="trailer-play">
              <i class="fa fa-play" aria-hidden="true"></i>
            </a>
            <span class="trailer-no">Trailer {{ ++key }}</span>            
      </li>
    </ul>
    <span class="error-msg" v-else><i class="fa fa-exclamation-circle" aria-hidden="true"></i>  Please check if API key is installed.</span>

  </div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      msg: 'Trailers',
      error: false,
      id:this.$route.params.id,
      trailersAvailable: false,      
      apiKey: api[0].apiKey,      
      moviePath:'//api.themoviedb.org/3/movie/',
      trailerURL:"//www.youtube.com/watch?v=",
      videos:{},
      trailers:[]
    }
  },
  methods:{

  },
  computed:{

  },
  created: function(){
    this.$http.get(this.moviePath + this.id + "/videos?api_key=" + this.apiKey)
      .then((response) => {
        this.videos = response.data.results;
        for(var i=0; i < this.videos.length; i++){
          if(this.videos[i].type.indexOf('Trailer') > -1){            
            this.trailers.push(this.trailerURL + this.videos[i].key);            
            // console.log(this.videos[i]);
            this.trailersAvailable = true;
          }
          // console.log(this.videos[i]);
        }              
        // console.log(this.trailers);
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

ul{
  margin:0;
  padding:0;
  font-size:0;
}
li{
  list-style: none;
  font-size: 20px;
}
a{
  text-decoration: none;
  color:#747474;
}
i{
  font-size: 30px;

}
.trailer{
  display: table;
  width: 100%;
  border-top: 1px solid #e6e6e6;
}
.trailer-play{
  display: table-cell;
  width: 25%;
  vertical-align: middle;
  border-right: 1px solid #e6e6e6;
  padding:10px 0px;

}
.trailer-no{
  display: table-cell;
  vertical-align: middle;
  width: 75%;
  text-align: left;
  padding-left: 50px;
}
hr{
  border-color: #e6e6e6;
}
</style>
