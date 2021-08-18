import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//constants
import {
  screenWidth,
  deviceHeight,
  calcHeight,
  calcWidth,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//context
import {UserContext} from 'context/UserContext';

//fonts
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//usenavigation
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

//toast
import {errorToast} from 'constants/toasts';

const useHandleErrors = () => {
  // const {storedUserData, setLogOutData} = useContext(UserContext);
  const navigation = useNavigation();

  const getConfig = () => {
    const {storedUserData, setLogOutData} = useContext(UserContext);
    console.log('storedUserData hook', storedUserData);
    console.log('getConfg');
    if (Object.keys(storedUserData).length) {
      console.log('getConfgIf 1');
      let config = {};
      if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
        console.log('getConfg If 2');
        let accessToken = storedUserData.auth.access_token;
        config = {
          headers: {Authorization: `Bearer ${accessToken}`},
        };
        return config;
      }
    } else {
      return null;
    }
  };

  const isLoggedIn = () => {
    const {storedUserData, setLogOutData} = useContext(UserContext);
    if (Object.keys(storedUserData).length) {
      if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
        let accessToken = storedUserData.auth.access_token;
        // console.log(accessToken);
        return accessToken;
      }
    } else {
      return null;
    }
  };

  const showLogin = () => {
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

  const handleErrors = (e, msg) => {
    let customMsg = 'Something went wrong!! Please try again';
    msg ? (customMsg = msg) : customMsg;
    const tokenError = null;
    const validationErrors = null;
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
        <MaterialCommunityIcons
          name="reload"
          color="red"
          size={calcWidth(10)}
        />
        <Text>Tap to retry</Text>
      </TouchableOpacity>
    );
  };

  return {getConfig, isLoggedIn, showLogin, handleErrors, showReload};
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    // backgroundColor: Colors.background,
  },
});
export default useHandleErrors;
