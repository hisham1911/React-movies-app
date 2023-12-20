import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosConfig/instance";

export const moviesAction = createAsyncThunk('movies/getAll', async (page) => {
    const res = await axiosInstance.get('/popular', {
        params: {
            page,
        },
    });
    return res.data.results;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        updateMovies: (state, action) => {
            state.movies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(moviesAction.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const { setCurrentPage, updateMovies } = moviesSlice.actions;
export default moviesSlice.reducer;