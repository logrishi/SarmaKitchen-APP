import {apiCall} from 'constants/axiosCalls';

export const updateSubscriptionDetails = async (
  dish,
  status,
  deliveredBy,
  today,
  orderId,
  params,
) => {
  let isUpdatedOrders = true;
  if (params.accessToken) {
    apiCall(
      {
        method: 'POST',
        url: 'updateSubscriptionItems',
        data: {
          product_delivered: dish,
          order_status: status,
          delivered_by: deliveredBy,
          today: today,
          orderId: orderId,
        },
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          //   console.log('res', res.data);
          params.organiseData(res.data, {isUpdatedOrders});
          params.setModalVisible(false);
        } else {
          // console.log('err', err);
          params.setModalVisible(false);
        }
      },
    );
  }
};
