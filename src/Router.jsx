import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Question from './routes/Question';
import Result from './routes/Result';
import Statistic from './routes/Statistic';
import WrongQuestionsNote from './routes/WrongQuestionsNote';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/question' element={<Question />} />
        <Route path='/result' element={<Result />} />
        <Route path='/statistic' element={<Statistic />} />
        <Route path='/note' element={<WrongQuestionsNote />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
