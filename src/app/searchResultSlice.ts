import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieType } from "../pages/Main";

type searchResultState = {
  data: {
    results?: Array<MovieType> | []
  },
  loading: boolean,
  error: string,
}

const initialState: searchResultState = {
  data: {
    results: []
  },
  loading: true,
  error: ''
}

export const getSearchResultAsync = createAsyncThunk(
  'search/get-result',
  async (query: string) => {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        page: 1,
        query
      }
    });
    
    return  { data: response.data, query };
  }
)

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    clearSearchResult: (state: searchResultState) => {
      state.data.results = [];
      state.loading = true;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchResultAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.data = data;
        state.loading = false
      })
      .addCase(getSearchResultAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Unexpected error. Please contact our administrator.';
        state.loading = false;
      })
  }
});

export const { clearSearchResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;