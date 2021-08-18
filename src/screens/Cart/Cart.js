import {FlatList, Image, Text, View} from 'react-native';
import React, {useContext} from 'react';

import {CartContext} from 'context/CartContext';
import MyButton from 'components/MyButton';
import SingleOrderCart from './CartComponents/SingleOrderCart';
import SubscriptionCart from './CartComponents/SubscriptionCart';
import {UserContext} from 'context/UserContext';
import {isLoggedIn} from 'constants/handleErrors';
import styles from './cart.styles';

const Cart = ({navigation}) => {
  const {cartItems, cartQty, totalPrice, removeSubscription} = useContext(
    CartContext,
  );
  const {storedUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);

  return (
    <View style={styles.screen}>
      {cartItems.length == 0 ? (
        <Image
          source={require('assets/images/emptyCart.png')}
          style={styles.emptyCartImage}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.billView}>
            <View>
              <Text style={styles.billText}>Total Cart Items : {cartQty}</Text>
              <Text style={styles.billText}>Order Total : ₹ {totalPrice}</Text>
            </View>
            {accessToken ? (
              <MyButton
                title="Select Address"
                onPress={() => navigation.navigate('SelectAddress')}
                style={styles.btn}
              />
            ) : (
              <MyButton
                title="Login to Continue"
                onPress={() => navigation.navigate('Account')}
              />
            )}
          </View>
          <FlatList
            data={cartItems}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item.selectedSubscription == 1 ? (
                  <SingleOrderCart item={item} />
                ) : (
                  <SubscriptionCart
                    item={item}
                    removeSubscription={removeSubscription}
                  />
                )}
              </View>
            )}
            keyExtractor={(item) => item.customId.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default Cart;
