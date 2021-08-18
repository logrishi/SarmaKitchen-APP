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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    padding: calcHeight(2),
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: calcWidth(2),
    // height: screenWidth > 500 ? calcHeight(40) : calcHeight(50),
    // flex: 1,
  },
  container: {
    width: calcWidth(70),
  },
  mealContainer: {
    alignItems: 'center',
    width: '100%',
  },
  deliveryContainer: {
    alignItems: 'center',
    marginTop: calcHeight(1),
    width: '100%',
  },
  headingView: {
    backgroundColor: Colors.extremeLightGrayish,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    color: Colors.btnGreen,
  },
  btnContainer: {
    marginTop: calcHeight(1),
  },
  btn: {
    color: Colors.btnCloseRed,
  },
  rateBtnContainer: {
    // alignContent: 'flex-start',
    // justifyContent: 'flex-start',
    // alignSelf: 'baseline',
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  btnRate: {
    height: calcHeight(4),
    // width:calcWidth(10)
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    color: 'orange',
    // alignSelf: 'baseline',
    // alignItems: 'center',
  },
});
export default styles;
