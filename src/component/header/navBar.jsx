import { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './navBar.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axiosInstance from '../../axiosConfig/instance';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import { languageContext } from '../../contexts/language';
import { isLoginContext } from '../../contexts/isLogin';
import movies from '../../assets/movies.svg'
import { localization } from '../../utiles/localization';

function NavBar() {
    let { language, setLanguage } = useContext(languageContext);
    let { isLogin, setIsLogin } = useContext(isLoginContext);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const counter = useSelector((state) => state.counter.counter)

    const goLogIn = () => {
        navigate('/login');
    }
    const goLogOut = () => {
        setIsLogin(false);
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        navigate('/login');
    }
    const goRegister = () => {
        navigate('/register');
    }

    const search = () => {
        axiosInstance.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: '91f412b281dfcb0bec628c2a005ac224',
                query: searchValue,
            },
        })
            .then((res) => {
                console.log("API Response: For the fucking Search ", res.data);
                setSearchResults(res.data)
                console.log(searchResults);
            })
            .catch((err) => {
                console.error("API Error Mother Fucker:", err);
            });

    }
    const languageChange = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };
    const pageDirection= language =='en' ?"ltr" : "rtl"

    return (

        <Navbar data-bs-theme="dark" className='sticky-top' style={{ backgroundColor: "#24021f" }}>
            <Container fluid className='d-flex align-items-center justify-content-between'>
                <div className="d-flex align-items-center">
                    <Navbar.Brand className='me-1'><Link to="/" dir={pageDirection}>
                        <span>{language== 'en'?localization.moviesLand.en:localization.moviesLand.ar}</span>
                        <img className='mb-2' src={movies} style={{ height: "5vh", width: "4vw" }} />
                    </Link></Navbar.Brand>
                    <Nav>
                        <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/">{language == 'en' ? localization.home.en : localization.home.ar}</NavLink>
                        <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/about">{language == 'en' ? localization.about.en : localization.about.ar}</NavLink>
                        <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/contact">{language == 'en' ? localization.contact.en : localization.contact.ar}</NavLink>
                        <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/favorites">{language == 'en' ? localization.favorites.en : localization.favorites.ar} <Badge bg="secondary   ">{counter}</Badge></NavLink>
                    </Nav>
                </div>
                <Form className="d-flex align-items-center">
                    <InputGroup className="me-2">
                        <Form.Control
                            className={language == 'en' ? 'text-start' : 'text-end'}
                            type="search"
                            placeholder={language == 'en' ? localization.search.en : localization.search.ar}
                            aria-label={language== 'en'?localization.search.en:localization.search.ar}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={search}>{language == 'en' ? localization.search.en : localization.search.ar}</Button>
                    </InputGroup>
                    <Container>
                        {isLogin ? <Button variant='danger' className='me-3' onClick={goLogOut}>{language == 'en' ? localization.logout.en : localization.logout.ar}</Button> :
                            <Button variant='success' className='me-3' onClick={goLogIn}>{language== 'en'?localization.login.en:localization.login.ar}</Button>

                        }
                        {isLogin ? null : <Button variant='success' onClick={goRegister}>{language== 'en'?localization.register.en:localization.register.ar}</Button>}
                    </Container>
                    <Container>
                        <Form.Check className='text-white'
                            type="switch"
                            id="custom-switch"
                            label={`Language${'\u00A0'} (${language === 'en' ? 'English' : 'Arabic'})`}
                            checked={language == 'ar'}
                            onChange={languageChange}
                        />
                    </Container>
                </Form>
            </Container>
        </Navbar>

    );
}

export default NavBar;
