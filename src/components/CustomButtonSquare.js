import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

//constanst
import {
  deviceWidth,
  calcWidth,
  calcHeight,
  screenWidth,
} from 'constants/deviceConfig';
import Colors from 'constants/colors';

const CustomButtonSquare = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.onPress()}
      style={{...styles.customButton, ...props.style}}>
      <Text style={{...styles.customButtonText, ...props.style}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  customButton: {
    alignSelf: 'center',
    width: calcWidth(30),
    // padding: calcWidth(2),
    // borderRadius: deviceWidth / 2,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    elevation: 8,
  },
  // customButton: {
  //   alignSelf: 'center',
  //   width: calcWidth(30),
  //   elevation: 8,
  //   backgroundColor: Colors.background,
  //   // backgroundColor: 'red',
  //   color: 'green',
  //   // borderWidth: 1,
  //   borderColor: Colors.darkGrayish,
  //   padding: calcWidth(2),
  //   borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
  //   width: calcWidth(22),
  //   height: screenWidth > 500 ? calcHeight(5) : calcHeight(5),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
  //   fontFamily: 'sans-serif-medium',
  // },
  customButtonText: {
    textAlign: 'center',
    // color: 'green',
  },
});

export default CustomButtonSquare;
