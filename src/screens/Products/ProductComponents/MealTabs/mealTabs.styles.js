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
    // backgroundColor: 'red',
    width: '100%',
  },
  mealsContainer: {
    marginVertical: calcHeight(2),
    width: calcWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  mealsView: {
    height: calcHeight(6),
    width: calcWidth(20),
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(1)
        : calcWidth(1),
  },
  mealsText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    paddingHorizontal: calcWidth(1),
  },
});

export default styles;
