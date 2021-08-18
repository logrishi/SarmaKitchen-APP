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
  flatListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    // width: calcWidth(70),
    // backgroundColor: 'red',
  },
  headingView: {
    backgroundColor: Colors.extremeLightGrayish,
    marginVertical: calcHeight(1),
    padding: calcHeight(1),
    alignItems: 'center',
  },
  headingText: {
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  headerComponentContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrayish,
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    alignItems: 'center',
    padding: calcHeight(1),
    // flex: 1,
    // justifyContent: 'space-evenly',
    // width: '100%',
    // backgroundColor: 'red',
  },
  headerComponentView: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'blue',
    marginHorizontal: calcWidth(1),
  },
  headerComponentText: {
    fontSize: screenWidth > 500 ? calcWidth(3) : calcWidth(3.3),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  detailsContainer: {
    // backgroundColor: Colors.extremeLightGrayish,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: calcHeight(1),
    // backgroundColor: 'yellow',
    flex: 1,
  },
  detailsView: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3),
    fontFamily: 'sans-serif-medium',
  },
  scheduleBtnTouchable: {
    width: calcWidth(30),
  },
  scheduleBtn: {
    // backgroundColor: Colors.extremeLightGrayish,
    color: 'green',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    marginTop: calcHeight(1),
  },
  btnContainer: {
    marginTop: calcHeight(1),
  },
  btn: {
    color: Colors.btnCloseRed,
  },
});
export default styles;
