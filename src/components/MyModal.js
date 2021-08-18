import {StyleSheet, View} from 'react-native';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import Modal from 'react-native-modal';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const MyModal = (props) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      <Modal
        animationIn={props.animationIn ? props.animationIn : 'fadeIn'}
        animationOut={props.animationOut}
        statusBarTranslucent
        isVisible={props.isVisible}
        onBackdropPress={() => props.setModalVisible(false)}
        onBackButtonPress={() => props.setModalVisible(false)}
        style={{
          ...styles.modalStyle,
          ...props.style,
          bottom: props.bottom ? props.bottom : -tabBarHeight,
          left: props.left ? props.left : -19,
        }}>
        <View style={{...styles.modalView, ...props.leftStyle, ...props.style}}>
          {props.children}
        </View>
      </Modal>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    height: screenWidth > 500 ? calcHeight(40) : calcHeight(50),
  },
});
