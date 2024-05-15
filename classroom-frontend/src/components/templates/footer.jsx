import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer({appInfo}) {
    useEffect(() => {
        if (appInfo.copyright_url) {
            if (document.getElementById("cprt_with_url").style.display === "none") {
                document.getElementById("cprt_with_url").style.display = "block";
            }
            document.getElementById("cprt_with_url").innerHTML = !appInfo.copyright ? "All rights reserved to " + appInfo.name : appInfo.copyright;
            document.getElementById("cprt_with_url").href = appInfo.copyright_url;
            document.getElementById("cprt_without_url").style.display = "none";
        } else {
            if (document.getElementById("cprt_without_url").style.display === "none") {
                document.getElementById("cprt_without_url").style.display = "block";
            }
            document.getElementById("cprt_without_url").innerHTML = !appInfo.copyright ? "All rights reserved to " + appInfo.name : appInfo.copyright;
            document.getElementById("cprt_with_url").style.display = "none";
        }
    }, [appInfo]);
    return (
        <footer>
            <p id="cprt_without_url"></p>
            <a id="cprt_with_url"></a>
            <nav>
                <ul>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                </ul>
            </nav>
        </footer>
    );
}