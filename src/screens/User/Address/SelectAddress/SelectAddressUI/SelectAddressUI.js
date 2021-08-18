import * as yup from 'yup';

import {Button, Divider, Input, Text} from 'react-native-elements';
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CheckBox from 'components/CheckBox';
import Entypo from 'react-native-vector-icons/Entypo';
import {Formik} from 'formik';
import React from 'react';
import {calcHeight} from 'constants/deviceConfig';
import {removeAddress} from '../selectAddress.actions';
import styles from './selectAddressUI.styles';

const validation = yup.object({
  phone_no: yup
    .string()
    .matches(/^[0-9]*$/)
    .required('Enter phone number'),
});

const SelectAddressUI = ({
  phone,
  setChecked,
  checked,
  goToPayment,
  accessToken,
  setIsLoading,
  address,
  setAddress,
  navigation,
  setShowMap,
  setConfirmedLocationAddress,
}) => {
  const handleTitle = (address, landmark) => {
    let selectedAddress = address + ', ' + landmark;
    return selectedAddress;
  };

  // checkbox true false
  const handleCheckBox = (id, address, landmark, address_coords) => {
    let selectedAddress = address + ', ' + landmark;
    const exists = checked.find((e) => e.id == id);
    if (!exists) {
      setChecked([
        {
          id: id,
          check: true,
          address: selectedAddress,
          address_coords: address_coords,
        },
      ]);
    } else {
      setChecked([]);
    }
  };

  const deleteAddress = async (id) => {
    removeAddress(id, {
      accessToken,
      setIsLoading,
      address,
      setChecked,
      checked,
      setAddress,
    });
  };

  const toggleMap = () => {
    setShowMap('showMap');
    setConfirmedLocationAddress();
  };

  return (
    <View style={{flex: 1}}>
      <Formik
        initialValues={{
          phone_no: phone.toString(),
          address_id: '',
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          goToPayment(values);
          // actions.resetForm();
        }}>
        {(formikProps) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Input
                label="Check Phone No"
                placeholder="Phone No"
                onChangeText={formikProps.handleChange('phone_no')}
                value={formikProps.values.phone_no}
                onBlur={formikProps.handleBlur('phone_no')}
                maxLength={10}
                keyboardType="phone-pad"
                returnKeyType="done"
                errorStyle={styles.error}
                errorMessage={
                  formikProps.touched.phone_no && formikProps.errors.phone_no
                }
              />
              <View style={styles.headingContainer}>
                <Text style={styles.text}>Select Delivery Address or</Text>
                <Button
                  title="Add New"
                  type="clear"
                  onPress={
                    () => toggleMap()
                    // () => navigation.navigate('AddAddress', {phone: phone})
                    // navigation.navigate('Address', {phone: phone})
                  }
                  titleStyle={styles.text}
                />
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  data={address}
                  renderItem={({item}) => (
                    <View style={styles.row}>
                      <CheckBox
                        id={item.id}
                        checked={checked}
                        handleCheckBox={() =>
                          handleCheckBox(
                            item.id,
                            item.address,
                            item.landmark,
                            item.address_coords,
                          )
                        }
                        title={handleTitle(item.address, item.landmark)}
                      />
                      {/* <View style={styles.addressContainer}>
                            <Text>
                              {item.byelane},{item.street}, {item.city},
                              {item.postal_code}
                            </Text>
                          </View> */}
                      <TouchableOpacity
                        onPress={() => deleteAddress(item.id)}
                        style={styles.iconContainer}>
                        <Entypo
                          name="cross"
                          color="red"
                          style={styles.icon}
                          size={calcHeight(4)}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={Divider}
                />
              </View>
              <View style={styles.payBtnContainer}>
                <Button
                  style={styles.button}
                  raised
                  title="Pay Now"
                  onPress={formikProps.handleSubmit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </View>
  );
};

export default SelectAddressUI;
