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
  topContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    backgroundColor: Colors.background,
    marginHorizontal: calcWidth(8),
    borderTopLeftRadius: calcWidth(4),
    borderTopRightRadius: calcWidth(4),
    flex: 1,
  },
  imageContainer: {
    // flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    aspectRatio: 1,
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    flex: 0.85,
  },
  inputSize: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(4.5),
  },
  signUpText: {
    color: Colors.darkGrayish,
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  // allInputsContainer: {
  //   alignSelf: 'center',
  //   // backgroundColor: Colors.inputHolder,
  //   width: calcWidth(80),
  //   marginTop: calcHeight(5),
  // },
  errorContainer: {
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: calcWidth(4),
  },
  forgot: {
    alignSelf: 'center',
    // marginTop: calcHeight(1),
  },
  text: {
    // fontSize: calcWidth(5),
  },
  resetView: {
    alignItems: 'center',
  },
  resetText: {
    color: 'green',
  },
});

export default styles;
