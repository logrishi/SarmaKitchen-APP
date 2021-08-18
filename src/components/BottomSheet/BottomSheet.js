import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';

import styles from './bottomSheet.styles';

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panY: new Animated.Value(Dimensions.get('screen').height),
    };

    this._resetPositionAnim = Animated.timing(this.state.panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    });

    this._closeAnim = Animated.timing(this.state.panY, {
      toValue: Dimensions.get('screen').height,
      duration: 500,
      useNativeDriver: false,
    });

    this._panResponders = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: this.state.panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 0) {
          return this._closeAnim.start(() => this.props.onDismiss());
        }
        return this._resetPositionAnim.start();
      },
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible && this.props.visible) {
      this._resetPositionAnim.start();
    }
  }
  _handleDismiss() {
    this._closeAnim.start(() => this.props.onDismiss());
  }

  render() {
    const top = this.state.panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });

    let minHeight = 300;
    let maxHeight = 500;

    if (this.props.minHeight) {
      minHeight = this.props.minHeight;
    }
    if (this.props.maxHeight) {
      maxHeight = this.props.maxHeight;
    }

    return (
      <Modal
        animated
        animationType="fade"
        visible={this.props.visible}
        transparent
        onRequestClose={() => this._handleDismiss()}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => this._handleDismiss()}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[styles.container, {top, minHeight, maxHeight}]}>
            <View
              style={styles.dragBarContainer}
              {...this._panResponders.panHandlers}>
              <View style={styles.dragBar}></View>
            </View>
            {this.props.children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

export default BottomSheet;
