import Teaching from "../components/home/teaching";
import Studying from "../components/home/studying";

export default function Home() {
    return (
        <main>
            <section>
                <Teaching /> 
                <Studying />
            </section>
        </main>
    );
}