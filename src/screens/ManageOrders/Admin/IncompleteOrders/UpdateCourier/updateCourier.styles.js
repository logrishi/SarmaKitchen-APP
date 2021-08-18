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
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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

export default styles;
