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
    marginHorizontal: calcWidth(1),
    // width: '99%',
    width: calcWidth(98),
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
  },
  cardView: {
    // backgroundColor: 'green',
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    width: calcWidth(46.9),
    // width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.extremeLightGrayish,
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(1)
        : calcWidth(1),
  },
  imageContainer: {
    alignItems: 'center',
    width:
      // screenWidth > 700
      //   ? calcWidth(40)
      //   : screenWidth > 500
      //   ? calcWidth(42)
      //   : calcWidth(50),
      calcWidth(46),
    height:
      screenWidth > 700
        ? calcHeight(18)
        : screenWidth > 500
        ? calcHeight(18)
        : calcHeight(18), // if horizontal scroll this reqd but image not not reqd. in vertical scroll vice versa
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
  mealBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: calcHeight(1),
  },
  isVegIcon: {
    marginRight: calcWidth(1),
  },
  mealBoxText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
  },
  priceView: {
    marginVertical: calcHeight(1),
  },
  priceText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  btn: {
    marginVertical: calcHeight(1),
    // height: calcHeight(4),
    width: calcWidth(30),
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    // fontFamily: 'sans-serif',
    color: 'orange',
  },
});

export default styles;
