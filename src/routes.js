import listMovies from './components/ListMovies.vue'
import showMovieDetails from './components/ShowMovieDetails.vue'
import topRatedMovies from './components/TopRatedMovies'


export default [
	{path:"/", component:listMovies},
	{path:"/toprated/", component:topRatedMovies},
	{path:"/details/:id", component:showMovieDetails}

]