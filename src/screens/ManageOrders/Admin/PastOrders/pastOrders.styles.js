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
    backgroundColor: 'white',
  },
  card: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(2),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(2.5),
    elevation: 3,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  orderNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.extremeLightGrayish,
    width: '100%',
    height: calcHeight(5),
  },
  orderIdText: {
    fontFamily: 'sans-serif-medium',
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(4),
  },
  orderDateView: {
    alignSelf: 'baseline',
    backgroundColor: Colors.extremeLightGrayish,
    // marginTop: calcHeight(1),
  },
  orderDateText: {
    fontFamily: 'sans-serif-medium',
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(2.5),
  },
  itemHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    // borderBottomWidth: 1,
    borderColor: Colors.lightGrayish,
    marginTop: calcHeight(2),
  },
  itemHeadingText: {
    fontFamily: 'sans-serif-medium',
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
    borderBottomWidth: 1,
    borderColor: Colors.darkGrayish,
    // backgroundColor: index % 2 == 0 ? 'red' : 'white',
  },
  mealTypeView: {
    alignSelf: 'baseline',
    backgroundColor: Colors.extremeLightGrayish,
    marginTop: calcHeight(1),
  },
  productView: {
    width: calcWidth(55),
    // backgroundColor: 'yellow',
  },
  productText: {
    // fontFamily: 'sans-serif-medium',
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3),
  },
  quantityText: {
    paddingRight:
      screenWidth > 700
        ? calcWidth(2)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(4),
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3),
  },
  customerView: {
    backgroundColor: Colors.extremeLightGrayish,
    width: '90%',
    // width: calcWidth(70),
    marginVertical: calcHeight(2),
    paddingHorizontal: calcWidth(1),
    alignItems: 'baseline',
  },
  customerText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
  },
  subscriptionModalView: {
    alignSelf: 'baseline',
    // backgroundColor: Colors.extremeLightGrayish,
    marginBottom: calcHeight(1),
    // marginTop: 0,
  },
  switch: {
    width: '90%',
    marginBottom: calcHeight(2),
  },
  dateView: {
    alignSelf: 'baseline',
    // backgroundColor: Colors.extremeLightGrayish,
    // marginTop: calcHeight(1),
  },
});

export default styles;
