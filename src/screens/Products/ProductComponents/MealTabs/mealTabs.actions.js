import {apiCall} from 'constants/axiosCalls';

export const getProducts = async (params) => {
  params.setIsListLoading(true);
  apiCall(
    {
      method: 'GET',
      url: `productsByMealType?meal_type=${params.meal_type} && subscription=${params.subscriptions[0]}`,
      data: null,
      // params: {setIsListLoading},
    },
    (res, err) => {
      if (!err) {
        params.setProducts(res.data);
        params.setIsListLoading(false);
      } else {
        params.setIsListLoading(false);
      }
    },
  );
};
