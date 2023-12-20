import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/instance';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchResults({ searchQuery }) {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Make an API request to search for movies using the searchQuery
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=91f412b281dfcb0bec628c2a005ac224&query=${searchQuery}`)
            .then((res) => {
                setSearchResults(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchQuery]);

    return (
        <Row md={3} className='me-0 mb-5'>
            {searchResults.map((movie) => (
                <Col key={movie.id} className='d-flex justify-content-center mb-5'>
                    <Card style={{ color: 'white', backgroundColor: '#141414df' }}>
                        <Card.Img
                            className='w-100'
                            variant='top'
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        />
                        <Card.Body className='p-0'>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.overview}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default SearchResults;
