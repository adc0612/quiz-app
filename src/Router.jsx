import React from 'react';
import Home from './routes/Home';
import Question from './routes/Question';
import Result from './routes/Result';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/question' element={<Question />} />
        <Route path='/result' element={<Result />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
