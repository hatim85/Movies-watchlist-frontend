import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editMovieSuccess } from '../redux/moviesSlice';
import '../../styles/EditMovieForm.css'; 

const EditMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movie = useSelector((state) => state.movies.movies.find((movie) => movie.id === parseInt(id)));

    useEffect(() => {
        if (id) {
            if (movie) {
                setTitle(movie.title);
                setDescription(movie.description);
                setReleaseYear(movie.releaseYear);
                setGenre(movie.genre);
                setIsLoading(false);
            } else {
                fetch(`${import.meta.env.VITE_PORT}/api/movies/getSingleMovie/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setTitle(data.title);
                        setDescription(data.description);
                        setReleaseYear(data.releaseYear);
                        setGenre(data.genre);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        console.error('Error fetching movie:', err);
                        setIsLoading(false);
                    });
            }
        }
    }, [id, movie]);

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('releaseYear', releaseYear);
        formData.append('genre', genre);
        if (file) formData.append('file', file);

        fetch(`${import.meta.env.VITE_PORT}/api/movies/editMovie/${id}`, {
            method: 'PUT',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(editMovieSuccess(data));
                navigate('/');
            })
            .catch((err) => {
                console.error('Error updating movie:', err);
            });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-movie-form-container">
            <h1>Edit Movie</h1>
            <form onSubmit={handleSubmit} className="edit-movie-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Release Year</label>
                    <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>File</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button type="submit" className="submit-button">Update Movie</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default EditMovieForm;
