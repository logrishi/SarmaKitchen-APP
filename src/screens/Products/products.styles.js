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
    alignItems: 'center',
  },
  container: {
    // marginHorizontal: calcWidth(1),
    // backgroundColor: 'yellow',
  },
  mealTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '60%',
  },
});

export default styles;
