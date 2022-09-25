import { useQuery } from 'react-query';
import _axios from '../utils/axios-utils';

export const getCategory = async () => {
  const { data } = await _axios.get('/api_category.php');
  return data;
};
export function useCategory() {
  return useQuery(['category-list'], () => getCategory());
}

export const getQuestions = async (params) => {
  const { data } = await _axios.get('/api.php', { params });
  return data;
};
export function useQuestions(params) {
  return useQuery(['questions-list', params], () => getQuestions(params));
}
