import * as yup from 'yup';

import {Input, Text} from 'react-native-elements';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {getConfig, handleErrors, isLoggedIn} from 'constants/handleErrors';

import Card from 'components/Card';
import {Formik} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'components/MyButton';
import {UserContext} from '/context/UserContext';
import {calcHeight} from 'constants/deviceConfig';
import {errorToast} from 'constants/toasts';
import {saveAddress} from './addAddress.actions';
import {showSwing} from 'constants/loading';
import styles from './addAddress.styles';
import {useNavigation} from '@react-navigation/native';

const validation = yup.object({
  phone_no: yup
    .string()
    .matches(/^[0-9]*$/)
    .required('Enter phone number')
    .min(10, 'Phone no must be 10 digits'),
  landmark: yup.string().required('Enter apartment, floor, landmark, etc'),
});

const AddAddress = ({
  phone,
  confirmedLocationAddress,
  setConfirmedLocationAddress,
  changedCoords,
  setDeliveryMsg,
  deliveryMsg,
  setShowMap,
}) => {
  const navigation = useNavigation();
  const {storedUserData} = useContext(UserContext);
  const accessToken = isLoggedIn(storedUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //
  const handleAddressChange = () => {
    setDeliveryMsg(null);
    setConfirmedLocationAddress();
    setShowMap('hideMap');
  };

  //
  const submitInput = async (values) => {
    if (!deliveryMsg) {
      {
        Keyboard.dismiss;
      }
      var postData = {
        address: confirmedLocationAddress,
        landmark: values.landmark,
        address_coords: changedCoords,
        phone_no: values.phone_no,
      };
      saveAddress(postData, {setIsLoading, navigation, accessToken});

      //     // let validationErrors = handleErrors(e, navigation, setLogOutData);
      //     // if (validationErrors) {
      //     //   setErrors(e.response.data.error);
      //     // }
    } else {
      errorToast(deliveryMsg, 0.8);
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        <View>
          <Card style={styles.addressContainer}>
            <View style={styles.addressView}>
              <MaterialIcons
                name="person-pin-circle"
                color="red"
                size={calcHeight(5)}
                style={styles.icon}
              />
              <View style={styles.addressTextView}>
                <Text style={styles.addressText}>
                  {confirmedLocationAddress}
                </Text>
              </View>
            </View>
            <View style={styles.deliveryMsgView}>
              <Text style={styles.deliveryMsgText}>{deliveryMsg}</Text>
            </View>
            <View style={styles.btnContainerMap}>
              <MyButton
                title="Change"
                style={styles.btnMap}
                // onPress={() => setConfirmedLocationAddress()}
                onPress={handleAddressChange}
              />
            </View>
          </Card>

          <Formik
            initialValues={{
              address: confirmedLocationAddress,
              phone_no: phone ? phone.toString() : '',
              landmark: '',
            }}
            validationSchema={validation}
            onSubmit={(values) => {
              // console.log(values);
              submitInput(values);
              // actions.resetForm();
            }}>
            {(formikProps) => (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container}>
                  <View style={styles.enterAddress}>
                    <Input
                      label={phone ? 'Check Phone No' : 'Enter Phone No'}
                      placeholder="Phone No"
                      onChangeText={formikProps.handleChange('phone_no')}
                      value={formikProps.values.phone_no}
                      onBlur={formikProps.handleBlur('phone_no')}
                      maxLength={10}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      errorStyle={styles.error}
                      errorMessage={
                        'phone_no' in errors
                          ? errors.phone_no.toString()
                          : formikProps.touched.phone_no &&
                            formikProps.errors.phone_no
                      }
                    />
                    <Input
                      label="Enter Apartment, Floor, Landmark etc."
                      placeholder="Apartment, Floor, Landmark etc."
                      onChangeText={formikProps.handleChange('landmark')}
                      value={formikProps.values.landmark}
                      onBlur={formikProps.handleBlur('landmark')}
                      returnKeyType="next"
                      onSubmitEditing={formikProps.handleSubmit}
                      multiline
                      errorStyle={styles.error}
                      errorMessage={
                        'landmark' in errors
                          ? errors.landmark.toString()
                          : formikProps.touched.landmark &&
                            formikProps.errors.landmark
                      }
                    />
                  </View>

                  <View style={styles.btnContainer}>
                    <MyButton
                      title="Save Address & Pay"
                      style={styles.btn}
                      onPress={formikProps.handleSubmit}
                      // disabled={deliveryMsg ? true : false}
                    />
                  </View>
                </ScrollView>
              </TouchableWithoutFeedback>
            )}
          </Formik>
        </View>
      )}
    </View>
  );
};

export default AddAddress;
