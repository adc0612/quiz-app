import { useQuery } from 'react-query';
import { getCategory } from '../apis';

export const useCategoryData = (onSuccess, onError) => {
  return useQuery('car-list', getCategory, {
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};
