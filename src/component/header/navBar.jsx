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
import logo from '../../assets/360_F_590754013_CoFRYEcAmLREfB3k8vjzuyStsDbMAnqC-removebg-preview.png';

function NavBar() {
    let { language, setLanguage } = useContext(languageContext);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const counter = useSelector((state) => state.counter.counter)

    const goLogIn = () => {
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

    return (
        
            <Navbar bg="dark" data-bs-theme="dark" className='sticky-top'>
                <Container fluid className='d-flex align-items-center justify-content-between'>
                    <div className="d-flex align-items-center">
                        <Navbar.Brand className='me-1'><Link to="/">
                            <img src={logo} style={{height:"5vh", width:"8vw"}} />
                            </Link></Navbar.Brand>
                        <Nav>
                            <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/">Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/about">About</NavLink>
                            <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/contact">Contact Us</NavLink>
                            <NavLink className={({ isActive }) => (isActive) ? 'acctive' : ''} to="/favorites">Favorites <Badge bg="secondary   ">{counter}</Badge></NavLink>
                        </Nav>
                    </div>
                    <Form className="d-flex align-items-center">
                        <InputGroup className="me-2">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <Button variant="outline-success" onClick={search}>Search</Button>
                        </InputGroup>
                        <Container>
                            <Button variant='success' className='me-3' onClick={goLogIn}>Log In</Button>
                            <Button variant='success' onClick={goRegister}>Register</Button>
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
