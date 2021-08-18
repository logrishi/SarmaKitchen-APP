import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {CartContext} from 'context/CartContext';
import Counter from 'components/Counter';
import MyButton from 'components/MyButton';
import {createTwoButtonAlert} from 'constants/alerts';
import styles from './buttonCounter.styles';

const ButtonCounter = ({
  id,
  name,
  image,
  is_veg,
  description,
  notes,
  size,
  price,
  selectedMeal,
  selectedSubscription,
}) => {
  const [countQty, setCountQty] = useState(0);
  const {addCartItems} = useContext(CartContext);
  const {removeCartItems} = useContext(CartContext);
  const {cartItems} = useContext(CartContext);
  const {cartQty} = useContext(CartContext);

  useEffect(() => {
    checkQty();
  }, [cartQty]);

  const checkQty = () => {
    const exists = cartItems.filter(
      (item) => item.customId == id + selectedMeal + size,
    );
    let qty = 0;
    if (exists) {
      for (var i in exists) {
        qty += exists[i].quantity;
      }
      setCountQty(qty);
    }
  };

  const increment = () => {
    let exists = cartItems.find((e) => e.selectedSubscription > 1);
    if (exists) {
      let msg =
        '1 Time Order & Subscription Order cannot be placed at the same time!';
      createTwoButtonAlert(msg);
    } else {
      addCartItems(
        id,
        name,
        image,
        is_veg,
        description,
        notes,
        size,
        price,
        selectedMeal,
        selectedSubscription,
      );
    }
  };

  const decrement = () => {
    removeCartItems(id, selectedMeal, size);
  };

  return (
    <View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>
          ₹ {countQty > 0 ? price * countQty : price}
        </Text>
      </View>

      {cartItems.find((e) => e.customId == id + selectedMeal + size) ? (
        <Counter
          style={(styles.counter, styles.count)}
          increment={increment}
          decrement={decrement}
          count={countQty}
        />
      ) : (
        <MyButton title="ADD" onPress={increment} style={styles.btn} />
      )}
    </View>
  );
};

export default ButtonCounter;
