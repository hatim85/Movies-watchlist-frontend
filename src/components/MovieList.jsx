import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from './MovieItem';
import { setMoviesSuccess } from '../redux/moviesSlice';
import '../../styles/MovieList.css'; 

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/getMovies`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMoviesSuccess(data));
            });
    }, [dispatch]);

    return (
        <div className="movie-list-container">
            <h1 className="movie-list-title">Movie Watchlist</h1>
            <button className="btn add-movie-btn" onClick={() => window.location.href = '/addmovie'}>Add Movie</button>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <MovieItem key={movie._id} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
