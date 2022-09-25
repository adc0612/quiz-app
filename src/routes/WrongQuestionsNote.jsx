import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { STORAGE_KEY } from '../utils/storage';
import { Box } from '@mui/system';
import { Button, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const WrongQuestionsNote = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      let wrongQuestionArr = [];
      storageData.forEach((q) => {
        wrongQuestionArr = [...wrongQuestionArr, ...q.wrongQuestion];
      });
      console.log(wrongQuestionArr);
      setQuestions(wrongQuestionArr);
    }
  }, []);

  const backToHome = () => navigate('/');

  return (
    <Box>
      <Typography variant='h4' align='left' mb={1}>
        오답 노트
      </Typography>
      <Divider />
      {questions?.length > 0 ? (
        <>
          <Box textAlign='left'>
            <Button onClick={backToHome}>
              <HomeIcon style={{ marginRight: '4px' }} />홈 이동
            </Button>
          </Box>
          <Box>
            {questions.map((question, i) => (
              <Box key={i} textAlign='left' mt={2}>
                <Typography sx={{ fontSize: '16px' }}>Q: {question.question}</Typography>
                <Box display='flex' justifyContent='space-between'>
                  <Typography sx={{ fontSize: '12px', color: '#666' }}>{question.category}</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#666' }}>{question.difficulty}</Typography>
                </Box>
                <Typography sx={{ fontSize: '18px', color: '#43a047', fontWeight: 'bold' }}>{question.correct_answer}</Typography>
                <Typography sx={{ fontSize: '12px', color: '#f44336' }}>{question.selected_answer}</Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box mt={30}>
          <Typography>퀴즈 결과가 없습니다.</Typography>
          <Box mt={2}>
            <Button onClick={backToHome} variant='contained'>
              <HomeIcon style={{ marginRight: '4px' }} />
              홈으로 돌아가기
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WrongQuestionsNote;
