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
  container1: {
    backgroundColor: Colors.background,
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'flex-start',
  },
  container2: {
    backgroundColor: Colors.background,
    marginHorizontal: calcWidth(8),
    borderTopLeftRadius: calcWidth(4),
    borderTopRightRadius: calcWidth(4),
    flex: 4,
    // backgroundColor: 'yellow',
  },
  imageContainer: {
    // flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    // aspectRatio: 16 / 7,
    // maxHeight: 82.1,
    maxHeight: '60%',
    // alignSelf: 'baseline',
    borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // flex: 1,
  },
  logoText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3.5)
        : calcWidth(4.5),
    fontFamily: 'sans-serif-medium',
    // color: Colors.themeText,
    alignSelf: 'center',
  },
  error: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    textTransform: 'capitalize',
  },
  inputSize: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(4.5),
  },
  errorContainer: {
    alignSelf: 'center',
  },
  // allInputsContainer: {
  //   alignSelf: 'center',
  //   backgroundColor: Colors.inputHolder,
  //   width: calcWidth(80),
  //   marginTop: calcHeight(5),
  // },
  // error: {
  //   color: 'red',
  //   alignSelf: 'center',
  //   fontSize: calcWidth(4),
  // },
});

export default styles;
