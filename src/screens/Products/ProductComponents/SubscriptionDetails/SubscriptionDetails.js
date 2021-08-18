import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {CartContext} from 'context/CartContext';
import MyButton from 'components/MyButton';
import {Picker} from '@react-native-picker/picker';
import SubscriptionMenu from '../SubscriptionMenu';
import {createTwoButtonAlert} from 'constants/alerts';
import {infoToast} from 'constants/toasts';
import styles from './subscriptionDetails.styles';

const SubscriptionDetails = ({route, navigation}) => {
  let id = route.params.id;
  let name = route.params.name;
  let price = route.params.price;
  let products = route.params.products;
  let startDate = route.params.startDate;
  let endDate = route.params.endDate;
  let selectedSubscription = route.params.selectedSubscription;
  let selectedMeal = route.params.selectedMeal;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [countQty, setCountQty] = useState(0);
  const {addCartItems} = useContext(CartContext);
  const {addSubscription} = useContext(CartContext);
  const {cartItems} = useContext(CartContext);
  const {cartQty} = useContext(CartContext);

  useEffect(() => {
    filterProducts();
  }, []);

  const filterProducts = () => {
    if (id == 'veg') {
      let res = products.filter((e) => e.is_veg);
      setFilteredProducts(res);
    } else if (id == 'nonVeg') {
      let res = products.filter((e) => !e.is_veg);
      setFilteredProducts(res);
    } else {
      setFilteredProducts(products);
    }
  };

  const addToCart = () => {
    let exists = cartItems.find((e) => e.selectedSubscription == 1);
    if (exists) {
      let msg =
        '1 Time Order & Subscription Order cannot be placed at the same time!';
      createTwoButtonAlert(msg);
    } else {
      let mealBoxInCart = cartItems.find(
        (e) => e.customId == id + selectedMeal + selectedSubscription,
      );
      let mealTypeInCart = cartItems.find(
        (e) => e.selectedMeal == selectedMeal,
      );

      if (mealBoxInCart) {
        let msg = 'Already in Cart!';
        createTwoButtonAlert(msg);
      } else if (mealTypeInCart) {
        let msg = 'You have already added a ' + selectedMeal + ' subscription!';
        createTwoButtonAlert(msg);
      } else {
        if (quantity > 0) {
          addSubscription(
            id,
            name,
            price,
            startDate,
            endDate,
            selectedSubscription,
            selectedMeal,
            quantity,
            filteredProducts,
          );
        } else {
          infoToast('Select number of persons', 0.5);
        }
      }
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            {name} Menu ({selectedSubscription} days)
          </Text>
        </View>
      </View>
      <SubscriptionMenu filteredProducts={filteredProducts} />

      <View style={styles.detailsView}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>
            Your tiffin starts on: {startDate}
          </Text>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>Your tiffin ends on: {endDate}</Text>
        </View>
        <View style={styles.pickerContainer}>
          {/* <Text style={styles.dateText}>Meal for how many persons: </Text> */}
          <Text style={styles.dateText}>
            Number of persons to deliver meal for:
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={quantity}
            style={styles.picker}
            onValueChange={(itemValue) => setQuantity(itemValue)}>
            <Picker.Item label="Select" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>

        <View style={styles.dateView}>
          <Text style={styles.dateText}>
            Amount Payable: ₹ {price * quantity}
          </Text>
        </View>
        {/* <Text>A dish from the listed menu will be delivered</Text> */}
        <View style={styles.btnContainer}>
          <MyButton title="ADD" onPress={addToCart} />
        </View>
      </View>
    </View>
  );
};

export default SubscriptionDetails;
