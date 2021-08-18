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
  priceView: {
    marginVertical: calcHeight(1),
  },
  priceText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  btn: {
    marginVertical: calcHeight(1),
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
  },
  counter: {
    width: calcWidth(30),
  },
  count: {
    // marginVertical: calcHeight(1),
    alignSelf: 'center',
    // paddingHorizontal: calcWidth(5),
  },
});

export default styles;
