import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

//constants
import Colors from 'constants/colors';

//context
import {CartContext} from 'context/CartContext';

const Badge = (props) => {
  const {cartQty} = useContext(CartContext);
  const navigation = props.navigation;

  return (
    <TouchableOpacity
      style={{...styles.badgeView, ...props.style}}
      onPress={() => navigation.navigate('Cart')}>
      <Text style={styles.badgeText}>{cartQty}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badgeView: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.whiteColor,
    alignSelf: 'center',
  },
});

export default Badge;
