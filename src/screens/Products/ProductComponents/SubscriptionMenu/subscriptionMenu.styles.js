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
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
  },
  cardView: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    // borderWidth: 1,
    // borderColor: Colors.extremeLightGrayish,
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(1)
        : calcWidth(1),
  },
  imageContainer: {
    marginRight: calcWidth(1),
    alignItems: 'center',
    width:
      screenWidth > 700
        ? calcWidth(40)
        : screenWidth > 500
        ? calcWidth(18)
        : calcWidth(22),
    height:
      screenWidth > 700
        ? calcHeight(18)
        : screenWidth > 500
        ? calcHeight(8)
        : calcHeight(8), // if horizontal scroll this reqd but image not not reqd. in vertical scroll vice versa
  },
  image: {
    resizeMode: 'cover',
    // width: '70%',
    width: '100%',
    // width: calcWidth(45),
    // marginRight: calcWidth(1),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    flex: 1,
  },
  nameText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  descriptionView: {
    marginVertical: calcHeight(1),
  },
  descriptionText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-condensed',
  },
});

export default styles;
