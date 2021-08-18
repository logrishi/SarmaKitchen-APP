import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import MyModal from 'components/MyModal';
import UpdateCourier from '../UpdateCourier';
import UpdateSubscription from '../UpdateSubscription';
import {scale} from 'react-native-size-matters';

const UpdateDeliveryModal = ({
  today,
  orderId,
  menu,
  schedule,
  courier,
  organiseData,
  deliveredBy,
  subscriptionDuration,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <MyModal isVisible={modalVisible} setModalVisible={setModalVisible}>
        {subscriptionDuration > 1 ? (
          <UpdateSubscription
            today={today}
            orderId={orderId}
            menu={menu}
            schedule={schedule}
            courier={courier}
            setModalVisible={setModalVisible}
            organiseData={organiseData}
          />
        ) : (
          <UpdateCourier
            courier={courier}
            deliveredBy={deliveredBy}
            orderId={orderId}
            setModalVisible={setModalVisible}
            organiseData={organiseData}
          />
        )}
      </MyModal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuBtnTouchable}>
        {subscriptionDuration > 1 ? (
          <Text style={styles.menuBtn}>Update Delivery</Text>
        ) : (
          <Text style={styles.menuBtn}>Update Courier</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBtnTouchable: {
    marginBottom: scale(10),
    width: calcWidth(30),
  },
  menuBtn: {
    color: 'blue',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    marginTop: calcHeight(1),
  },
  // btnContainer: {
  //   marginTop: calcHeight(1),
  // },
  // btn: {
  //   color: Colors.btnCloseRed,
  // },
});
export default UpdateDeliveryModal;
