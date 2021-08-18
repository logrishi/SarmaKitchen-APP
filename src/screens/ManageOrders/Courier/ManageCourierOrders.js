import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Colors from 'constants/colors';
import DeliveredOrders from './DeliveredOrders';
import Delivery from './CurrentOrders';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';

//components

const ManageCourierOrders = ({navigation}) => {
  const [selected, setSelected] = useState('current');
  const TopTabs = createMaterialTopTabNavigator();

  const handlePress = (val) => {
    setSelected(val);
  };

  return (
    <TopTabs.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: Colors.accent},
        activeTintColor: Colors.btnBlue,
        labelStyle: {textTransform: 'none', fontSize: scale(15)},
      }}
      sceneContainerStyle={{backgroundColor: Colors.btnBlue}}
      // backBehavior={'none'}
    >
      <TopTabs.Screen name="Current Orders" component={Delivery} />
      <TopTabs.Screen name="Past Orders" component={DeliveredOrders} />
    </TopTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default ManageCourierOrders;
