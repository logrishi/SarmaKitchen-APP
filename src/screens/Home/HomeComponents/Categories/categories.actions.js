import {apiCall} from 'constants/axiosCalls';

export const getCategories = (params) => {
  apiCall(
    {
      method: 'GET',
      url: 'categories',
      data: null,
    },
    (res, err) => {
      if (!err) {
        params.setCategory(res.data.categories);
        params.setSubscriptions(res.data.subscriptions);
      } else {
        // console.log(err);
      }
    },
  );
};
