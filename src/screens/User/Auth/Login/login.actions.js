import {apiCall} from 'constants/axiosCalls';
import {storeData} from 'constants/asyncStorage';

export const callLogin = async (values, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'login',
      data: {
        email: values.email,
        password: values.password,
        token: params.token,
      },
      cancelToken: params.cancelToken,
    },
    (res, err) => {
      if (!err) {
        console.log('res login', res.data);
        console.log('params.isMounted', params.isMounted);
        params.setResult(res.data);
        // setLoggedIn(true);
        // if (params.isMounted) {
        // storeData('userDetails', res.data, (err) => {
        //   // console.log(err);
        // });
        // params.setStoredUserData(res.data);
        // params.setIsLoading(false);
        console.log('params.isMounted2', params.isMounted);

        // if (params.cartQty > 0) {
        //   params.navigation.navigate('Cart');
        // } else {
        //   params.navigation.navigate('Home');
        // }
        // }
      } else {
        console.log('err login', err);
        params.setIsLoading(false);
      }
    },
  );
};
