import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { Alert } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/authSlice'
import { toast } from 'react-toastify';
import '../../styles/SignIn.css'; 

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return dispatch(signInFailure('Please fill the required details'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch(`${import.meta.env.VITE_PORT}/api/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                toast.error(data.message);
            }
            if (res.ok) {
                dispatch(signInSuccess(data));
                localStorage.setItem("token", data.token);
                toast.success("Login Successful");
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
            toast.error(error.message);
        }
    }

    return (
        <>
            <Link to="/"><h1 className='header-title'>Movies</h1></Link>
            <div className='form-container'>
                <div className='form-wrapper'>
                    <h1 className='form-heading'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-5 mb-5'>
                            <label htmlFor="email">Email Address</label><br />
                            <input
                                type="email"
                                placeholder='Enter Email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='input-field'
                            />
                        </div>

                        <div className='relative mb-5'>
                            <label htmlFor="password">Password</label><br />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Password'
                                    id='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='input-field'
                                />
                            </div>
                        </div>

                        <button className='submit-button'>
                            {loading ? (
                                <span className='pl-3'>Loading...</span>
                            ) : 'Login'}
                        </button>
                    </form>
                    <div>No account? <Link to='/signup' className='link'>Create One!</Link></div>
                </div>
            </div>
        </>
    )
}

export default SignIn
