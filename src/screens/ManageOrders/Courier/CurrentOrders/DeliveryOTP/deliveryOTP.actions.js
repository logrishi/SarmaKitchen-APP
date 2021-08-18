import {apiCall} from 'constants/axiosCalls';

export const verifyOtp = async (
  orderId,
  today,
  subscriptionDuration,
  otp,
  params,
) => {
  // console.log(orderId, today, subscriptionDuration, otp, params);
  console.log('called');
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'POST',
        url: 'verifyOtp',
        data: {
          order_id: orderId,
          today: today,
          subscription_duration: subscriptionDuration,
          otp: otp,
        },
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          console.log('res', res.data);
          params.setIsLoading(false);
        } else {
          params.setIsLoading(false);

          console.log('err', err);
        }
      },
    );
  }
};
