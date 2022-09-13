import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { getConfigAsync } from './app/configSlice';
import { useAppDispatch } from './app/hooks';
import Layout from './components/Layout';
import Category from './pages/Category';
import Main from './pages/Main';
import MovieDetail from './pages/MovieDetail';
import User from './pages/User';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConfigAsync());
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path="category/:category" element={<Category />}></Route>
          <Route path="movie/:movieId" element={<MovieDetail />}></Route>
          <Route path="user" element={<User />} ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
