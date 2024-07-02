import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    status: 'idle',
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesSuccess: (state, action) => {
            state.movies = Array.isArray(action.payload) ? action.payload : [action.payload];
        },
        addMovieSuccess: (state, action) => {
            state.movies.push(action.payload);
        },
        editMovieSuccess: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            if (index !== -1) {
                state.movies[index] = { ...state.movies[index], ...action.payload };
            }
        },
        deleteMovieSuccess: (state, action) => {
            state.movies = state.movies.filter(movie => movie._id !== action.payload);
        },
        toggleWatched: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload);
            if (index !== -1) {
                state.movies[index].watched = !state.movies[index].watched;
            }
        },
        rateMovieSuccess: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            if (index !== -1) {
                state.movies[index].rating = action.payload.rating;
            }
        },
        reviewMovieSuccess: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            if (index !== -1) {
                state.movies[index].review = action.payload.review;
            }
        },
    },
});

export const {
    addMovieSuccess,
    editMovieSuccess,
    deleteMovieSuccess,
    toggleWatched,
    rateMovieSuccess,
    reviewMovieSuccess,
    setMoviesSuccess
} = moviesSlice.actions;

export default moviesSlice.reducer;
