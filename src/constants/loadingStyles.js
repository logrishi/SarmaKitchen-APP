import {StyleSheet} from 'react-native';

//constants
import {
  screenWidth,
  deviceHeight,
  calcHeight,
  calcWidth,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

export default StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    // backgroundColor: Colors.background,
  },
});
