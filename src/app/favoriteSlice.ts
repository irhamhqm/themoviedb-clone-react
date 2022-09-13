import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../pages/Main";


type favoriteState = {
  favorites: {
    [uuid: string]: favoriteMovie
  }
}

interface favoriteMovie extends MovieType {
  dateAdded: number
}

const initialState: favoriteState = {
  favorites: {}
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state: favoriteState, action: PayloadAction<MovieType>) => {
      const { id } = action.payload;
      state.favorites[id] = { ...action.payload, dateAdded: Date.now()};
    },
    removeFavorite: (state: favoriteState, action: PayloadAction<string>) => {
      const id = action.payload;
      const { [id]: removed, ...rest } = state.favorites;
      state.favorites = rest;
    }
  }
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;