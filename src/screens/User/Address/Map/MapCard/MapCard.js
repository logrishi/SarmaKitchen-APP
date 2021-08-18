import {Text, View} from 'react-native';

import Card from 'components/Card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyButton from 'components/MyButton';
import React from 'react';
import {calcHeight} from 'constants/deviceConfig';
import {showSwing} from 'constants/loading';
import styles from './mapCard.styles';

const MapCard = ({
  locationAddress,
  deliveryMsg,
  setConfirmedLocationAddress,
  setShowMap,
}) => {
  const handleAddressConfirm = () => {
    setConfirmedLocationAddress(locationAddress);
    setShowMap('hideMap');
  };
  return (
    <Card style={styles.addressContainer}>
      <View style={styles.addressView}>
        <MaterialIcons
          name="person-pin-circle"
          color="red"
          size={calcHeight(5)}
          style={styles.icon}
        />
        {locationAddress ? (
          <View style={styles.addressTextView}>
            <Text style={styles.addressText}>{locationAddress}</Text>
          </View>
        ) : (
          showSwing
        )}
      </View>
      <View style={styles.deliveryMsgView}>
        {locationAddress ? (
          <Text style={styles.deliveryMsgText}>{deliveryMsg}</Text>
        ) : null}
      </View>
      <View style={styles.btnContainer}>
        <MyButton
          title="Confirm"
          style={styles.btn}
          // onPress={() => setConfirmedLocationAddress(locationAddress)}
          onPress={handleAddressConfirm}
        />
      </View>
    </Card>
  );
};

export default MapCard;
