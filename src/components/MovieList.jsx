import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieItem from './MovieItem';
import { setMoviesSuccess } from '../redux/moviesSlice';
import { signout } from '../redux/authSlice';
import '../../styles/MovieList.css'; 

const MovieList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state) => state.movies.movies);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/getMovies`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setMoviesSuccess(data));
            });
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(signout());
        navigate('/signin');
    };
    
    const handleAddMovie=()=>{
        navigate('/addmovie');
    }

    return (
        <div className="movie-list-container">
            <h1 className="movie-list-title">Movie Watchlist</h1>
            <div className="movie-list-actions">
                <button className="btn add-movie-btn" onClick={handleAddMovie}>Add Movie</button>
                <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <ul className="movie-list">
                {movies.map((movie,key) => (
                    <MovieItem key={key} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
