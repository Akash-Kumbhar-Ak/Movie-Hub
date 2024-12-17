import React, { useState } from "react";
import Axios from "axios";
// import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import './App.css'
import Footer from "./components/Footer";


export const API_KEY = "48c9a679";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };
  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <div >
      <section>
        {/* <Home value="searchQuery" onChange="onTextChange" /> */}
        {<div className="container-fluid heading">
          <div className="row">
            <div className="col-md-12">
              <h1 className=' text-center'>MO<span className="text-danger " >V</span>IES H<span className="text-danger">U</span>B</h1>
              <p className=' text-center'>Discover the latest movies, TV shows, and more</p>
              <div className='inputSearch'>
                <input
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={onTextChange}
                  className="SearchInput"
                />
              </div>
              {searchQuery && <a href="#MovieCon"><i className="fa fa-arrow-down m-3 p2 text-light" aria-hidden="true">Here we go...</i></a>}
            </div>
          </div>
        </div>}
      </section>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <div className='MovieListContainer bg-black' id="MovieCon">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <img className="Placeholder" src="/react-movie-app/movie.svg" alt="img" />
        )}
      </div>
      <footer>
        <div className="footer bg-black text-light ">
          <Footer />
        </div>
      </footer>

    </div>
  );
}

export default App;
