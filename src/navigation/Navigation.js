import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
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
import {isAdmin, isCourier, isLoggedIn} from 'constants/handleErrors';

import AddAddress from 'screens/User/Address/AddAddress';
import Address from 'screens/User/Address/Address';
import Badge from 'components/Badge';
import Cart from 'screens/Cart';
import {CartContext} from 'context/CartContext';
import Colors from 'constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Faq from 'screens/FAQ';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Home from 'screens/Home';
import Login from 'screens/User/Auth/Login';
import ManageCourierOrders from 'screens/ManageOrders/Courier/ManageCourierOrders';
import ManageOrders from '../screens/ManageOrders/Admin/ManageOrders';
import MapBarScreen from 'screens/Location/MapBarScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrdersScreen from 'screens/Orders';
import Payment from 'screens/Payment';
import Products from 'screens/Products';
import ProfileScreen from 'screens/User/Profile';
import SelectAddress from 'screens/User/Address/SelectAddress';
import SignUp from 'screens/User/Auth/SignUp';
import SubscriptionDetails from 'screens/Products/ProductComponents/SubscriptionDetails';
import {UserContext} from 'context/UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import Account from 'screens/User/Auth/Account';

// import ManageOrders from 'screens/admin/ManageOrders';

//stacks
const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => {
  const {cartQty} = useContext(CartContext);
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <MaterialCommunityIcons
                name="cart"
                color="black"
                size={28}
                style={{paddingRight: 20}}
              />
              {cartQty > 0 ? (
                <Badge style={styles.badge} navigation={navigation} />
              ) : null}
            </TouchableOpacity>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const OrderStack = createStackNavigator();
const OrderStackScreen = ({navigation}) => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
      }}>
      <OrderStack.Screen name="OrdersScreen" component={OrdersScreen} />
    </OrderStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
      }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

//BottomTabs
const BottomTabs = createBottomTabNavigator();
const BottomTabsScreen = () => {
  const {storedUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);
  let admin = isAdmin(storedUserData);
  let courier = isCourier(storedUserData);

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        keyboardHidesTabBar: true,
      }}>
      <BottomTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="bowl" color={color} size={size} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Orders"
        component={OrderStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="list" color={color} size={size} />
          ),
        }}
      />

      {accessToken ? (
        <BottomTabs.Screen
          name="Profile"
          component={ProfileStackScreen}
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
      ) : (
        <BottomTabs.Screen
          name="Profile"
          component={Login}
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
      )}
      {admin ? (
        <BottomTabs.Screen
          name="Manage Orders"
          component={ManageOrders}
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
      ) : null}
      {courier ? (
        <BottomTabs.Screen
          name="ManageCourierOrders"
          component={ManageCourierOrders}
          options={{
            tabBarIcon: ({color, size}) => (
              <Fontisto name="motorcycle" color={color} size={size} />
            ),
          }}
        />
      ) : null}
    </BottomTabs.Navigator>
  );
};

const RootStack = createStackNavigator();
const Navigation = () => {
  const {cartQty} = useContext(CartContext);
  const ref = React.useRef(null);
  return (
    <NavigationContainer ref={ref}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <RootStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
          },
          // ...TransitionPresets.SlideFromRightIOS,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Screen
          name="Home"
          component={BottomTabsScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Products"
          component={Products}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => ref.current && ref.current.navigate('Cart')}>
                <MaterialCommunityIcons
                  name="cart"
                  color="black"
                  size={28}
                  style={{paddingRight: 20}}
                />
                {cartQty > 0 ? (
                  <Badge style={styles.badge} navigation={ref.current} />
                ) : null}
              </TouchableOpacity>
            ),
          }}
        />
        <RootStack.Screen name="Cart" component={Cart} />
        <RootStack.Screen
          name="SubscriptionDetails"
          component={SubscriptionDetails}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => ref.current && ref.current.navigate('Cart')}>
                <MaterialCommunityIcons
                  name="cart"
                  color="black"
                  size={28}
                  style={{paddingRight: 20}}
                />
                {cartQty > 0 ? (
                  <Badge style={styles.badge} navigation={ref.current} />
                ) : null}
              </TouchableOpacity>
            ),
          }}
        />
        {/* <RootStack.Screen name="Account" component={Account} /> */}
        <RootStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerStyle: {
              backgroundColor: Colors.wave,
              elevation: 0,
            },
          }}
        />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="SelectAddress" component={SelectAddress} />
        <RootStack.Screen name="AddAddress" component={AddAddress} />
        <RootStack.Screen
          name="Address"
          component={Address}
          // options={{headerShown: false}}
        />
        <RootStack.Screen name="Payment" component={Payment} />
        <RootStack.Screen name="ManageOrders" component={ManageOrders} />
        {/* <RootStack.Screen name="Delivery" component={Delivery} /> */}
        <RootStack.Screen name="MapBarScreen" component={MapBarScreen} />
        <RootStack.Screen name="Faq" component={Faq} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: 5,
  },
});

export default Navigation;
