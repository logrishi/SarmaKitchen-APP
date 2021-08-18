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
    marginBottom: calcHeight(1),
    // flex: 1,
  },
  categoryView: {
    marginHorizontal: calcWidth(1),
    marginVertical: calcHeight(2),
    backgroundColor: Colors.extremeLightGrayish,
    borderLeftWidth: 4,
    borderLeftColor: 'orange',
    paddingLeft: 5,
  },
  categoryText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3.5)
        : screenWidth > 500
        ? calcWidth(3.5)
        : calcWidth(4.5),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  mealTypeContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
    width: calcWidth(42),
  },
  mealTypeText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(4),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    width:
      screenWidth > 700
        ? calcWidth(40)
        : screenWidth > 500
        ? calcWidth(42)
        : calcWidth(50),
    height:
      screenWidth > 700
        ? calcHeight(15)
        : screenWidth > 500
        ? calcHeight(15)
        : calcHeight(15), // if horizontal scroll this reqd but image not not reqd. in vertical scroll vice versa
    // backgroundColor: 'yellow',
  },
  image: {
    resizeMode: 'cover',
    width: '70%',
    marginRight: calcWidth(1),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    marginTop: calcHeight(2),
    flex: 1,
  },
});

export default styles;
