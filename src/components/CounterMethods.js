import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

//constants
import {screenWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url, image_url} from 'constants/url';

// components
import Counter from 'components/reusable/Counter';
import CustomButtonSquare from 'components/reusable/CustomButtonSquare';
import ProductDetails from 'screens/products/components/ProductDetails';

//context
import {CartContext} from 'context/CartContext';

//animation
import * as Animatable from 'react-native-animatable';

// usenavigation
// import { useNavigation } from "@react-navigation/native";

const CounterMethods = ({products}) => {
  const {
    productId,
    detailsId,
    name,
    description,
    is_veg,
    size,
    note,
    price,
    stock,
    image,
    for_sale,
  } = products;
  // const { navigation } = props.navigation;

  const [count, setCount] = useState(0);
  const [countQty, setCountQty] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [touched, setTouched] = useState(false);

  const {addCartItems} = useContext(CartContext);
  const {removeCartItems} = useContext(CartContext);
  const {cartItems} = useContext(CartContext);
  const {cartQty} = useContext(CartContext);

  useEffect(() => {
    checkQty();
    // props.navigation.addListener('focus', () => {
    //   checkQty();
    // });
    // console.log('event'); -- dont dlte. to ask if bst prcts to dhruba
  }, [cartQty]);

  const checkQty = () => {
    const exists = cartItems.find(item => item.detailsId === detailsId);
    if (exists) {
      const currIndex = cartItems.indexOf(exists);
      let qty = cartItems[currIndex].quantity;
      setCountQty(qty);
      setCount(qty);
    } else {
      setCount(0);
    }
  };

  const increment = () => {
    setTouched(true);
    addCartItems(
      productId,
      detailsId,
      name,
      description,
      is_veg,
      size,
      note,
      price,
      stock,
      image,
      for_sale,
    );
    setCount(count => count + 1);
  };

  const decrement = () => {
    removeCartItems(detailsId);
    setCount(count => count - 1);
  };
  // console.log()
  return (
    <View>
      <View>
        <Text style={styles.price}>₹ {count > 0 ? price * count : price}</Text>
      </View>

      <View style={styles.btnContainer}>
        {count == 0 ? (
          <Animatable.View animation="zoomInUp">
            <CustomButtonSquare
              title="ADD"
              style={styles.btn}
              onPress={increment}
            />
          </Animatable.View>
        ) : countQty > 0 ? (
          <Animatable.View animation="fadeInUp">
            <Counter
              style={(styles.counter, styles.count)}
              increment={increment}
              decrement={decrement}
              count={count > 0 ? countQty : count}
              size={calcHeight(3)}
              colorIncrement="green"
              colorDecrement="red"
            />
          </Animatable.View>
        ) : // <Animatable.View animation="fadeInUp">
        //   <Counter
        //     style={(styles.counter, styles.count)}
        //     increment={increment}
        //     decrement={decrement}
        //     count={count > 0 ? countQty : count}
        //     size={calcHeight(3)}
        //     colorIncrement="green"
        //     colorDecrement="red"
        //   />
        // </Animatable.View>
        null}
      </View>
      {/* 
       
      <View style={styles.btnCounterContainer}>
        {!clicked || count == 0 ? (
          <CustomButton
            onPress={increment}
            title="ADD"
            style={styles.button}
          />
      */}
    </View>
  );
};
const styles = StyleSheet.create({
  price: {
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
    alignSelf: 'center',
  },
  // btnCounterContainer: {
  //   // height: calcHeight(4),
  //   // paddingVertical: calcHeight(1),
  // },
  // button: {
  //   backgroundColor: Colors.blueColor,
  //   fontSize: calcWidth(4),
  // },
  counter: {
    width: calcWidth(30),
  },
  count: {
    alignSelf: 'center',
    fontSize: screenWidth > 500 ? calcWidth(3.5) : calcWidth(4.5),
    fontFamily: 'sans-serif-medium',
  },
  btnContainer: {
    height: calcHeight(6),
    justifyContent: 'center',
    marginBottom: calcHeight(1),
    // backgroundColor: 'red',
  },
  btn: {
    backgroundColor: Colors.background,
    // backgroundColor: 'red',
    color: 'green',
    // borderWidth: 1,
    borderColor: Colors.darkGrayish,
    padding: calcWidth(2),
    borderRadius: screenWidth > 500 ? calcWidth(1) : calcWidth(2),
    width: calcWidth(22),
    height: screenWidth > 500 ? calcHeight(5) : calcHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth > 500 ? calcWidth(2.5) : calcWidth(4),
    fontFamily: 'sans-serif-medium',
  },
});
export default CounterMethods;
