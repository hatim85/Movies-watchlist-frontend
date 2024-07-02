import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMovieSuccess, toggleWatched } from '../redux/moviesSlice';
import '../../styles/MovieItem.css'; 

const MovieItem = ({ movie }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/delete/${movie._id}`, { method: 'DELETE' })
            .then(() => dispatch(deleteMovieSuccess(movie._id)))
            .catch(err => console.error('Error deleting movie:', err))
            .finally(() => setShowModal(false)); // Close the modal after deleting
    };

    const handleToggleWatched = () => {
        fetch(`${import.meta.env.VITE_PORT}/api/movies/${movie._id}/toggle-watched`, { method: 'PUT' })
            .then(() => dispatch(toggleWatched(movie._id)))
            .catch(err => console.error('Error toggling watched status:', err));
    };

    const handleViewDetails = () => {
        navigate(`/moviedetails/${movie._id}`);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <li className="movie-item">
                <div className="movie-item-content">
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
                    <div className="movie-item-actions">
                        <button onClick={() => navigate(`/editmovie/${movie._id}`)} className="btn edit-btn">Edit</button>
                        <button onClick={handleShowModal} className="btn delete-btn">Delete</button>
                        <button onClick={handleToggleWatched} className="btn toggle-watched-btn">
                            {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                        </button>
                        <button onClick={handleViewDetails} className="btn view-details-btn">View Details</button>
                    </div>
                </div>
            </li>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this movie?</h3>
                        <div className="modal-actions">
                            <button onClick={handleDelete} className="btn confirm-btn">Delete</button>
                            <button onClick={handleCloseModal} className="btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieItem;
