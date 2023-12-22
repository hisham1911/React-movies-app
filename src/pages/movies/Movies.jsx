import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { moviesAction, setCurrentPage, updateMovies } from '../../store/slices/movies';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favourites';
import { languageContext } from '../../contexts/language';
import { decreaseCounter, increaseCounter } from '../../store/slices/favoriteCounter';

function Movies() {
    const moviesArr = useSelector((state) => state.movies.movies);
    const currentPage = useSelector((state) => state.movies.currentPage);
    const favorites = useSelector((state) => state.favorites.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {language}=useContext(languageContext)
    // const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        dispatch(moviesAction(currentPage));
    }, [dispatch, currentPage]);

    const next = () => {
        dispatch(setCurrentPage(currentPage + 1));
    };

    const previous = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };
    const toggleFavoriteState = (id) => {
        const isFavorite = favorites.some((favorite) => favorite.id === id);

        if (isFavorite) {
            dispatch(removeFromFavorites({ id }));
            dispatch(decreaseCounter());
        } else {
            dispatch(addToFavorites({ id }));
            dispatch(increaseCounter());
        }

        const updatedMovies = moviesArr.map((movie) => {
            if (movie.id === id) {
                return { ...movie, isFavorite: !isFavorite };
            }
            return movie;
        });


        dispatch(updateMovies(updatedMovies));
    };
    return (
        <>
            <Container fluid>
                <Row md={3} className='mb-5'>
                    {moviesArr.map((movie) => (
                        <Col key={movie.id} className='d-flex justify-content-center mb-5'>
                            <Card style={{ color: 'white', backgroundColor: '#141414df' }}>
                                <Card.Img className='w-100' variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                                <Card.Body className='p-0'>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.overview}</Card.Text>
                                    <Container>
                                        <Button className='btn btn-primary' onClick={() => { navigate(`/details/${movie.id}`) }}> Details</Button>
                                        <span className='d-inline-block btn btn-primary ms-3' onClick={() => { toggleFavoriteState(movie.id) }}>
                                            <span className='mx-2'>Add To Favorites</span><AiFillHeart
                                                className={` fs-4 ${movie.isFavorite ? 'text-danger' : 'text-white'}`}
                                            />
                                        </span>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className='container-fluid d-flex justify-content-around'>
                    <Button className='btn btn-secondary' onClick={previous}>&lt; Previous</Button>
                    <Button className='btn btn-secondary' onClick={next} >Next &gt;</Button>
                </div>
            </Container>
        </>
    );
}

export default Movies;
