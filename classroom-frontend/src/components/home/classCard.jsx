import { Link } from "react-router-dom";
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function ClassCard({ classData }) {
    return (
        <div className="class">
            <div className="meta">
                <h3>{ classData.name }</h3>
                <h4>Room No: { !classData.room_no ? <button><FontAwesomeIcon icon={faPen} /></button> : classData.room_no }</h4>
            </div>
            <div className="info">
                <span>Subject: { !classData.subject ? <button><FontAwesomeIcon icon={faPen} /></button> : classData.subject }</span>
                <span>Students: { JSON.parse(classData.students).length }</span>
            </div>
            <Link className="footer" to={`/class/${classData.code}`}>View Class</Link>
        </div>
    );
}