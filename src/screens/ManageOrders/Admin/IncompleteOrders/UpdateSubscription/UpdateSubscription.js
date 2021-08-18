import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import {Formik} from 'formik';
import {Input} from 'react-native-elements';
import MyButton from 'components/MyButton';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from 'context/UserContext';
import {isLoggedIn} from 'constants/handleErrors';
import {scale} from 'react-native-size-matters';
import {showSwing} from 'constants/loading';
import {updateSubscriptionDetails} from '../UpdateDeliveryModal/updateDeliveryModal.actions';

const UpdateSubscription = ({
  today,
  orderId,
  menu,
  schedule,
  courier,
  setModalVisible,
  organiseData,
}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [dish, setDish] = useState();
  const [status, setStatus] = useState();
  const [deliveredBy, setDeliveredBy] = useState();
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    setIsLoading(true);
    checkMenuItem();
  }, []);

  const checkMenuItem = () => {
    setIsLoading(true);
    let dishDelivered = null;
    let orderStatus = null;
    let delivered_by = null;
    let menuList = [];

    for (var i in schedule) {
      if (schedule[i].delivery_date == today) {
        dishDelivered = schedule[i].product_delivered;
        orderStatus = schedule[i].order_status;
        delivered_by = schedule[i].delivered_by;
      }
    }
    for (var i in menu) {
      menuList.push(menu[i].name);
    }
    setDish(dishDelivered);
    setStatus(orderStatus);
    setDeliveredBy(delivered_by);
    setMenuItems(menuList);
    setIsLoading(false);
  };

  const saveValues = () => {
    updateSubscriptionDetails(dish, status, deliveredBy, today, orderId, {
      accessToken,
      setModalVisible,
      organiseData,
    });
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : (
        <Formik
          initialValues={{
            product_delivered: dish,
            order_status: status,
            delivered_by: deliveredBy,
          }}
          onSubmit={(values) => {
            saveValues(values);
          }}>
          {(formikProps) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={{width: calcWidth(60)}}>
                  <Input label="Delivery Date" value={today} disabled />

                  <View style={styles.pickerContainer}>
                    <Picker
                      mode="dropdown"
                      selectedValue={dish}
                      style={styles.picker}
                      onValueChange={(itemValue) => setDish(itemValue)}>
                      <Picker.Item label="Select Dish" />
                      {menuItems.map((e) => {
                        return <Picker.Item label={e} value={e} key={e} />;
                      })}
                    </Picker>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      mode="dropdown"
                      selectedValue={status}
                      style={styles.picker}
                      onValueChange={(itemValue) => setStatus(itemValue)}>
                      <Picker.Item label="Select Status" />
                      <Picker.Item
                        label="Out For Delivery"
                        value="Out For Delivery"
                      />
                      <Picker.Item label="Delivered" value="Delivered" />
                    </Picker>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      mode="dropdown"
                      selectedValue={deliveredBy}
                      style={styles.picker}
                      onValueChange={(itemValue) => setDeliveredBy(itemValue)}>
                      <Picker.Item label="Select Courier" />
                      {courier.map((e) => {
                        return (
                          <Picker.Item
                            label={e.name}
                            value={e.name}
                            key={e.id}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>

                <MyButton
                  style={styles.btn}
                  title="Submit"
                  onPress={formikProps.handleSubmit}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </Formik>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: Colors.extremeLightGrayish,
    marginVertical: calcHeight(1),
  },
  picker: {
    width: calcWidth(50),
    height: calcHeight(4),
    marginHorizontal: calcWidth(1),
  },
  btn: {
    marginVertical: scale(10),
  },
});

export default UpdateSubscription;
