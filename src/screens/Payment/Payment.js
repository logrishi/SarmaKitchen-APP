import React, {useContext, useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {
  createOrder,
  handleFCMNotification,
  storeOrderToDB,
} from './payment.actions';
import {errorToast, successToast} from 'constants/toasts';
import {getConfig, handleErrors, isLoggedIn} from 'constants/handleErrors';

import {CartContext} from 'context/CartContext';
import MyButton from 'components/MyButton';
import PushNotification from 'react-native-push-notification';
import RazorpayCheckout from 'react-native-razorpay';
import {UserContext} from '/context/UserContext';
import {showSwing} from 'constants/loading';
import {source} from 'constants/axiosCalls';
import styles from './payment.styles';

const Payment = ({route}) => {
  let phone_no = null;
  let address_id = null;
  let address = null;
  if (route.params) {
    phone_no = route.params.phone_no;
    address_id = route.params.address_id;
    address = route.params.address;
  }
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const {cartItems, totalPrice, emptyCart} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();

  let accessToken = isLoggedIn(storedUserData);

  const successMsg = 'Your transaction was successful!!';
  const errorMsg = `Transaction Failed! If payment deducted please contact support from 'Account Screen'`;

  let cancelToken = source.token;

  // send notif if app on foreground

  PushNotification.configure({
    onNotification: function (notification) {
      // console.log('NOTIFICATION:', notification.foreground);
      if (notification.foreground == true) {
        sendNotification('New Order Local', 'New Order Placed local');
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  // send notif if app on foreground
  const sendNotification = (title, message) => {
    PushNotification.localNotification({
      title: title,
      message: message,
    });
  };

  const fcm = () => {
    handleFCMNotification(
      storedUserData.deviceToken,
      accessToken,
      setIsLoading,
      setSaved,
    );
  };

  // payment popup
  const razorPay = (rzPayOrderId, receipt, apiKey) => {
    var options = {
      // description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: apiKey,
      amount: totalPrice * 100,
      name: 'Sarma Kitchen',
      order_id: rzPayOrderId,
      prefill: {
        email: storedUserData.user.email,
        contact: phone_no,
        name: storedUserData.user.name,
      },
      // theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(`Success: ${data.razorpay_payment_id}`);
        console.log('data', data);
        storeOrder(
          rzPayOrderId,
          data.razorpay_payment_id,
          data.razorpay_signature,
          receipt,
        );
      })
      .catch((error) => {
        errorToast(errorMsg, 1);
        navigation.navigate('Cart');
        setIsLoading(false);
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  // save order to db
  // console.log(cartItems);
  const storeOrder = (
    rzPayOrderId,
    razorpay_payment_id,
    razorpay_signature,
    receipt,
  ) => {
    console.log('storeOrder');
    let orderItemsArr = [];
    cartItems.map((e) =>
      orderItemsArr.push({
        product_id: e.id,
        product_name: e.name,
        quantity: e.quantity,
        price: e.price,
        size: e.size ? e.size : null,
        note: e.notes ? e.notes : null,
        is_veg: e.is_veg ? (e.is_veg == 0 || 1 ? e.is_veg : null) : null,
        meal_type: e.selectedMeal,
        subscription_duration: e.selectedSubscription,
        num_persons: e.numServings ? e.numServings : null,
        start_date: e.startDate ? e.startDate : null,
        end_date: e.endDate ? e.endDate : null,
        subscription_menu: e.filteredProducts ? e.filteredProducts : null,
      }),
    );
    storeOrderToDB(
      rzPayOrderId,
      razorpay_payment_id,
      razorpay_signature,
      receipt,
      orderItemsArr,
      address_id,
      address,
      phone_no,
      totalPrice,
      {
        accessToken,
        setIsLoading,
        emptyCart,
        navigation,
        StackActions,
        fcm,
        cancelToken,
      },
    );
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        <View>
          <View style={styles.heading}>
            <Text style={styles.text}>Select payment mode</Text>
          </View>
          <View style={styles.btnContainer}>
            <MyButton
              title="Pay Online"
              style={styles.btn}
              onPress={() =>
                createOrder(totalPrice, {
                  accessToken,
                  setIsLoading,
                  navigation,
                  razorPay,
                  cancelToken,
                })
              }
              // onPress={storeOrder}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Payment;
