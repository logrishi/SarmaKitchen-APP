import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {calcHeight, calcWidth} from 'constants/deviceConfig';

import Cart from 'screens/cart/Cart';
import Colors from 'constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from 'screens/Home/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrdersScreen from 'screens/orders/OrdersScreen';
import Products from 'screens/products/Products';
import ProfileScreen from 'screens/profile/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// react-navigation






//constants



//fonts





//screens







//stacks
const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <MaterialCommunityIcons name="cart" />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

//BottomTabs
const BottomTabs = createBottomTabNavigator();
const BottomTabsScreen = () => {
  return (
    <BottomTabs.Navigator tabBarOptions={{activeTintColor: Colors.primary}}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="bowl" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="box-open" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
        }}>
        <HomeStack.Screen
          name="Home"
          component={BottomTabsScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <MaterialCommunityIcons name="cart" />
              </TouchableOpacity>
            ),
          }}
        />
        <HomeStack.Screen name="Products" component={Products} />
        <HomeStack.Screen name="Cart" component={Cart} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
