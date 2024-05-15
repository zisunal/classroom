import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BtnLoader from '../components/templates/btnLoader';

export default function Register({appInfo}) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [fullNameErrors, setFullNameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [cPasswordErrors, setCPasswordErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [registering, setRegistering] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registering) {
            return;
        }
        setRegistering(true);
        if (fullNameErrors.length > 0 || emailErrors.length > 0 || passwordErrors.length > 0 || cPasswordErrors.length > 0) {
            setErrors(['Please fix the errors before submitting']);
            return;
        }
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_SERVER + 'register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fullName, email, password, c_password: cPassword }),
            });
            if (!response.ok) {
                throw new Error('Invalid login');
            } else {
                const data = await response.json();
                setRegistering(false);
                navigate('/otp/' + data.id);
            }
        } catch (error) {
            setErrors(error.message);
            setRegistering(false);
        }
    }
    const changeFullName = (target) => {
        setFullName(target.value);
        let errors = [];
        if (target.value.length < 5) {
            errors.push('Name must be at least 5 characters');
        }
        if (target.value.length > 30) {
            errors.push('Name must be less than 30 characters');
        }
        // Check if name contains anything but letters and spaces
        if (!target.value.match(/^[a-zA-Z ]+$/)) {
            errors.push('Name must contain only letters and spaces');
        }
        setFullNameErrors(errors);
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
    const changeCPassword = (target) => {
        setCPassword(target.value);
        let errors = [];
        if (target.value !== password) {
            errors.push('Passwords do not match');
        }
        setCPasswordErrors(errors);
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
            <h1>Register to {appInfo.name}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={fullName}
                        placeholder='Your Name'
                        onChange={(e) => changeFullName(e.target)}
                    />
                    {fullNameErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </label>
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
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={cPassword}
                        onChange={(e) => changeCPassword(e.target)}
                    />
                    {cPasswordErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </label>
                <label>
                    <span>By using {appInfo.name}, you agree to our <Link to='/terms'>Terms of Service</Link> and <Link to='/privacy'>Privacy Policy</Link></span>
                </label>
                {registering ? <BtnLoader /> : <button type="submit">Register</button>}
                <div className="hor">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </form>
            
            {errors && errors.length > 0 && errors.map((error, index) => (
                <p key={index} className='error'>{error}</p>
            ))}
        </div>
    );
}