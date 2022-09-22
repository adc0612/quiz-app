import { atom } from 'recoil';

export const optionsState = atom({
  key: 'optionsState',
  default: {
    loading: false,
    question_category: '',
    question_difficulty: '',
    question_type: '',
    amount_of_questions: 10,
  },
});

const questionsState = atom({
  key: 'questionState',
  default: {
    questions: [],
    index: 0,
    score: 0,
  },
});
