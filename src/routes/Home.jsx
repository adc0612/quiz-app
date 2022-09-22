import React from 'react';
import DropDown from '../components/form/DropDown';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextInput from '../components/form/TextInput';
import { useCategoryData } from '../hooks/query';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorPage from '../components/common/ErrorPage';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { optionsState } from '../atoms';

const Home = () => {
  const { isLoading, data, isError, error } = useCategoryData();
  // const [{question_category, question_difficulty, question_type, amount_of_questions}, setOptions] = useRecoilState(optionsState);
  const [options, setOptions] = useRecoilState(optionsState);

  const setOptionsValue = (value, key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(options);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  const difficultyOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choice' },
    { id: 'boolean', name: 'True/False' },
  ];

  return (
    <div>
      <Typography variant='h2' fontWeight='bold'>
        퀴즈 풀기
      </Typography>
      <form>
        <DropDown options={data.trivia_categories} name={'question_category'} value={options.question_category} setValue={setOptionsValue} label='카테고리' />
        <DropDown options={difficultyOptions} name={'question_difficulty'} value={options.question_difficulty} setValue={setOptionsValue} label='난이도' />
        <DropDown options={typeOptions} name={'question_type'} value={options.question_type} setValue={setOptionsValue} label='문항 유형' />
        <TextInput label='문항 갯수' />
        <Box mt={3} width='100%'>
          <Button variant='contained' color='primary' type='submit' fullWidth>
            퀴즈 시작
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Home;
