import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { elapsedTimeState, questionIndexState, questionsState, scoreState } from '../atoms';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import styles from '../styles/Result.module.css';

const Result = () => {
  const [score, setScore] = useRecoilState(scoreState);
  const setQuestionIndex = useSetRecoilState(questionIndexState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useRecoilState(elapsedTimeState);

  const resetTest = (questionStatus) => {
    setScore(0);
    setQuestionIndex(0);
    setElapsedTime('');
    if (questionStatus) setQuestions([]);
  };

  const retest = () => {
    resetTest();
    navigate('/question');
  };

  const moveToHome = () => {
    resetTest(true);
    navigate('/');
  };

  const moveToStatistic = () => {
    resetTest(true);
    navigate('/statistic');
  };

  const moveToNote = () => {
    resetTest(true);
    navigate('/note');
  };

  return (
    <Box>
      <Typography variant='h4' align='left' mb={1}>
        퀴즈 종료
      </Typography>
      <Divider />
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
          <RestartAltIcon style={{ marginRight: '4px' }} />
          다시 풀기
        </Button>
      </Box>
      <Box mt={3}>
        <Button onClick={moveToStatistic} fullWidth variant='outlined'>
          <AnalyticsIcon style={{ marginRight: '4px' }} />
          퀴즈 통계
        </Button>
      </Box>
      <Box mt={3}>
        <Button onClick={moveToNote} fullWidth variant='outlined'>
          <EventNoteIcon style={{ marginRight: '4px' }} />
          오답 노트
        </Button>
      </Box>
      <Box mt={3}>
        <Button onClick={moveToHome} fullWidth variant='outlined'>
          <HomeIcon style={{ marginRight: '4px' }} />홈 이동
        </Button>
      </Box>
    </Box>
  );
};

export default Result;
