import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';

const createTwoButtonAlert = (msg) => {
  Alert.alert('Cart Info', msg, [
    {
      text: 'Cancel',
      // onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ]);
};
export {createTwoButtonAlert};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
// export default Alerts;
