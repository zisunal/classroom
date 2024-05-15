import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BtnLoader from '../components/templates/btnLoader';

export default function Login({appInfo}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [errors, setErrors] = useState('');
    const [logingin, setLogingin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleSubmit = async (e) => {
        if (logingin) {
            return;
        }
        setLogingin(true);
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_SERVER + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Invalid login');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.user.email_verified_at === null) {
                Swal.fire({
                    title: 'Email not verified',
                    text: 'Please verify your email before logging in',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                try {
                    const response = await fetch(process.env.REACT_APP_PROXY_SERVER + 'send-otp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: data.user.id }),
                    });
                    if (!response.ok) {
                        throw new Error('Invalid login');
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
                setLogingin(false);
                navigate('/otp/' + data.user.id);
                return;
            }
            window.localStorage.setItem('auth', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            Swal.fire({
                title: 'Logged in',
                text: 'You have successfully logged in',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            setLogingin(false);
            navigate('/');
        } catch (error) {
            setErrors([error.message]);
            setLogingin(false);
        }
    }
    const changeEmail = (target) => {
        setEmail(target.value);
        let errors = [];
        if (target.value.length < 5) {
            errors.push('Email must be at least 5 characters');
        }
        if (!target.value.includes('@')) {
            errors.push('Email must contain an @');
        }
        if (!target.value.includes('.')) {
            errors.push('Email must contain a .');
        }
        // Check if email doesn't contain the last . after @
        if (target.value.indexOf('@') > target.value.lastIndexOf('.') || target.value.lastIndexOf('.') < target.value.indexOf('@') + 2) {
            errors.push('Email must contain a . after the @');
        }
        if (target.value.includes('+')) {
            errors.push('Email cannot contain a +');
        }
        if (target.value.includes(' ')) {
            errors.push('Email cannot contain a space');
        }
        setEmailErrors(errors);
        if (errors.length === 0) {
            if (target.classList.contains('invalid')) {
                target.classList.remove('invalid');
            }
            target.classList.add('valid');
        } else {
            if (target.classList.contains('valid')) {
                target.classList.remove('valid');
            }
            target.classList.add('invalid');
        }
    }
    const changePassword = (target) => {
        setPassword(target.value);
        let errors = [];
        if (target.value.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
        if (!target.value.match(/[a-z]/)) {
            errors.push('Password must contain a lowercase letter');
        }
        if (!target.value.match(/[A-Z]/)) {
            errors.push('Password must contain an uppercase letter');
        }
        if (!target.value.match(/[0-9]/)) {
            errors.push('Password must contain a number');
        }
        if (!target.value.match(/[^a-zA-Z0-9]/)) {
            errors.push('Password must contain a special character');
        }
        if (target.value.length > 30) {
            errors.push('Password must be less than 30 characters');
        }
        setPasswordErrors(errors);
        if (errors.length === 0) {
            if (target.classList.contains('invalid')) {
                target.classList.remove('invalid');
            }
            target.classList.add('valid');
        } else {
            if (target.classList.contains('valid')) {
                target.classList.remove('valid');
            }
            target.classList.add('invalid');
        }
    }

    return (
        <div className='login'>
            <h1>Login to {appInfo.name}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        placeholder='Your Email'
                        onChange={(e) => changeEmail(e.target)}
                    />
                    {emailErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        placeholder='Your Password'
                        onChange={(e) => changePassword(e.target)}
                    />
                    {passwordErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </label>
                {logingin ? <BtnLoader /> : <button type='submit'>Login</button>}
                <div className="hor">
                    <Link to="/register">Register</Link>
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </form>
            
            {errors && errors.map((error, index) => (
                <p key={index} className='error'>{error}</p>
            ))}
        </div>
    );
}