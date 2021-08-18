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
    backgroundColor: Colors.background,
  },
  container: {
    marginHorizontal: calcWidth(1),
    marginVertical: calcHeight(1),
  },
  billView: {
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(1),
    backgroundColor: Colors.extremeLightGrayish,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height:
      screenWidth > 700
        ? calcHeight(5)
        : screenWidth > 500
        ? calcHeight(7)
        : calcHeight(6),
  },
  billText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  btn: {
    // width:
    //   screenWidth > 700
    //     ? calcWidth(30)
    //     : screenWidth > 500
    //     ? calcWidth(30)
    //     : calcWidth(30),
  },
});

export default styles;
