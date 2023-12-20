// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favourites';
import counterReducer from './slices/favoriteCounter';
import moviesReducer from './slices/movies';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        counter: counterReducer,
        movies: moviesReducer,
    },
});

export default store;
