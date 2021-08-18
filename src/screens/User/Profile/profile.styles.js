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
  detailsView: {
    marginHorizontal: calcWidth(1),
    marginVertical: calcHeight(2),
    borderLeftWidth: 4,
    borderLeftColor: 'orange',
    paddingLeft: 5,
  },
  detailsText: {
    fontSize: scale(12),
    fontFamily: 'Roboto',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.extremeLightGrayish,
    marginHorizontal: calcWidth(2),
  },
});

export default styles;
