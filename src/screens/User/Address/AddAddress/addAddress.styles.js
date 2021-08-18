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
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginVertical: calcHeight(2),
  },
  enterAddress: {
    width: calcWidth(98),
    marginHorizontal: calcWidth(5),
    alignSelf: 'center',
  },

  address: {
    flexDirection: 'row',
    width: calcWidth(50),
  },
  btnContainer: {
    // width: calcWidth(50),
    // alignSelf: 'center',
    marginTop: calcHeight(2),
  },
  btn: {
    backgroundColor: '#00a86b',
    color: 'white',
    // color: 'green',
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
    width: calcWidth(45),
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: calcWidth(4),
  },
  addressContainer: {
    height: calcHeight(24),
    // backgroundColor: 'red',
    // backgroundColor: Colors.background,
    // bottom: calcHeight(4),
    left: calcWidth(3.5),
    width: calcWidth(92),
    // alignItems: 'center',
    // justifyContent: 'center',
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
    // backgroundColor: 'red',
    // alignSelf: 'center',
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
    alignItems: 'center',
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
  btnContainerMap: {
    marginVertical: calcHeight(1),
  },
  btnMap: {
    backgroundColor: Colors.background,
    color: 'red',
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
