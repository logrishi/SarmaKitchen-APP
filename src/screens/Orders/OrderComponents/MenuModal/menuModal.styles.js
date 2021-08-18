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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingView: {
    backgroundColor: Colors.extremeLightGrayish,
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: calcHeight(1),
    padding: calcHeight(1),
  },
  headingText: {
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  productNameView: {
    backgroundColor: Colors.extremeLightGrayish,
    marginVertical: calcHeight(1),
    alignContent: 'center',
    alignItems: 'center',
  },
  productNameText: {
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  vegIcon: {
    marginHorizontal: calcWidth(1),
  },
  menuBtnTouchable: {
    width: calcWidth(30),
  },
  menuBtn: {
    // backgroundColor: Colors.extremeLightGrayish,
    color: 'green',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2) : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    marginTop: calcHeight(1),
  },
});
export default styles;
