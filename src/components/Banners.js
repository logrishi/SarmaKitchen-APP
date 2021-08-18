import {StyleSheet, Text, View} from 'react-native';
import {calcHeight, calcWidth, screenWidth} from 'constants/deviceConfig';

import Colors from 'constants/colors';
import React from 'react';
import Swiper from 'react-native-swiper';
import {scale} from 'react-native-size-matters';

const Banners = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      // index={1}
      autoplay={true}
      showsButtons={false}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Fresh, Hygeinic & Homely Food</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Missing home food? Book a Tiffin</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>Snack up with</Text>
        <Text style={styles.text}>
          Pitha, Laru, sweets and many more - made@home
        </Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: scale(99),
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: calcWidth(1),
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
    borderRadius: calcWidth(1),
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    borderRadius: calcWidth(1),
  },
  text: {
    color: '#fff',
    fontSize: scale(10),
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
});

export default Banners;
