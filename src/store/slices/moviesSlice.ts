import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  topMovies: any[];
  genres: string[];
}

const initialState: MovieState = {
  topMovies: [],
  genres: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setTopMovies(state, action: PayloadAction<any[]>) {
      state.topMovies = action.payload;
    },
    setGenres(state, action: PayloadAction<string[]>) {
      state.genres = action.payload;
    },
  },
});

export const { setTopMovies, setGenres } = moviesSlice.actions;
export default moviesSlice.reducer;