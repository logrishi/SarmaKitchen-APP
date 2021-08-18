import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';
import {callSignOut, saveCart} from './logout.actions';
import {
  getConfig,
  handleErrors,
  isLoggedIn,
  showReload,
} from 'constants/handleErrors';
import {removeAllData, removeData, storeData} from 'constants/asyncStorage';

import {CartContext} from 'context/CartContext';
import Colors from 'constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import {UserContext} from 'context/UserContext';
import {apiCall} from 'constants/axiosCalls';
import axios from 'axios';
import {base_url} from 'constants/url';
import {showSwing} from 'constants/loading';
import styles from './logout.styles';
import {useNavigation} from '@react-navigation/native';

//custom hooks
// import useHandleErrors from 'hooks/useHandleErrors';

const Logout = () => {
  const navigation = useNavigation();
  const {
    storedUserData,
    setLogOutData,
    setLoggedIn,
    setStoredUserData,
  } = useContext(UserContext);
  const {cartQty, cartItems, totalPrice, emptyCart} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const {
  //   getConfig,
  //   isLoggedIn,
  //   showLogin,
  //   handleErrors,
  //   showReload,
  // } = useHandleErrors();

  // let config = null;
  // let accessToken = isLoggedIn();
  // if (accessToken) {
  //   config = getConfig();
  // }

  let accessToken = isLoggedIn(storedUserData);

  console.log('logOut screen', accessToken);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setToken(token.token);
      },
    });
  };

  const signOutUser = () => {
    callSignOut(token, {
      accessToken,
      setIsLoading,
      setStoredUserData,
      navigation,
    });
  };

  // const signOutUser = () => {
  //   setIsListLoading(true);
  //   apiCall(
  //     {
  //       method: 'POST',
  //       url: 'logout',
  //       data: token,
  //       // params: {setIsLoading},
  //       accessToken: accessToken,
  //     },
  //     (res) => {
  //       console.log('res', res);
  //       console.log('token', token);
  //       removeData('userDetails', () => {
  //         setStoredUserData();
  //       });
  //       setIsListLoading(false);
  //       navigation.navigate('HomeScreen');
  //     },
  //     (err) => {
  //       console.log('err', err);
  //       setIsListLoading(false);
  //     },
  //   );
  // };
  // const signOutUser = async () => {
  //   if (config) {
  //     try {
  //       const res = await axios.post(
  //         `${base_url}/logout`,
  //         {
  //           token: token,
  //         },
  //         config,
  //       );
  //       // console.log(res.data);
  //       // setLogOutData({});
  //       removeData('userDetails', () => {
  //         // setIsLoggedIn(false);
  //       });
  //       setStoredUserData({});
  //       storeData('userDetails', {}, (err) => {
  //         console.log(false, res);
  //       });
  //       navigation.navigate('Home');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  const saveCartToDB = async () => {
    saveCart(cartItems, cartQty, totalPrice, {
      accessToken,
      setIsLoading,
      setModalVisible,
      modalVisible,
      emptyCart,
      signOutUser,
    });
    // if (config) {
    //   setIsLoading(true);
    //   setModalVisible(!modalVisible);
    //   try {
    //     const res = await axios.post(
    //       `${base_url}/cart`,
    //       {
    //         cart_items: cartItems,
    //         cart_quantity: cartQty,
    //         total_price: totalPrice,
    //       },
    //       config,
    //     );
    //     emptyCart();
    //     signOutUser();
    //     setIsLoading(false);
    //     // console.log(res.data);
    //   } catch (e) {
    //     setIsLoading(false);
    //   }
    // }
  };

  return (
    <View>
      {isLoading ? (
        showSwing
      ) : (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{...styles.cancel}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.signout}}
                  onPress={saveCartToDB}>
                  <Text style={styles.textStyle}>SignOut</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <FontAwesome5
              name="power-off"
              color={Colors.accent}
              // size={
              //   screenWidth > 800
              //     ? calcWidth(4)
              //     : screenWidth > 500
              //     ? calcWidth(6.5)
              //     : calcWidth(7)
              // }
              size={18}
              style={{paddingRight: 20}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Logout;
