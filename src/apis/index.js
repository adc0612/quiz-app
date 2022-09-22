import _axios from '../utils/axios-utils';

export const getCategory = () => {
  return _axios.get('/api_category.php');
};
