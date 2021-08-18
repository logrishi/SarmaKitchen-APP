import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//parallax header
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

const StickyHeader = () => {
  return (
    <View>
      <StickyParallaxHeader
        headerType="TabbedHeader"
        backgroundColor="tomato"
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default StickyHeader;
