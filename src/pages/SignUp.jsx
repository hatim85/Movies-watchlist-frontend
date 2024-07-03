import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/authSlice';
import '../../styles/SignUp.css'; 

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return setErrorMessage('Passwords do not match');
    }
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast.error('Please fill out all fields');
      return setErrorMessage('Please fill out all fields');
    }

    dispatch(signUpStart()); 

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signUpSuccess(data)); 
        toast.success('Account created successfully');
        navigate('/signin');
      } else {
        dispatch(signUpFailure(data.message)); 
        toast.error(data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      dispatch(signUpFailure(error.message)); 
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/"><h1 className='header-title'>Movies</h1></Link>
      <div className='form-container'>
        <div className='form-wrapper'>
          <h1 className='form-heading'>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className='form-field'>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                placeholder='Enter Name'
                id='username'
                value={formData.username}
                onChange={handleChange}
                className='input-field'
              />
            </div>

            <div className='form-field'>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                placeholder='Enter Email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                className='input-field'
              />
            </div>

            <div className='form-field'>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                placeholder='Enter Phone No'
                value={formData.phone}
                onChange={handleChange}
                id='phone'
                className='input-field'
              />
            </div>

            <div className='form-field'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder='Enter password'
                value={formData.password}
                onChange={handleChange}
                id='password'
                className='input-field'
              />
            </div>

            <div className='form-field'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder='Enter password again'
                value={formData.confirmPassword}
                id='confirmPassword'
                onChange={handleChange}
                className='input-field'
              />
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type='submit' className='submit-button'>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div>Already had an Account? <Link to="/signin" className='link'>Login!</Link></div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
