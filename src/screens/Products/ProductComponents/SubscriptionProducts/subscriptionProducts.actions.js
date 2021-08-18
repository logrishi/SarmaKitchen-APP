import {apiCall} from 'constants/axiosCalls';

export const getSubscriptions = (params) => {
  apiCall(
    {
      method: 'GET',
      url: `getSubscriptions?subscription=${params.selectedSubscription}`,
      data: null,
    },
    (res, err) => {
      if (!err) {
        params.setMealBoxes(res.data);
      } else {
        // console.log(err);
      }
    },
  );
};

export const getDates = (params) => {
  apiCall(
    {
      method: 'GET',
      url: `getDates?subscription=${params.selectedSubscription}`,
      data: null,
    },
    (res, err) => {
      if (!err) {
        params.setStartDate(res.data.tomorrow);
        params.setEndDate(res.data.endDate);
      } else {
        // console.log(err);
      }
    },
  );
};
