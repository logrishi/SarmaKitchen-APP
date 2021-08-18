import {
  calcHeight,
  calcWidth,
  screenHeight,
  screenWidth,
} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  locateMe: {
    position: 'absolute',
    left: calcWidth(80),
    bottom: calcHeight(30),
    // backgroundColor: 'white',
    // width: 100,
  },
});
export default styles;
