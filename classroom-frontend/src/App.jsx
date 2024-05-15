import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/templates/header';
import Footer from './components/templates/footer';
import Home from './pages/home';
import Loading from './components/home/loading';
import Create from './pages/create';
import Login from './pages/login';
import Register from './pages/register';
import OTP from './pages/otp';

function App() {
    const [appInfo, setAppInfo] = useState({});
    const [appLoading, setAppLoading] = useState(true);
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(useSelector((state) => state.auth));
    useEffect(() => {
        fetch(process.env.REACT_APP_PROXY_SERVER + 'app-info')
            .then((res) => res.json())
            .then((data) => {
                setAppInfo(data);
                setAppLoading(false);
            });
        let lsAuth = window.localStorage.getItem('auth');
        if (lsAuth) {
            setAuth(JSON.parse(lsAuth));
            dispatch({
                type: 'LOGIN',
                payload: JSON.parse(lsAuth),
            });
        }
    }, []);

    useEffect(() => {
        updatePageMeta();
    }, [appInfo]);

    function updatePageMeta() {
        document.title = appInfo.meta_title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', appInfo.meta_description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = appInfo.meta_description;
            document.head.appendChild(meta);
        }
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', appInfo.meta_keywords);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = appInfo.meta_keywords;
            document.head.appendChild(meta);
        }
    }

    if (appLoading) {
        return <Loading />;
    }

    if (auth.user === null || auth.token === null || auth.tokenExpires === null || auth.tokenExpires < Date.now() / 1000) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login appInfo={appInfo} />} />
                    <Route path="/login" element={<Login appInfo={appInfo} />} />
                    <Route path="/register" element={<Register appInfo={appInfo} />} />
                    <Route path="/otp/:uid" element={<OTP />} />
                    <Route path="/forgot-password" element={<Login appInfo={appInfo} />} />
                </Routes>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header appInfo={appInfo} />
                 <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
                <Footer appInfo={appInfo} />
            </div>
        </BrowserRouter>
    );
}

export default App;
