import axios from 'axios';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { MovieType } from '../pages/Main';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface MoviesResponse {
  page: number,
  results: Array<MovieType>,
  total_pages: number,
  total_results: number
}

export const useGetMovies = (url: string, params: { api_key: string } ) => {
  const [data, setData] = useState<MoviesResponse>({ page: 1, results: [], total_pages: 1, total_results: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [fetchMoreError, setFetchMoreError] = useState('');

  useEffect(() => {
    axios.get(url, {
      params: {
        ...params,
        page: 1
      }
    }).then((response) => {
      setData(response.data);
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const fetchMore = () => {
    setFetchMoreLoading(true);
    axios.get(url, {
      params: {
        ...params,
        page: currentPage + 1
      }
    }).then((response) => {
      const { page, results, total_pages, total_results } = response.data;
      setData((prev) => ({ page, results: [...prev.results, ...results], total_pages, total_results }));
      setCurrentPage((prev) => prev + 1);
      setFetchMoreLoading(false);
    }).catch((error) => {
      setFetchMoreError(error.message);
      setFetchMoreLoading(false);
    });
  }

  return {
    data, loading, error, fetchMore, fetchMoreLoading, fetchMoreError
  }
}

export const useGetMovieDetail = (url: string, params: { api_key: string }) => {
  const [data, setData] = useState<MovieType>({ id: 1, title: '', overview: '', release_date: '', genres: [{ id: 1, name: '' }], backdrop_path: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(url, {
      params
    }).then((response) => {
      setData(response.data);
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  return {
    data, loading, error
  }
}