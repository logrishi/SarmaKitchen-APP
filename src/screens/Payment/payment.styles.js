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
  heading: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    // borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    elevation: 3,
    backgroundColor: Colors.extremeLightGrayish,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    height: calcHeight(5),
  },
  text: {
    fontFamily: 'sans-serif-medium',
  },
  btnContainer: {
    marginVertical: calcHeight(2),
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
});

export default styles;
