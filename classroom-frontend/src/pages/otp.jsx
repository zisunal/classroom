import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import BtnLoader from '../components/templates/btnLoader';

export default function Login() {
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [otp5, setOtp5] = useState('');
    const [otp6, setOtp6] = useState('');
    const [error, setError] = useState('');
    const [resending, setResending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { uid } = useParams();
    const otpFields = Array.from(document.querySelectorAll('.otp-field'));

    useEffect(() => {
        if (uid === null || uid === undefined || !Number.isInteger(parseInt(uid))) {
            navigate('/login');
        }
        document.title = 'Verify OTP';
    }, []);

    const sendOtp = async () => {
        if (resending) {
            return;
        }
        setResending(true);
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_SERVER + 'send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: uid }),
            });
            if (!response.ok) {
                throw new Error('Invalid login');
            }
            setResending(false);
            Swal.fire({
                icon: 'success',
                title: 'OTP Sent',
                text: 'OTP has been sent to your email address',
            });
        } catch (error) {
            setError(error.message);
            setResending(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (verifying) {
            return;
        }
        setVerifying(true);
        try {
            const response = await fetch(process.env.REACT_APP_PROXY_SERVER + 'verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: uid, otp: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`}),
            });
            if (!response.ok) {
                throw new Error('Invalid OTP');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setVerifying(false);
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified',
                text: 'You have been successfully verified. Now login to continue',
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
            setVerifying(false);
        }
    }
    const changeOtp1 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp1(target.value);
        if (target.value.length > 0) {
            otpFields[1].focus();
        } else {
            otpFields[0].focus();
        }
    }
    const changeOtp2 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp2(target.value);
        if (target.value.length > 0) {
            otpFields[2].focus();
        } else {
            otpFields[0].focus();
        }
    }
    const changeOtp3 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp3(target.value);
        if (target.value.length > 0) {
            otpFields[3].focus();
        } else {
            otpFields[1].focus();
        }
    }
    const changeOtp4 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp4(target.value);
        if (target.value.length > 0) {
            otpFields[4].focus();
        } else {
            otpFields[2].focus();
        }
    }
    const changeOtp5 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp5(target.value);
        if (target.value.length > 0) {
            otpFields[5].focus();
        } else {
            otpFields[3].focus();
        }
    }
    const changeOtp6 = (target) => {
        if (target.value.length > 1) {
            target.value = target.value[1];
        }
        setOtp6(target.value);
        if (target.value.length > 0) {
            otpFields[5].blur();
        } else {
            otpFields[4].focus();
        }
    }

    return (
        <div className='login'>
            <h1>Verify your OTP</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    OTP:
                    <div className="otp-fields">
                        <input
                            type="text"
                            value={otp1}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp1(e.target)}
                            className='otp-field'
                        />
                        <input
                            type="text"
                            value={otp2}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp2(e.target)}
                            className='otp-field'
                        />
                        <input
                            type="text"
                            value={otp3}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp3(e.target)}
                            className='otp-field'
                        />
                        <input
                            type="text"
                            value={otp4}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp4(e.target)}
                            className='otp-field'
                        />
                        <input
                            type="text"
                            value={otp5}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp5(e.target)}
                            className='otp-field'
                        />
                        <input
                            type="text"
                            value={otp6}
                            placeholder='0'
                            min={0}
                            max={9}
                            onChange={(e) => changeOtp6(e.target)}
                            className='otp-field'
                        />
                    </div>
                </label>
                {verifying ? <BtnLoader /> : <button type="submit">VERIFY</button>}
                <div className='hor'>
                    <label>
                        <span>OTP is sent to your Email Address</span>
                    </label>
                    {resending ? <BtnLoader /> : <button type='button' onClick={sendOtp}>Resend</button>}
                </div>
            </form>
            
            {error && <p className='error-p'>{error}</p>}
        </div>
    );
}