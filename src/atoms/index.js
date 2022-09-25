import { atom } from 'recoil';

export const optionsState = atom({
  key: 'optionsState',
  default: {
    category: '',
    difficulty: '',
    type: '',
    amount: 10,
  },
});

export const questionsState = atom({
  key: 'questionsState',
  default: [],
});

export const scoreState = atom({
  key: 'scoreState',
  default: 0,
});

export const questionIndexState = atom({
  key: 'questionIndexState',
  default: 0,
});
