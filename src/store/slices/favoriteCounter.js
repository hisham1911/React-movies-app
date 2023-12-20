import { createSlice } from '@reduxjs/toolkit';

const favoriteCounter = createSlice({
    name: 'favoriteCounter',
    initialState: { counter: 0 },
    reducers: {
        increaseCounter: (state) => {
            return { ...state, counter: state.counter + 1 };
        },
        decreaseCounter: (state) => {
            if (state.counter > 0) {
                return { ...state, counter: state.counter - 1 };
            }
            return state;
        },
    },
});

export const { increaseCounter, decreaseCounter } = favoriteCounter.actions;
export default favoriteCounter.reducer;
