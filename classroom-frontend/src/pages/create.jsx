import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BtnLoader from '../components/templates/btnLoader';
import { useSelector } from 'react-redux';

export default function Create() {
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [section, setSection] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const createClass = async (e) => {
        e.preventDefault();
        if (creating) return;
        setCreating(true);
        setError('');
        if (className === '' || subject === '' || section === '' || room === '') {
            setError('Please fill all the fields');
            setCreating(false);
            return;
        }
        if (auth.user === null) {
            setError('You are not logged in');
            setCreating(false);
            return;
        }
        const data = {
            name: className,
            subject,
            section,
            room_no: room,
            teacher_id: auth.user.id
        }
        const res = await fetch(process.env.REACT_APP_PROXY_SERVER + 'create-class', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            setError('Something went wrong');
            setCreating(false);
            return;
        }
        const resData = await res.json();
        if (resData.error) {
            setError(resData.error);
            setCreating(false);
            return;
        }
        Swal.fire('Success', 'Class created successfully', 'success').then(() => {
            setCreating(false);
            setClassName('');
            setSubject('');
            setSection('');
            setRoom('');
            navigate('/');
        });
    }

    return (
        <main>
            <section>
                <h2 style={{textAlign: 'center'}}>Create a new Class</h2>
                <form className="create-class" onSubmit={(e) => createClass(e)}>
                    <label htmlFor="className">
                        <span>Class Name</span>
                        <input 
                        type="text" 
                        id="className"
                        placeholder='Eg: Class 10'
                        value={className}
                        onChange={e => setClassName(e.target.value)}
                        required 
                        />
                    </label>
                    <label htmlFor="sub">
                        <span>Subject</span>
                        <input 
                        type="text" 
                        id="sub"
                        placeholder='Eg: Programming'
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required 
                        />
                    </label>
                    <label htmlFor="sec">
                        <span>Section Name</span>
                        <input 
                        type="text" 
                        id="sec"
                        placeholder='Eg: A'
                        value={section}
                        onChange={e => setSection(e.target.value)}
                        required 
                        />
                    </label>
                    <label htmlFor="room">
                        <span>Room No</span>
                        <input 
                        type="text" 
                        id="room"
                        placeholder='Eg: 101'
                        value={room}
                        onChange={e => setRoom(e.target.value)}
                        required 
                        />
                    </label>
                    {creating ? <BtnLoader /> : <button type="submit">Create</button>}
                </form>
                {error && <p className='error-p'>{error}</p>}
            </section>
        </main>
    );
}