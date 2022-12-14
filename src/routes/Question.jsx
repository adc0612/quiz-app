import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { elapsedTimeState, optionsState, questionIndexState, questionsState, scoreState } from '../atoms';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { decode } from 'html-entities';
import ErrorPage from '../components/common/ErrorPage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useQuestions } from '../hooks/query';
import styles from '../styles/Question.module.css';
import { useNavigate } from 'react-router';
import { STORAGE_KEY } from '../utils/storage';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Question = () => {
  const options = useRecoilValue(optionsState);
  const { isLoading, data, isError, error } = useQuestions({ ...options });
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [score, setScore] = useRecoilState(scoreState);
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  const [decodedQuestions, setDecodedQuestions] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [wrongQuestion, setWrongQuestion] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [curQuestion, setCurQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const navigate = useNavigate();

  const setElapsedTime = useSetRecoilState(elapsedTimeState);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(moment());
  }, []);

  useEffect(() => {
    if (!questions?.length) setQuestions(data?.results);
  }, [data, questions, setQuestions]);

  useEffect(() => {
    const decodedQuestions = questions?.map((q) => {
      return {
        ...q,
        question: decode(q.question),
        correct_answer: decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((ans) => decode(ans)),
      };
    });
    setDecodedQuestions(decodedQuestions);
  }, [questions]);

  useEffect(() => {
    setCurQuestion(decodedQuestions && decodedQuestions[questionIndex]);
    setAnswer(curQuestion && curQuestion.correct_answer);
  }, [decodedQuestions, curQuestion, questionIndex]);

  useEffect(() => {
    if (!curQuestion) {
      return;
    }
    let answers = [...curQuestion.incorrect_answers];
    answers.splice(getRandomInt(curQuestion.incorrect_answers.length), 0, curQuestion.correct_answer);
    setQuestionOptions(answers);
  }, [curQuestion]);

  const saveStorage = (data) => {
    const results = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : [];
    results.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  };

  const handleOptionClick = (e) => {
    setAnswerSelected(true);
    const userAns = e.target.textContent;
    setSelectedAnswer(userAns);
    if (userAns === answer) {
      setScore(score + 1);
    } else {
      const obj = { ...decodedQuestions[questionIndex], selected_answer: userAns };
      const wrongQuestionArr = [...wrongQuestion];
      wrongQuestionArr.push(obj);
      setWrongQuestion(wrongQuestionArr);
    }
    setShowNextBtn(true);
  };

  const handleNextBtnClick = () => {
    setShowNextBtn(false);
    if (questionIndex + 1 < decodedQuestions.length) {
      setAnswerSelected(false);
      setSelectedAnswer(null);
      setQuestionIndex(questionIndex + 1);
    } else {
      const endTime = moment();
      const duration = moment.duration(endTime.diff(startTime));
      const durationStr = `${duration.hours().toString().padStart(2, '0')}:${duration.minutes().toString().padStart(2, '0')}:${duration.seconds().toString().padStart(2, '0')}`;
      setElapsedTime(durationStr);
      const quizDetails = {
        ...options,
        answerCount: score,
        wrongCount: decodedQuestions.length - score,
        totalCount: decodedQuestions.length,
        wrongQuestion: wrongQuestion,
        elapsedTime: durationStr,
      };
      saveStorage(quizDetails);
      navigate('/result');
    }
  };
  const setColor = (option) => {
    if (!answerSelected) return 'primary';
    if (option === selectedAnswer && option !== answer) return 'error';
    if (option === answer) return 'secondary';
    if (option === selectedAnswer && option === answer) return 'secondary';
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <Box>
      <Typography variant='h4'>Questions {questionIndex + 1}</Typography>
      <Typography mt={5}>{curQuestion?.question}</Typography>
      {questionOptions?.map((option, i) => (
        <Box mt={2} key={i}>
          <Button fullWidth onClick={handleOptionClick} className={answerSelected ? styles.click_disabled : ''} color={setColor(option)} variant={answerSelected && (option === answer || option === selectedAnswer) ? 'contained' : 'outlined'}>
            {option}
          </Button>
        </Box>
      ))}
      {showNextBtn && (
        <Box mt={2}>
          <Button fullWidth onClick={handleNextBtnClick} variant='contained'>
            ??????
          </Button>
        </Box>
      )}

      <Box mt={5}>
        ??????: {score} / {decodedQuestions?.length}
      </Box>
    </Box>
  );
};

export default Question;
