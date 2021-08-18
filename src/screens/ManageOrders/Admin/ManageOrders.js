import Colors from 'constants/colors';
import IncompleteOrders from './IncompleteOrders';
import PastOrders from './PastOrders';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';

const ManageOrders = () => {
  const TopTabs = createMaterialTopTabNavigator();

  return (
    <TopTabs.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: Colors.accent},
        activeTintColor: Colors.btnBlue,
        labelStyle: {textTransform: 'none', fontSize: scale(15)},
      }}
      // sceneContainerStyle={{backgroundColor: Colors.btnBlue}}
      // backBehavior={'none'}
    >
      <TopTabs.Screen name="Incomplete Orders" component={IncompleteOrders} />
      <TopTabs.Screen name="Past Orders" component={PastOrders} />
    </TopTabs.Navigator>
  );
};

export default ManageOrders;
