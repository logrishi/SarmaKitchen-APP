import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

//constants
import Colors from 'constants/colors';
import {screenWidth, calcWidth, calcHeight} from 'constants/deviceConfig';

//fonts
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//animation
import * as Animatable from 'react-native-animatable';

const Counter = ({style, increment, decrement, count}) => {
  return (
    <View style={{...styles.counter, ...style}}>
      <TouchableOpacity onPress={decrement}>
        <FontAwesome
          name="minus-square-o"
          // color={colorDecrement}
          color="red"
          size={calcHeight(3)}
          style={styles.iconLeft}
        />
      </TouchableOpacity>

      <Animatable.Text animation="zoomInUp" style={{...styles.count, ...style}}>
        {count}
      </Animatable.Text>
      {/* <Text style={{...styles.count, ...style}}>{count}</Text> */}

      <TouchableOpacity onPress={increment}>
        <FontAwesome
          name="plus-square-o"
          // color={colorIncrement}
          color="green"
          size={calcHeight(3)}
          style={styles.iconRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize:
      screenWidth > 700
        ? calcWidth(3)
        : screenWidth > 500
        ? calcWidth(4)
        : calcWidth(5),
    // fontFamily: 'sans-serif-medium',
    // textAlign: 'center',
  },
  iconLeft: {
    paddingRight: calcWidth(5),
  },
  iconRight: {
    paddingLeft: calcWidth(5),
  },
});

export default React.memo(Counter);
