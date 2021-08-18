import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//constants
import {
  screenWidth,
  deviceHeight,
  calcHeight,
  calcWidth,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//style
import styles from './loadingStyles';

const showReload = callMethod => {
  return (
    <TouchableOpacity style={styles.loading} onPress={callMethod}>
      <MaterialCommunityIcons name="reload" color="red" size={calcWidth(10)} />
      <Text>Tap to retry</Text>
    </TouchableOpacity>
  );
};

export {showReload};
