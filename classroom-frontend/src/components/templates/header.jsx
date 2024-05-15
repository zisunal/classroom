import { Link } from "react-router-dom";

export default function Header({appInfo}) {
    return (
        <header>
            <h2>
                <Link to={"/"}>{appInfo.name}</Link>
            </h2>
            <nav>
                <ul>
                    <li><Link to={"/"}>My Classes</Link></li>
                    <li><Link to={"/create"}>Create Class</Link></li>
                    <li><Link to={"/join"}>Join Class</Link></li>
                </ul>
            </nav>
        </header>
    );
}