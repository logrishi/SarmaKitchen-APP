import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  addressContainer: {
    height: calcHeight(24),
    // backgroundColor: 'red',
    backgroundColor: Colors.background,
    position: 'absolute',
    bottom: calcHeight(4),
    left: calcWidth(3.5),
    width: calcWidth(92),
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  addressView: {
    flex: 1,
    flexDirection: 'row',
    // width: calcWidth(90),
    width: '100%',
    backgroundColor: Colors.extremeLightGrayish,
    alignItems: 'center',
  },
  icon: {
    // marginRight: calcWidth(5),
    marginHorizontal: calcWidth(2),
  },
  addressTextView: {
    flex: 1,
  },
  addressText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  deliveryMsgView: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // width: calcWidth(80),
  },
  deliveryMsgText: {
    color: Colors.primary,
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  btnContainer: {
    marginVertical: calcHeight(1),
  },
  btn: {
    backgroundColor: Colors.background,
    color: 'green',
    borderColor: Colors.darkGrayish,
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    width: screenWidth > 500 ? calcWidth(22) : calcWidth(30),
    height:
      screenWidth > 700
        ? calcHeight(5.5)
        : screenWidth > 500
        ? calcHeight(5)
        : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
});
export default styles;
