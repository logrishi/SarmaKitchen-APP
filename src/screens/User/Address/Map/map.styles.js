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
  },
  map: {
    flex: 1,
  },
  marker: {
    flex: 1,
    // zIndex: 3,
    position: 'absolute',
    marginTop: screenWidth > 500 ? calcHeight(-5) : calcHeight(-5),
    // marginLeft: -17,
    marginLeft:
      screenWidth > 700
        ? calcWidth(-3.5)
        : screenWidth > 500
        ? calcWidth(-4.5)
        : calcWidth(-4.5),
    // marginRight: 50,
    // marginBottom: 50,
    left: '50%',
    top: '50%',
    margin: 'auto',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
export default styles;
