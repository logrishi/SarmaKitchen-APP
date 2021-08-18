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
  cardView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    // width: calcWidth(46),
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
    // width: screenWidth > 500 ? calcWidth(18) : calcWidth(18),
    width: calcWidth(20),
    height:
      screenWidth > 700
        ? calcHeight(8)
        : screenWidth > 500
        ? calcHeight(8)
        : calcHeight(8),
    // backgroundColor: 'green',
  },
  image: {
    resizeMode: 'cover',
    // width: screenWidth > 500 ? calcWidth(25) : calcWidth(38),
    width: '90%',
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    flex: 1,
  },
  middleContainer: {
    // alignItems: 'center',
    width: calcWidth(50),
    // backgroundColor: 'red',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: calcWidth(54),
    // justifyContent: 'center',
  },
  icon: {
    marginRight: calcWidth(1),
  },
  titleText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    flexShrink: 1,
    // color: 'gray',
    // flex: 1,
  },
  titleSizeContainer: {
    width: calcWidth(54),
  },
  sizeText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    flexShrink: 1,
    alignSelf: 'center',
    color: 'gray',
  },
  detailsView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius:
      screenWidth > 700
        ? calcWidth(0.5)
        : screenWidth > 500
        ? calcWidth(0.5)
        : calcWidth(1),
    borderColor: Colors.lightGrayish,
    backgroundColor: Colors.extremeLightGrayish,
    // marginVertical: calcHeight(1),
    // alignSelf: 'center',
    alignSelf: 'flex-start',
  },
  notesView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    color: 'gray',
  },
  hifen: {
    marginHorizontal: calcWidth(2),
    color: 'gray',
  },
  counterContainer: {
    marginRight: calcWidth(2),
    alignSelf: 'center',
    // backgroundColor: 'yellow',
  },
});

export default styles;
