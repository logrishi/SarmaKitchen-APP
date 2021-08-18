import {StyleSheet, Text, View} from 'react-native';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import React from 'react';
import SwitchSelector from 'react-native-switch-selector';

//constants

//SwitchSelector

const OrderSwitchSelector = ({item, handleChange, subscriptionDuration}) => {
  // const handleOptions=()=>{
  //   if(subscriptionDuration)
  // };

  return (
    <SwitchSelector
      initial={item.orderStatusCode}
      borderColor={Colors.extremeLightGrayish}
      style={styles.switch}
      key={item.orderId}
      hasPadding
      returnObject
      onPress={(options) =>
        handleChange(
          item.orderId,
          options.value,
          options.label,
          item.orderStatusCode,
        )
      }
      fontSize={
        screenWidth > 700
          ? calcWidth(2)
          : screenWidth > 500
          ? calcWidth(2.5)
          : calcWidth(2.5)
      }
      // options ={handleOptions()}
      options={[
        {
          label: 'Processing',
          value: '0',
          activeColor: Colors.primary,
        },
        {
          label: 'Accepted',
          value: '1',
          activeColor: Colors.activeColorAccepted,
        },
        {
          label: subscriptionDuration > 1 ? 'Ongoing' : 'Out For Delivery',
          value: '2',
          activeColor:
            subscriptionDuration > 1
              ? 'blue'
              : Colors.activeColorOutForDelivery,
        },
        {
          label: 'Delivered',
          value: '3',
          activeColor: Colors.activeColorDelivered,
        },
        // {
        //   label: 'Cancel Order',
        //   value: 'Ordered Cancelled',
        // },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    width: '90%',
    marginBottom: calcHeight(2),
  },
});
export default OrderSwitchSelector;
