import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axiosInstance from '../../axiosConfig/instance';

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        let res = await axiosInstance.get(`/${id}`);
        setMovie(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [id]);

  if (loading) {
    return <p className='text-white'>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(movie);

  return (
    <div className='d-flex justify-content-center' style={{ marginBottom: '39px', marginTop: '90px' }}>
      <Card style={{ width: '30%' }}>
        <Card.Img style={{ height: '400px' }} variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className='text-success fs-5'>
            {movie.status}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <span>{movie.overview}</span>
          </ListGroup.Item>
          <ListGroup.Item style={{ color: 'blue' }}>
            <Link to="/movies">{movie.homepage}</Link>
          </ListGroup.Item>
          <ListGroup.Item>Original Language: <span className='text-primary'>{movie.original_language}</span> </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Details;
