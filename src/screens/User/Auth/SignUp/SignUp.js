import * as Animatable from 'react-native-animatable';
import * as yup from 'yup';

import {Button, Input} from 'react-native-elements';
import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import {CartContext} from 'context/CartContext';
import Colors from 'constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';
import {UserContext} from '/context/UserContext';
import {callSignUp} from './signUp.actions';
import {scale} from 'react-native-size-matters';
import {showSwing} from 'constants/loading';
import styles from './signUp.styles';
import {useHeaderHeight} from '@react-navigation/stack';

const validation = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name too short - Enter more than 3 letters'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'pasword too short'),
});

const SignUp = () => {
  const navigation = useNavigation();
  const {setStoredUserData} = useContext(UserContext);
  const {cartQty} = useContext(CartContext);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setToken(token.token);
      },
    });
  };

  const submitInput = async (values) => {
    callSignUp(values, {
      setIsLoading,
      token,
      setStoredUserData,
      cartQty,
      navigation,
    });
  };

  return (
    <View
      style={styles.screen}
      // behavior="position"
      // keyboardVerticalOffset={
      //   headerHeight + StatusBar.currentHeight - calcHeight(29) //4.5
      // }
    >
      <StatusBar backgroundColor={Colors.wave} />

      <View style={styles.container1}>
        <Animatable.View
          animation="slideInDown"
          // delay={1005}
          useNativeDriver={true}
          style={{
            justifyContent: 'flex-start',
            flex: 1,
            // backgroundColor: 'yellow',
          }}>
          <Image
            source={require('assets/images/wave.png')}
            style={styles.image}
          />
        </Animatable.View>
      </View>

      <View style={styles.container2}>
        <Animatable.View
          animation="slideInUp"
          // delay={1005}
          useNativeDriver={true}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            // validationSchema={validation}
            onSubmit={(values, actions) => {
              // console.log(values);
              submitInput(values);
              // actions.resetForm();
            }}>
            {(formikProps) => (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.allInputsContainer}>
                  <View>
                    <Input
                      // label="Enter Name"
                      placeholder="Enter Name"
                      onChangeText={formikProps.handleChange('name')}
                      value={formikProps.values.name}
                      onBlur={formikProps.handleBlur('name')}
                      // autoFocus
                      style={styles.inputSize}
                      errorStyle={styles.error}
                      errorMessage={
                        formikProps.touched.name && formikProps.errors.name
                      }
                      leftIcon={
                        <FontAwesome
                          name="user"
                          // color={Colors.darkGrayish}
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
                    {Object.keys(errors).length > 0 && errors.name ? (
                      <View style={styles.errorContainer}>
                        <Text style={styles.error}>{errors.name}</Text>
                      </View>
                    ) : null}
                  </View>

                  <View>
                    <Input
                      // label="Enter Email"
                      placeholder="Enter email"
                      onChangeText={formikProps.handleChange('email')}
                      value={formikProps.values.email}
                      onBlur={formikProps.handleBlur('email')}
                      style={styles.inputSize}
                      errorStyle={styles.error}
                      errorMessage={
                        formikProps.touched.email && formikProps.errors.email
                      }
                      leftIcon={
                        <MaterialCommunityIcons
                          name="email"
                          // color={Colors.darkGrayish}
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
                    {Object.keys(errors).length > 0 && errors.email ? (
                      <View style={styles.errorContainer}>
                        <Text style={styles.error}>{errors.email}</Text>
                      </View>
                    ) : null}
                  </View>

                  <View>
                    <Input
                      // label="Enter Password"
                      placeholder="Password"
                      onChangeText={formikProps.handleChange('password')}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')}
                      onSubmitEditing={formikProps.handleSubmit}
                      secureTextEntry={true}
                      style={styles.inputSize}
                      errorStyle={styles.error}
                      errorMessage={
                        formikProps.touched.password &&
                        formikProps.errors.password
                      }
                      leftIcon={
                        <FontAwesome
                          name="lock"
                          // color={Colors.darkGrayish}
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
                    {Object.keys(errors).length > 0 && errors.password ? (
                      <View style={styles.errorContainer}>
                        <Text style={styles.error}>{errors.password}</Text>
                      </View>
                    ) : null}
                  </View>

                  {Object.keys(errors).length > 0 &&
                  !errors.name &&
                  !errors.email &&
                  !errors.password ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.error}>{errors}</Text>
                    </View>
                  ) : null}

                  <Button
                    style={styles.button}
                    title="Sign Up"
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
                      <Ionicons
                        name="arrow-forward"
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
        </Animatable.View>
      </View>
    </View>
  );
};

export default SignUp;
