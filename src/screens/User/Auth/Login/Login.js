import * as Animatable from 'react-native-animatable';
import * as yup from 'yup';

import {Button, Input} from 'react-native-elements';
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {
  calcHeight,
  calcWidth,
  screenHeight,
  screenWidth,
} from 'constants/deviceConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartContext} from 'context/CartContext';
import Colors from 'constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from 'components/MyButton';
import PushNotification from 'react-native-push-notification';
import {UserContext} from '/context/UserContext';
import {apiCall} from 'constants/axiosCalls';
import axios from 'axios';
import {base_url} from 'constants/url';
import {callLogin} from './login.actions';
import {scale} from 'react-native-size-matters';
import {showSwing} from 'constants/loading';
import {storeData} from 'constants/asyncStorage';
import styles from './login.styles';
import {useHeaderHeight} from '@react-navigation/stack';

const validation = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({route}) => {
  let msg = null;
  if (route.params) {
    msg = route.params.msg;
  }

  const {setStoredUserData} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const {cartQty} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [result, setResult] = useState();
  // const headerHeight = useHeaderHeight();

  const ref = useRef(null);
  let isMounted;
  useEffect(() => {
    isMounted = true;
    if (result) {
      setStoredUserData(result);
      storeData('userDetails', result, (err) => {
        // console.log(err);
      });
      setIsLoading(false);
      console.log('isMounted main', isMounted);

      if (cartQty > 0) {
        navigation.navigate('Cart');
      } else {
        navigation.navigate('Home');
      }
    }
  }, [result]);

  // useEffect(() => {
  //   animate();
  //   return navigation.addListener('focus', () => {
  //     animate();
  //   });
  // }, []);

  useEffect(() => {
    getToken();
    // return getToken();
  }, []);

  const animate = () => {
    ref.current.animation = 'fadeInUp';
  };

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setToken(token.token);
      },
    });
  };

  const userLogin = async (values) => {
    callLogin(values, {
      setIsLoading,
      token,
      setStoredUserData,
      cartQty,
      navigation,
      isMounted,
      setResult,
    });
  };

  return (
    <ScrollView
      // behavior="position"
      // keyboardVerticalOffset={
      //   headerHeight + StatusBar.currentHeight - calcHeight(29) //4.5
      // }
      contentContainerStyle={styles.screen}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <View style={{alignItems: 'center'}}>
          <Animatable.View
            // ref={ref}
            animation="slideInUp"
            // delay={1005}
            useNativeDriver={true}
            style={styles.imageContainer}>
            <Image
              source={require('assets/images/logo.jpg')}
              style={styles.image}
            />
          </Animatable.View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Animatable.View
          ref={ref}
          animation="slideInUp"
          // delay={1005}
          useNativeDriver={true}
          // style={{flex: 1}}
        >
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validation}
            onSubmit={(values) => {
              userLogin(values);
            }}>
            {(formikProps) => (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                  style={styles.allInputsContainer}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}>
                  {msg ? (
                    <View style={styles.resetView}>
                      <Text style={styles.resetText}>{msg}</Text>
                    </View>
                  ) : null}
                  <View>
                    <Input
                      // inputStyle={styles.text}
                      // labelStyle={styles.text}
                      // label="Enter Email"
                      placeholder="Enter email"
                      onChangeText={formikProps.handleChange('email')}
                      value={formikProps.values.email}
                      onBlur={formikProps.handleBlur('email')}
                      onFocus={animate}
                      style={styles.inputSize}
                      errorStyle={styles.error}
                      errorMessage={
                        formikProps.touched.email && formikProps.errors.email
                      }
                      leftIcon={
                        // <FontAwesome
                        // name="phone"
                        <MaterialCommunityIcons
                          name="email"
                          // color={Colors.themeText}
                          size={
                            screenWidth > 700
                              ? calcWidth(4)
                              : screenWidth > 500
                              ? calcWidth(6)
                              : calcWidth(4)
                          }
                          style={{marginRight: calcWidth(1)}}
                        />
                      }
                    />
                  </View>

                  <View>
                    <Input
                      // label="Enter Password"
                      placeholder="Password"
                      onChangeText={formikProps.handleChange('password')}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')}
                      onFocus={animate}
                      style={styles.inputSize}
                      secureTextEntry={true}
                      onSubmitEditing={formikProps.handleSubmit}
                      errorStyle={styles.error}
                      errorMessage={
                        formikProps.touched.password &&
                        formikProps.errors.password
                      }
                      leftIcon={
                        <FontAwesome
                          name="lock"
                          // color={Colors.themeText}
                          size={
                            screenWidth > 700
                              ? calcWidth(4)
                              : screenWidth > 500
                              ? calcWidth(6)
                              : calcWidth(4)
                          }
                          style={{marginRight: calcWidth(1)}}
                        />
                      }
                    />
                  </View>

                  {Object.keys(errors).length > 0 ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.error}>{errors}</Text>
                    </View>
                  ) : null}

                  <Button
                    style={styles.button}
                    title="Login"
                    onPress={formikProps.handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                    type="outline"
                    buttonStyle={{
                      backgroundColor: Colors.background,
                      marginVertical: calcHeight(1),
                    }}
                    titleStyle={{
                      color: Colors.btnBlue,
                      fontSize: scale(18),
                    }}
                    icon={
                      <FontAwesome
                        name="sign-in"
                        color={Colors.btnBlue}
                        size={
                          screenWidth > 700
                            ? calcWidth(4)
                            : screenWidth > 500
                            ? calcWidth(6)
                            : calcWidth(5)
                        }
                        style={{marginHorizontal: calcWidth(2)}}
                      />
                    }
                    iconRight
                  />
                </ScrollView>
              </TouchableWithoutFeedback>
            )}
          </Formik>
          <View style={styles.forgot}>
            {msg ? null : (
              <Button
                title="Forgot Password ?"
                type="clear"
                titleStyle={{color: Colors.btnBlue, fontSize: scale(12)}}
                onPress={() => navigation.navigate('ForgotPassword')}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // flex: 1,
            }}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Button
              title="Sign Up"
              type="clear"
              onPress={() => navigation.navigate('SignUp')}
              titleStyle={{
                color: Colors.btnBlue,
                fontSize: scale(15),
                fontFamily: 'sans-serif-medium',
              }}
            />
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default Login;
