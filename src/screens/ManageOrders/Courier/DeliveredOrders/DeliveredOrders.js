import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';
import {
  getConfig,
  handleErrors,
  isLoggedIn,
  showReload,
} from 'constants/handleErrors';
import {
  getDeliveredOrdersByCourier,
  getToday,
  handleData,
} from './deliveredOrders.actions';

import Colors from 'constants/colors';
import DeliveredOrdersList from './DeliveredOrderList';
import {UserContext} from 'context/UserContext';
import axios from 'axios';
import {base_url} from 'constants/url';
import {showSwing} from 'constants/loading';
import styles from './deliveredOrders.styles';

const DeliveredOrders = ({navigation}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  // const [singleOrder, setSingleOrder] = useState([]);
  const [today, setToday] = useState();

  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getToday({setToday});

    getDeliveredOrdersByCourier({accessToken, setIsLoading, organiseData});
    navigation.addListener('focus', () => {
      getToday({setToday});

      getDeliveredOrdersByCourier({accessToken, setIsLoading, organiseData});
    });
  }, []);

  const organiseData = (data) => {
    handleData(data, {setOrders});
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        <View style={styles.screen}>
          <DeliveredOrdersList orders={orders} today={today} />
        </View>
      )}
    </View>
  );
};

export default DeliveredOrders;
