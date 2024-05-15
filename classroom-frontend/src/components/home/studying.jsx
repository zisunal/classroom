import { useState, useEffect } from "react";
import ClassCard from "./classCard";

export default function Studying() {
    const [classes, setClasses] = useState([]);
    return (
        <section>
            <h3>You'r Studying in {classes.length} class{classes.length > 1 ? 'es' : ''}</h3>
            <div className="classes">
                {classes.map((classData) => (
                    <ClassCard key={classData.code} classData={classData} />
                ))}
            </div>
        </section>
    );
}