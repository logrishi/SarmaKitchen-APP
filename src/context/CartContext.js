import React, {createContext, useState, useEffect} from 'react';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//context
export const CartContext = createContext();
const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartItemsLocalStore();
    getCartQtyLocalStore();
  }, []);

  useEffect(() => {
    setCartItemsLocalStore();
    checkTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    setCartQtyLocalStore();
    checkTotalPrice();
  }, [cartQty]);

  const setCartItemsLocalStore = async () => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem('cartItemsStore', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getCartItemsLocalStore = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItemsStore');
      if (cartItems != null) {
        setCartItems(JSON.parse(cartItems));
      }
      //   return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const setCartQtyLocalStore = async () => {
    try {
      const jsonValue = JSON.stringify(cartQty);
      await AsyncStorage.setItem('cartQty', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getCartQtyLocalStore = async () => {
    try {
      const cartQty = await AsyncStorage.getItem('cartQty');
      if (cartQty != null) {
        setCartQty(JSON.parse(cartQty));
      }
    } catch (e) {
      // error reading value
    }
  };

  const addSubscription = (
    id,
    name,
    price,
    startDate,
    endDate,
    selectedSubscription,
    selectedMeal,
    quantity,
    filteredProducts,
  ) => {
    setCartQty((cartQty) => cartQty + 1);
    const exists = cartItems.find(
      (item) => item.customId === name + selectedMeal + selectedSubscription,
    );

    if (!exists) {
      setCartItems((cartItems) => [
        ...cartItems,
        {
          id: id,
          customId: id + selectedMeal + selectedSubscription,
          name: name,
          price: price * quantity,
          startDate: startDate,
          endDate: endDate,
          selectedSubscription: selectedSubscription,
          selectedMeal: selectedMeal,
          numServings: quantity,
          filteredProducts: filteredProducts,
          quantity: 1, //reqd for total price calc
        },
      ]);
    }
  };

  const removeSubscription = (id, selectedMeal, selectedSubscription) => {
    const found = cartItems.find(
      (item) => item.customId === id + selectedMeal + selectedSubscription,
    );
    const existingCart = [...cartItems];
    const currIndex = existingCart.indexOf(found);
    existingCart.splice(currIndex, 1);
    setCartItems(existingCart);
    setCartQty((cartQty) => cartQty - 1);
  };

  const addCartItems = (
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
  ) => {
    setCartQty((cartQty) => cartQty + 1);
    const exists = cartItems.find(
      (item) => item.customId === id + selectedMeal + size,
    );

    if (!exists) {
      setCartItems((cartItems) => [
        ...cartItems,
        {
          id: id,
          customId: id + selectedMeal + size,
          name: name,
          image: image,
          is_veg: is_veg,
          description: description,
          notes: notes,
          size: size,
          price: price,
          selectedMeal: selectedMeal,
          selectedSubscription: selectedSubscription,
          quantity: 1,
        },
      ]);
    } else {
      const existingCart = [...cartItems];
      const currIndex = existingCart.indexOf(exists);
      existingCart[currIndex].quantity++;
      setCartItems(existingCart);
    }
  };

  const removeCartItems = (id, selectedMeal, size) => {
    const found = cartItems.find(
      (item) => item.customId === id + selectedMeal + size,
    );
    const itemQty = found.quantity;

    if (itemQty > 1) {
      const existingCart = [...cartItems];
      const currIndex = existingCart.indexOf(found);
      existingCart[currIndex].quantity--;
      setCartItems(existingCart);
    } else {
      const existingCart = [...cartItems];
      const currIndex = existingCart.indexOf(found);
      existingCart.splice(currIndex, 1);
      setCartItems(existingCart);
    }
    setCartQty((cartQty) => cartQty - 1);
  };

  const checkTotalPrice = () => {
    let price = 0;
    let qty = 0;
    let cost = 0;
    // if (cartItems.length > 0) {
    for (var i = 0; i < cartItems.length; i++) {
      price = cartItems[i].price;
      qty = cartItems[i].quantity;
      cost += price * qty;
      setTotalPrice(cost);
    }
    // }
  };

  const emptyCart = () => {
    setCartItems([]);
    setCartQty(0);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQty,
        addSubscription,
        removeSubscription,
        addCartItems,
        removeCartItems,
        setCartItems,
        setTotalPrice,
        totalPrice,
        emptyCart,
      }}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
