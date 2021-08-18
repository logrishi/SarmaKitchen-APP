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
  flatlistContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  cardView: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    width: calcWidth(46),
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
  nameView: {
    flexDirection: 'row',
    marginTop: calcHeight(1),
    alignItems: 'center',
    width: calcWidth(40),
    justifyContent: 'center',
  },
  isVegIcon: {
    marginRight: calcWidth(1),
  },
  nameText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: calcHeight(1),
    alignItems: 'center',
    width:
      // screenWidth > 700
      // ? calcWidth(40)
      // : screenWidth > 500
      // ? calcWidth(42)
      // :
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
    // width: calcWidth(46),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    marginTop: calcHeight(1),
    flex: 1,
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
    textAlign: 'center',
  },
  notesView: {
    borderWidth: 1,
    borderRadius:
      screenWidth > 700
        ? calcWidth(0.5)
        : screenWidth > 500
        ? calcWidth(0.5)
        : calcWidth(1),
    borderColor: Colors.lightGrayish,
    backgroundColor: Colors.extremeLightGrayish,
    marginVertical: calcHeight(1),
  },
  notesText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    fontFamily: 'sans-serif',
    textAlign: 'center',
    paddingHorizontal: calcWidth(1),
  },
  btn: {
    marginVertical: calcHeight(1),
  },
});
export default styles;
