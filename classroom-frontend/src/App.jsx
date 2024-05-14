import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/templates/header';
import Footer from './components/templates/footer';
import Home from './pages/home';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
