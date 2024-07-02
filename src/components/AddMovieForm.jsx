import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMovieSuccess } from '../redux/moviesSlice';
import '../../styles/AddMovieForm.css'; 

const AddMovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('releaseYear', releaseYear);
        formData.append('genre', genre);
        if (file) formData.append('file', file);

        fetch(`${import.meta.env.VITE_PORT}/api/movies/addMovies`, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(addMovieSuccess(data));
                navigate('/');
            })
            .catch((err) => console.error(err));
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="add-movie-form-container">
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit} className="add-movie-form">
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
                <button type="submit" className="submit-button">Add Movie</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default AddMovieForm;
