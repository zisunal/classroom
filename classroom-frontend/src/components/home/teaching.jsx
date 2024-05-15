import { useState, useEffect } from "react";
import ClassCard from "./classCard";
import { useSelector } from "react-redux";

export default function Teaching() {
    const [classes, setClasses] = useState([]);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_PROXY_SERVER + 'get-teaching-classes', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ teacher_id: auth.user.id })
            });
            if (!res.ok) {
                console.log('Something went wrong');
                return;
            }
            const resData = await res.json();
            if (resData.error) {
                console.log(resData.error);
                return;
            }
            setClasses(resData.classes);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section style={{marginBottom: '2rem'}}>
            <h3>You'r Teaching to {classes.length} class{classes.length > 1 ? 'es' : ''}</h3>
            <div className="classes">
                {classes.map((classData) => (
                    <ClassCard key={classData.code} classData={classData} />
                ))}
            </div>
        </section>
    );
}