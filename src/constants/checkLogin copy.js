//usenavigation
import {StackActions} from '@react-navigation/native';

//toast
import {errorToast} from 'constants/toasts';

const isLoggedInConfig = (storedUserData, navigation, setLogOutData) => {
  let config = {};
  if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
    let accessToken = storedUserData.auth.access_token;
    // console.log(accessToken);
    config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };
    return config;
  }
  // else {
  //   showLogin(navigation, setLogOutData);
  // }
};

const isLoggedIn = storedUserData => {
  if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
    let accessToken = storedUserData.auth.access_token;
    // console.log(accessToken);
    return accessToken;
  }
};

const showLogin = (navigation, setLogOutData) => {
  let index = navigation.dangerouslyGetState().index;
  console.log(index);
  errorToast('Something went wrong!! Login to continue..');
  setLogOutData({});
  if (index) {
    console.log('if');
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('Account');
  } else {
    console.log('else');
    navigation.navigate('Account');
  }
};
export {isLoggedIn, isLoggedInConfig, showLogin};
