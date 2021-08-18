import {errorToast, successToast} from 'constants/toasts';

import {apiCall} from 'constants/axiosCalls';

// uses orders API in backend
export const createOrder = (totalPrice, params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'POST',
        url: 'createOrder',
        data: {
          amount: totalPrice,
        },
        accessToken: params.accessToken,
        cancelToken: params.cancelToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res createOrder', res.data);
          params.razorPay(
            res.data.rzPayOrderId,
            res.data.receipt,
            res.data.api_key,
          );
          params.setIsLoading(false);
        } else {
          // handleErrors(err, navigation, setLogOutData, errorMsg);
          params.setIsLoading(false);
          params.navigation.navigate('Cart');
          console.log('err createOrder', err);
        }
      },
    );
  }
};

// save order to db
export const storeOrderToDB = (
  rzPayOrderId,
  razorpay_payment_id,
  razorpay_signature,
  receipt,
  orderItemsArr,
  address_id,
  address,
  phone_no,
  totalPrice,
  params,
) => {
  const successMsg = 'Your transaction was successful!!';
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'POST',
        url: 'orders',
        data: {
          address_id: address_id,
          address: address,
          phone_no: phone_no,
          total_price: totalPrice,
          payment: [
            {
              razorpay_order_id: rzPayOrderId,
              razorpay_payment_id: razorpay_payment_id,
              razorpay_signature: razorpay_signature,
              receipt: receipt,
            },
          ],
          order_status: 'Processing',
          order_status_code: 0,
          orderItems: orderItemsArr,
        },
        accessToken: params.accessToken,
        cancelToken: params.cancelToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('storeOrderToDB res', res.data);
          params.setIsLoading(false);
          params.emptyCart();
          successToast(successMsg, 1);
          source.cancel('CANCELLD');
          params.fcm();
          params.navigation.dispatch(params.StackActions.popToTop());
          params.navigation.navigate('Orders');
        } else {
          // console.log('storeOrderToDB err', err);
          //  handleErrors(e, navigation, setLogOutData, errorMsg);
          params.setIsLoading(false);
          // params.navigation.navigate('Cart');
        }
      },
    );
  }
};

//send notification
export const handleFCMNotification = (
  deviceToken,
  accessToken,
  setIsLoading,
  setSaved,
) => {
  console.log('fcm');
  if (accessToken) {
    setIsLoading(true);
    setSaved(true);
    apiCall(
      {
        method: 'POST',
        url: 'fcm',
        data: {
          title: 'New Order server',
          message: 'New Order Placed server',
          notification_ids: deviceToken,
        },
        accessToken: accessToken,
        cancelToken: params.cancelToken,
      },
      (res, err) => {
        if (!err) {
          console.log('fcm res', res.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log('fcm err', err);
        }
      },
    );
  }
};
