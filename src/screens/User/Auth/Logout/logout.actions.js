import {removeData, storeData} from 'constants/asyncStorage';

import {apiCall} from 'constants/axiosCalls';

export const callSignOut = (token, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'logout',
      data: token,
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        console.log('res Logout', res.data);
        // console.log('token', token);
        removeData('userDetails', () => {
          params.setStoredUserData();
        });
        storeData('userDetails', {}, (err) => {
          // console.log(err);
        });
        params.setIsLoading(false);
        params.navigation.navigate('Home');
      } else {
        console.log('err Logout', err);
        params.setIsLoading(false);
      }
    },
  );
};

export const saveCart = (cartItems, cartQty, totalPrice, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'cart',
      data: {
        cart_items: cartItems,
        cart_quantity: cartQty,
        total_price: totalPrice,
      },
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        // console.log('saveCart res', res.data.msg);
        params.emptyCart();
        params.signOutUser();
        params.setIsLoading(false);
        params.setModalVisible(!params.modalVisible);
      } else {
        // console.log('saveCart err', err);
        params.setIsLoading(false);
      }
    },
  );
};
