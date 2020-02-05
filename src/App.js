import React,{Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery'


class App extends Component {
  constructor(props) {
    super(props)
    this.state= {}
    

    
   // var movieRows =[]
   // movies.forEach((movie) => {
    //  console.log(movie.title)
   //   const movieRow = <MovieRow movie={movie} />
  //  movieRows.push(movieRow)
   // })

   // this.state = {rows: movieRows}

   this.performSearch()
  }
  performSearch(searchTerm){
  console.log("Perform search using moviedb")
    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDb_API_KEY}&query=` + searchTerm
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      console.log("fetched data successfully")
      // console.log(searchResults)
      const results = searchResults.results
      // console.log(results[0])

      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src ="https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
        movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    },
    error:(xhr, status, err) => {
      console.error("Failed to fetch data")
    }
  })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const term =event.target.value
    boundObject.performSearch(term)
  }
  
render() {
  return (
    <div>
     <table className="titleBar">
     <tbody>
       <tr>
         <td>
         <img alt="icon" width="50" src="moviesdb.svg"/>
         </td>
         <td width="8" />
         <td>
        <h3> MoviesDB Info</h3>
         </td>
          </tr>
     </tbody>
    </table> 
<input style={{
  fontSize: 24,
  display: 'block',
  width: "100%",
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16
}} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

{this.state.rows}
    
    </div>
  );
}
}
export default App;
