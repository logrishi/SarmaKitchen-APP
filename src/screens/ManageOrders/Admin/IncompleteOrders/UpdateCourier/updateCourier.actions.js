import {apiCall} from 'constants/axiosCalls';

export const updateOrderCourier = async (orderId, selectedCourier, params) => {
  let isUpdatedOrders = true;

  if (params.accessToken) {
    apiCall(
      {
        method: 'POST',
        url: 'updateOrderCourier',
        data: {
          order_id: orderId,
          delivered_by: selectedCourier,
        },
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          params.organiseData(res.data, {isUpdatedOrders});
          params.setModalVisible(false);
          // console.log(res.data);
        } else {
          params.setModalVisible(false);
          // console.log('err', err);
        }
      },
    );
  }
};
