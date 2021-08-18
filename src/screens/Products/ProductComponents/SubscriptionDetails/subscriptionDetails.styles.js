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
  titleContainer: {
    alignItems: 'center',
  },
  titleView: {
    marginVertical: calcHeight(1),
    borderBottomColor: 'orange',
    borderBottomWidth: 4,
    width: calcWidth(50),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
  },
  detailsView: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(2),
  },
  dateView: {
    borderLeftColor: 'orange',
    borderLeftWidth: 4,
    marginVertical: calcHeight(1),
    backgroundColor: Colors.extremeLightGrayish,
    height: calcHeight(4),
    justifyContent: 'center',
  },
  // endDateView: {
  //   borderLeftColor: 'orange',
  //   borderLeftWidth: 4,
  //   marginVertical: calcHeight(1),
  //   backgroundColor: Colors.extremeLightGrayish,
  //   height: calcHeight(4),
  //   justifyContent: 'center',
  // },
  dateText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    marginLeft: calcWidth(1),
  },
  pickerContainer: {
    flexDirection: 'row',
    marginVertical: calcHeight(1),
    // marginHorizontal: calcWidth(1),
    alignItems: 'center',
    backgroundColor: Colors.extremeLightGrayish,
    borderLeftColor: 'orange',
    borderLeftWidth: 4,
    height: calcHeight(4),
    // width: calcWidth(50),
  },
  picker: {
    width: calcWidth(30),
    height: calcHeight(4),
    marginHorizontal: calcWidth(1),
    // backgroundColor: 'red',
  },
  btnContainer: {
    marginVertical: calcHeight(1),
  },
});

export default styles;
