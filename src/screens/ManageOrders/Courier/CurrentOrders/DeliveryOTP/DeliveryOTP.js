import React, {useContext, useState} from 'react';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import {Input} from 'react-native-elements';
import MyButton from 'components/MyButton';
import {UserContext} from 'context/UserContext';
import {View} from 'react-native';
import axios from 'axios';
import {base_url} from 'constants/url';
import {isLoggedIn} from 'constants/handleErrors';
import styles from './deliveryOTP.styles';
import {verifyOtp} from './deliveryOTP.actions';

const DeliveryOTP = ({item, today}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState();

  let accessToken = isLoggedIn(storedUserData);

  const getSubscriptionDuration = () => {
    let subscriptionDuration = 0;
    for (var i in item.orderItems) {
      return (subscriptionDuration = item.orderItems[i].subscriptionDuration);
    }
  };

  const handleSubmit = async () => {
    let subscriptionDuration = getSubscriptionDuration();
    let orderId = item.orderId;
    verifyOtp(orderId, today, subscriptionDuration, otp, {
      accessToken,
      setIsLoading,
    });
  };
  return (
    <View style={{width: calcWidth(50)}}>
      <Input
        placeholder="Enter OTP"
        onChangeText={(otp) => setOtp(otp)}
        defaultValue={otp}
      />
      <MyButton title="Submit OTP" style={styles.btn} onPress={handleSubmit} />
    </View>
  );
};

export default DeliveryOTP;
