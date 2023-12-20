import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../axiosConfig/instance';
import { removeFromFavorites } from '../../store/slices/favourites';
import { decreaseCounter } from '../../store/slices/favoriteCounter';

import { Link } from 'react-router-dom';



function Favorites() {
    const favorites = useSelector((state) => state.favorites.list);
    const dispatch = useDispatch();

    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const remove = (id) => {
        dispatch(removeFromFavorites({ id }));
        dispatch(decreaseCounter())
    }
    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const promises = favorites.map(async (favorite) => {
                try {
                    const response = await axiosInstance.get(`/${favorite.id}`);
                    return response.data;
                } catch (error) {
                    console.error("Error fetching movie details:", error);
                    return null;
                }
            });

            const movies = await Promise.all(promises);
            setFavoriteMovies(movies.filter(movie => movie !== null));
        };

        fetchFavoriteMovies();
    }, [favorites]);

    return (
        <>
            {favoriteMovies.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh", width: "100vw" }}>
                    <div className="text-white">
                        <h1 className="text-center">There is nothing here</h1>
                        <Link to="/">
                            <h3 className="text-success"><i className="fas fa-hand-point-right"></i>
                            Add some movies to your favorites
                            <i className="fas fa-hand-point-left"></i>
                            </h3>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-white">Favorites</h2>
                    <div className="text-white" style={{ height: "80vh" }}>
                        {favoriteMovies.map((movie) => (
                            <div key={movie.id} className="m-3 d-flex justify-content-between border-top border-bottom">
                                <div className="d-flex my-2">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}
                                        style={{ maxWidth: '10vw', maxHeight: '10vh' }}
                                    />
                                    <div className="ms-3 mt-4">
                                        <h3>{movie.title}</h3>
                                    </div>
                                </div>
                                <div>
                                    <button style={{ width: "45%", height: "45%" }} className="btn btn-danger mt-4 me-5"
                                        onClick={() => { remove(movie.id) }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default Favorites;
