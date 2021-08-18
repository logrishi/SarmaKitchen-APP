import {apiCall} from 'constants/axiosCalls';
import {storeData} from 'constants/asyncStorage';

export const callSignUp = async (values, params) => {
  params.setIsLoading(true);
  // console.log(values);
  apiCall(
    {
      method: 'POST',
      url: 'signup',
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        token: params.token,
      },
    },
    (res, err) => {
      if (!err) {
        // console.log('res', res.data);
        params.setStoredUserData(res.data);
        // setLoggedIn(true);
        storeData('userDetails', res.data, (err) => {
          // console.log(err);
        });
        params.setIsLoading(false);
        params.navigation.navigate('Home');
      } else {
        // console.log('err', err);
        params.setIsLoading(false);
      }
    },
  );
};
