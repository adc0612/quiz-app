import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { elapsedTimeState, questionIndexState, questionsState, scoreState } from '../atoms';
import styles from '../styles/Result.module.css';

const Result = () => {
  const [score, setScore] = useRecoilState(scoreState);
  const setQuestionIndex = useSetRecoilState(questionIndexState);
  const [questions, setQuestions] = useRecoilState(questionsState);
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
    <Box>
      <Typography variant='h3' fontWeight='bold'>
        퀴즈 종료
      </Typography>
      <div className={styles.flex_box}>
        <div className={styles.info_box}>
          <p>
            점수: <b>{`${score} / ${questions.length}`}</b>
          </p>
          <p>
            정답 개수: <b>{score}</b>
          </p>
          <p>
            오류 개수: <b>{questions.length - score}</b>
          </p>
        </div>

        <div className={styles.info_box}>
          <p>
            경과시간: <b>{elapsedTime}</b>
          </p>
        </div>
      </div>
      <Box mt={3}>
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
