import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type configState = {
  loading: boolean,
  error: string,
  data: {
    images: {
      secure_base_url: string,
      backdrop_sizes: Array<string>
    },
  }
}

const initialState: configState = {
  loading: true,
  error: '',
  data: {
    images: {
      secure_base_url: '',
      backdrop_sizes: ['w300']
    }
  }
}

export const getConfigAsync = createAsyncThunk(
  'config/get',
  async () => {
    const response = await axios.get('https://api.themoviedb.org/3/configuration', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY
      }
    });
    return response.data;
  }
)

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConfigAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getConfigAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Unexpected error. Please contact our administrator.';
        state.loading = false;
      })
  }
});

export default configSlice.reducer;
