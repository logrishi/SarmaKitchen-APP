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
  },
  container: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    flex: 1,
  },
  pageHeadingContainer: {
    backgroundColor: Colors.extremeLightGrayish,
    alignItems: 'center',
    justifyContent: 'center',
    height: calcHeight(4),
  },
  pageTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(3)
        : calcWidth(3.5),
    alignSelf: 'center',
  },

  // emailText: {
  //   fontFamily: 'sans-serif-medium',
  //   fontSize: calcWidth(3.5),
  //   color: Colors.btnBlue,
  // },
  card: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(1)
        : calcWidth(2),
    elevation: 3,
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // backgroundColor: 'red',
    // borderWidth: 1,
    // borderColor: Colors.extremeLightGrayish,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemsContainer: {
    flexDirection: 'row',
  },
  cardItemsView: {
    // alignItems: 'center',
    width: calcWidth(65),
    // backgroundColor: 'blue',
  },
  statusIconContainer: {
    marginVertical: calcHeight(1),
    // backgroundColor: 'green',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {},
  statusText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    // fontFamily: 'sans-serif-medium',
    alignSelf: 'center',
    // backgroundColor: 'red',
    textAlign: 'center',
  },
  otpView: {
    marginTop: calcHeight(1),
    backgroundColor: Colors.extremeLightGrayish,
    paddingHorizontal: calcWidth(1),
  },
  otpText: {
    fontFamily: 'sans-serif-medium',
    fontSize:
      screenWidth > 700
        ? calcWidth(3.5)
        : screenWidth > 500
        ? calcWidth(3.5)
        : calcWidth(3),
    color: 'orange',
  },
  btnContainer: {
    marginTop: calcHeight(2),
  },
  orderItems: {
    marginVertical: calcHeight(1),
    marginHorizontal: calcWidth(1),
    flex: 1,
    // backgroundColor: 'red',
  },
  text: {
    fontFamily: 'sans-serif-medium',
    // fontSize: deviceWidth < 350 ? calcWidth(3.5) : calcWidth(3.5),
    fontSize:
      screenWidth > 700
        ? calcWidth(3.5)
        : screenWidth > 500
        ? calcWidth(3.5)
        : calcWidth(3.5),
  },
  nextIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: calcWidth(8),
    // backgroundColor: 'black',
    // marginHorizontal: calcWidth(2),
  },
  productNameView: {
    backgroundColor: Colors.extremeLightGrayish,
  },
  productNameIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productNameText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  vegIcon: {
    marginRight: calcWidth(1),
  },
  customizationsView: {},
  customizationsText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2)
        : screenWidth > 500
        ? calcWidth(2)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
    // marginHorizontal: calcWidth(1),
  },
  orderDetailsView: {
    backgroundColor: Colors.extremeLightGrayish,
    marginVertical: calcHeight(1),
  },
  orderDetailsText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  subsDetailsView: {
    backgroundColor: Colors.extremeLightGrayish,
    marginTop: calcHeight(1),
  },
  rateBtn: {
    // alignItems: 'flex-start',
    alignItems: 'center',
  },
  rateView: {
    // alignItems: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: Colors.lightGrayish,
    backgroundColor: '#FBF1F0',
    // justifyContent: 'flex-start',
  },
  ratingText: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
  },
  ratingValue: {
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3.5),
    fontFamily: 'sans-serif-medium',
    // color: Colors.richDarkCyan,
    color: 'orange',
  },
});

export default styles;
