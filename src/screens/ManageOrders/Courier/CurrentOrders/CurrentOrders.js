import React, {useContext, useEffect, useState} from 'react';
import {
  getConfig,
  handleErrors,
  isLoggedIn,
  showReload,
} from 'constants/handleErrors';
import {getCourierOrders, getToday, handleData} from './currentOrders.actions';

import DisplayCurrentOrders from './DisplayCurrentOrders';
import {UserContext} from 'context/UserContext';
import {View} from 'react-native';
import {showSwing} from 'constants/loading';
import styles from './currentOrders.styles';

const CurrentOrders = ({navigation}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  // const [singleOrder, setSingleOrder] = useState([]);
  const [today, setToday] = useState();

  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getToday({accessToken, setToday});
    getCourierOrders({accessToken, setIsLoading, organiseData});
    navigation.addListener('focus', () => {
      getToday({accessToken, setToday});
      getCourierOrders({accessToken, setIsLoading, organiseData});
    });
  }, []);

  const organiseData = (data) => {
    handleData(data, {setOrders});
  };
  // console.log('orders', orders);

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        // orders.length &&
        //   today &&
        <View style={styles.screen}>
          <DisplayCurrentOrders orders={orders} today={today} />
        </View>
      )}
    </View>
  );
};

export default CurrentOrders;
