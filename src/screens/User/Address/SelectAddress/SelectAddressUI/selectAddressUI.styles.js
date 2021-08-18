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
    backgroundColor: Colors.background,
    flex: 1,
  },
  headingContainer: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    elevation: 3,
    backgroundColor: Colors.extremeLightGrayish,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    // height: calcHeight(5),
  },
  emptyHeadingContainer: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    elevation: 3,
    backgroundColor: Colors.extremeLightGrayish,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    height: calcHeight(5),
    width: screenWidth > 500 ? calcWidth(70) : calcWidth(80),
  },
  btn: {
    backgroundColor: '#00a86b',
    color: 'white',
    // color: 'green',
    padding: calcWidth(1),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
    // height: calcHeight(4),
    // width: calcWidth(45),
  },
  container: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    flex: 1,
    // backgroundColor: 'green',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: calcWidth(1),
    width: '97%',
  },
  text: {
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  addressContainer: {
    width: screenWidth > 500 ? calcWidth(70) : calcWidth(60),
    // backgroundColor: 'green',
  },
  addressText: {},
  iconContainer: {
    // backgroundColor: 'yellow',
    // marginLeft: calcWidth(4),
  },
  icon: {},
  payBtnContainer: {
    alignSelf: 'center',
    width: calcWidth(30),
    marginVertical: calcHeight(1),
  },
});

export default styles;
