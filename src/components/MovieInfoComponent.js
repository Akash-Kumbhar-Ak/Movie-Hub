import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background-color:rgb(14, 14, 14);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;

const CoverImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const MovieName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: red;
  font-weight:800;

  span {
    font-weight: 400;
  }
`;

const MovieInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;

  span {
    font-weight: 600;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  color: red;
  right: 10px;
  background: none;
  border: 2px solid red;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    position: static;
    margin-top: 10px;
  }
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
    ).then((response) => setMovieInfo(response.data));

  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}></Close>
        </>
      ) : (
        <p>Loading.....</p>
      )}
    </Container>
  );
};
export default MovieInfoComponent;
