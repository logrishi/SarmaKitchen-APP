import {Text, TouchableOpacity} from 'react-native';

import Colors from 'constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StackActions} from '@react-navigation/native';
import {calcWidth} from 'constants/deviceConfig';
import {errorToast} from 'constants/toasts';
import styles from './loadingStyles';

////*** above reqd. for show reload func only  ****/

const getConfig = (storedUserData) => {
  if (storedUserData != undefined) {
    let config = {};
    if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
      let accessToken = storedUserData.auth.access_token;
      config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      };
      return config;
    }
  }
};

const isLoggedIn = (storedUserData) => {
  // console.log('isLoggedIn');
  if (storedUserData != undefined) {
    // console.log('isLoggedIn if');
    if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
      let accessToken = storedUserData.auth.access_token;
      return accessToken;
    }
  }
};

const isAdmin = (storedUserData) => {
  if (storedUserData != undefined) {
    if ('user' in storedUserData) {
      let isAdmin = storedUserData.user.is_admin;
      return isAdmin;
    }
  }
};

const isCourier = (storedUserData) => {
  if (storedUserData != undefined) {
    if ('user' in storedUserData) {
      let isCourier = storedUserData.user.is_courier;
      return isCourier;
    }
  }
};

const showLogin = (navigation, setLogOutData) => {
  let index = navigation.dangerouslyGetState().index;

  errorToast('Something went wrong!! Login to continue..', 1);
  setLogOutData({});
  if (index) {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('Account');
  } else {
    navigation.navigate('Account');
  }
};

const handleErrors = (e, navigation, setLogOutData, msg) => {
  const tokenError = null;
  const validationErrors = null;
  console.log('hit');
  // 'response' in e && typeof 'response' in e !== undefined;

  if ('response' in e) {
    if ('data' in e.response && typeof 'data' in e.response === 'object') {
      if ('tokenError' in e.response.data) {
        tokenError = true;
      }
      if ('error' in e.response.data) {
        validationErrors = true;
      }
    }
  }

  let customMsg = 'Something went wrong!! Please try again';

  msg ? (customMsg = msg) : customMsg;

  if (tokenError) {
    showLogin(navigation, setLogOutData);
  } else if (validationErrors) {
    return validationErrors;
  } else {
    errorToast(customMsg, 1);
  }
};

const showReload = (callMethod) => {
  return (
    <TouchableOpacity style={styles.loading} onPress={callMethod}>
      <MaterialCommunityIcons name="reload" color="red" size={calcWidth(10)} />
      <Text>Tap to retry</Text>
    </TouchableOpacity>
  );
};

export {
  isLoggedIn,
  isAdmin,
  isCourier,
  getConfig,
  showLogin,
  handleErrors,
  showReload,
};
