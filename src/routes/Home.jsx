import React from 'react';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { optionsState } from '../atoms';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorPage from '../components/common/ErrorPage';
import DropDown from '../components/form/DropDown';
import TextInput from '../components/form/TextInput';
import { useNavigate } from 'react-router';
import { useCategory } from '../hooks/query';

const Home = () => {
  // const { isLoading, data, isError, error } = useQuery(['category-dat'], () => getCategory());
  const { isLoading, data, isError, error } = useCategory();
  const [options, setOptions] = useRecoilState(optionsState);
  const navigate = useNavigate();

  const setOptionsValue = (value, key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: key === 'amount' ? Number(value) : value,
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  const submit = (e) => {
    e.preventDefault();
    navigate('/question');
  };

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
        Quiz!!
      </Typography>
      <form>
        <DropDown options={data?.trivia_categories} name={'category'} value={options.category} setValue={setOptionsValue} label='카테고리' />
        <DropDown options={difficultyOptions} name={'difficulty'} value={options.difficulty} setValue={setOptionsValue} label='난이도' />
        <DropDown options={typeOptions} name={'type'} value={options.type} setValue={setOptionsValue} label='문항 유형' />
        <TextInput name={'amount'} value={options.amount} setValue={setOptionsValue} label='문항 갯수' />
        <Box mt={3} width='100%'>
          <Button variant='contained' color='primary' type='submit' onClick={submit} fullWidth>
            퀴즈 시작
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Home;
