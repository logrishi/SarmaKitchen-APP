import {Modal, Text, View} from 'react-native';
import React, {useState} from 'react';

import Colors from 'constants/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from 'components/MyButton';
import Rating from 'screens/Orders/OrderComponents/Rating';
import {calcWidth} from 'constants/deviceConfig';
import styles from './rateModal.styles';

const RateModal = ({
  handleRating,
  orderItemId,
  accessToken,
  setRatedOrderItemId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mealContainer}>
              <View style={styles.headingView}>
                <Text style={styles.headingText}>Rate meal </Text>
                <Ionicons
                  name="md-restaurant"
                  color={Colors.btnGreen}
                  size={calcWidth(6)}
                  style={styles.statusIcon}
                />
              </View>
              <Rating
                handleRating={handleRating}
                orderItemId={orderItemId}
                accessToken={accessToken}
                setRatedOrderItemId={setRatedOrderItemId}
              />
            </View>

            <View style={styles.deliveryContainer}>
              <View style={styles.headingView}>
                <Text style={styles.headingText}>Rate delivery </Text>
                <Fontisto
                  name="motorcycle"
                  color={Colors.btnGreen}
                  size={calcWidth(6)}
                  style={styles.statusIcon}
                />
              </View>
            </View>
            <Rating
            // handleRating={handleRating}
            // one_time_order={one_time_order}
            // order_id={order_id}
            />

            <View style={styles.btnContainer}>
              <MyButton
                title="Close"
                style={styles.btn}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.rateBtnContainer}>
        <MyButton
          title="Rate Order"
          style={styles.btnRate}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

export default RateModal;
