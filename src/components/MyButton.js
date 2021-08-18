import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  screenWidth,
} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import React from 'react';

//constanst

const MyButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      // activeOpacity={props.disabled ? 1 : 0.5}
      disabled={props.disabled || props.isLoading ? true : false}
      loading={props.isLoading ? <ActivityIndicator color="red" /> : null}
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
    // width: calcWidth(22),
    elevation: 8,
    backgroundColor: Colors.background,
    borderColor: Colors.darkGrayish,
    padding: calcWidth(2),
    borderRadius:
      screenWidth > 700
        ? calcWidth(1)
        : screenWidth > 500
        ? calcWidth(1)
        : calcWidth(1),
    height:
      screenWidth > 700
        ? calcHeight(5)
        : screenWidth > 500
        ? calcHeight(5)
        : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'green',
    fontSize:
      screenWidth > 700
        ? calcWidth(2.5)
        : screenWidth > 500
        ? calcWidth(2.5)
        : calcWidth(3),
    fontFamily: 'sans-serif-medium',
  },
});

export default MyButton;
