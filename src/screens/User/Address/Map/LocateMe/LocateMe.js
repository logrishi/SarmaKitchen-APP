import {Text, TouchableOpacity, View} from 'react-native';

import Card from 'components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {calcHeight} from 'constants/deviceConfig';
import styles from './locateMe.styles';

const LocateMe = ({moveToCurrentLocation}) => {
  return (
    <TouchableOpacity style={styles.locateMe} onPress={moveToCurrentLocation}>
      <Card>
        <MaterialCommunityIcons
          name="crosshairs-gps"
          color="red"
          size={calcHeight(5)}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default LocateMe;
