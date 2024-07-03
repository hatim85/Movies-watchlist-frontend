import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteMovieSuccess, setMoviesSuccess, toggleWatched } from '../redux/moviesSlice';
import Rating from './Rating';
import Review from './Review';
import '../../styles/MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const currentUser = useSelector((state) => state.user);
    const userId = currentUser.currentUser.username; 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moviesArray = useSelector((state) => Object.values(state.movies.movies));
    const movie = moviesArray.find((movie) => movie._id === id);
    const [rating, setRating] = useState(movie ? movie.rating : 0);
    const [reviewText, setReviewText] = useState('');
    const [isReviewVisible, setIsReviewVisible] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!movie) {
            fetch(`${import.meta.env.VITE_PORT}/api/movies/getSingleMovie/${id}`)
                .then((res) => res.json())
                .then((data) => dispatch(setMoviesSuccess(data)))
                .catch((err) => {
                    console.error('Error fetching movie:', err);
                });

            fetch(`${import.meta.env.VITE_PORT}/api/movies/reviews/${id}`, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => console.log(first))
                .catch((err) => console.error('Error fetching reviews:', err));
        }
    }, [movie, dispatch, id]);

    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/delete/${id}`, { method: 'DELETE' })
            .then(() => {
                dispatch(deleteMovieSuccess(id));
                navigate('/');
            });
    };

    const handleToggleWatched = () => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/${id}/toggle-watched`, { method: 'PUT' })
            .then(() => dispatch(toggleWatched(id)));
    };

    const handleRating = (newRating) => {
        setRating(newRating);
        fetch(`${import.meta.env.VITE_PORT}/api/movies/rate/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: newRating }),
        });
    };

    const handleReview = () => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/review/${id}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: userId, 
                review: reviewText, 
                rating: rating 
            }),
        })
            .then(res => res.json())
            .then(data => {
                setReviews(prevReviews => [...prevReviews, data]); 
                setIsReviewVisible(false); 
            })
            .catch(error => {
                console.error('Error saving review:', error);
            });
    };
    
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div className="movie-details-container">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Status:</strong> {movie.watched ? 'Watched' : 'Unwatched'}</p>
            {movie.filePath && (
                <div className="movie-video">
                    <video width="320" height="240" controls>
                        <source src={`${import.meta.env.VITE_PORT}/${movie.filePath}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            {isReviewVisible && (
                <>
                    <Rating rating={rating} onRating={handleRating} />
                    <Review review={reviewText} onReviewChange={setReviewText} onSubmit={handleReview} />
                </>
            )}
            <div className="movie-actions">
                <button onClick={() => navigate(`/editmovie/${id}`)} className="btn edit-btn">Edit</button>
                <button onClick={handleDelete} className="btn delete-btn">Delete</button>
                <button onClick={handleToggleWatched} className="btn toggle-watched-btn">
                    {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                </button>
            </div>
            <div className="movie-reviews">
                <h3>Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="movie-review">
                            <p><strong>{review.username}</strong></p>
                            <Rating rating={review.rating} onRating={() => { }} /> 
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
