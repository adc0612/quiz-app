import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { elapsedTimeState, questionIndexState, questionsState, scoreState } from '../atoms';

const Result = () => {
  const [score, setScore] = useRecoilState(scoreState);
  const setQuestionIndex = useSetRecoilState(questionIndexState);
  const setQuestions = useSetRecoilState(questionsState);
  const navigate = useNavigate();
  const elapsedTime = useRecoilValue(elapsedTimeState);

  const retest = () => {
    setScore(0);
    setQuestionIndex(0);
    navigate('/question');
  };

  const moveToHome = () => {
    setScore(0);
    setQuestionIndex(0);
    setQuestions([]);
    navigate('/');
  };

  return (
    <Box mt={30}>
      <Typography variant='h3' fontWeight='bold'>
        총 점수 {score}
      </Typography>
      <Typography variant='h5' fontWeight='bold'>
        경과시간 {elapsedTime}
      </Typography>
      <Box mt={5}>
        <Button onClick={retest} fullWidth variant='outlined'>
          다시 풀기
        </Button>
      </Box>
      <Box mt={3}>
        <Button onClick={moveToHome} fullWidth variant='outlined'>
          홈으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
};

export default Result;
