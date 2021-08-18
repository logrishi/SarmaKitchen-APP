import {FlatList, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDates, getSubscriptions} from './subscriptionProducts.actions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyButton from 'components/MyButton';
import {calcHeight} from 'constants/deviceConfig';
import styles from './subscriptionProducts.styles';

const SubscriptionProducts = ({
  products,
  selectedMeal,
  selectedSubscription,
  navigation,
}) => {
  const [mealBoxes, setMealBoxes] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    getSubscriptions({selectedSubscription, setMealBoxes});
    getDates({selectedSubscription, setStartDate, setEndDate});
  }, []);

  const showImage = (id) => {
    return (
      <View style={styles.imageContainer}>
        {id == 'mixed' ? (
          <Image
            source={require('assets/images/mixed.jpg')}
            style={styles.image}
          />
        ) : id == 'veg' ? (
          <Image
            source={require('assets/images/vegOnly.jpg')}
            style={styles.image}
          />
        ) : id == 'nonVeg' ? (
          <Image
            source={require('assets/images/nonVegOnly.jpg')}
            style={styles.image}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={mealBoxes}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.cardView}>
            {showImage(item.id)}
            <View style={styles.mealBoxView}>
              <FontAwesome5
                name="dot-circle"
                color={
                  item.id == 'veg'
                    ? 'green'
                    : item.id == 'nonVeg'
                    ? 'red'
                    : item.id == 'mixed'
                    ? 'red'
                    : null
                }
                style={styles.isVegIcon}
                size={calcHeight(1.5)}
              />

              <Text style={styles.mealBoxText}>{item.name}</Text>
            </View>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>₹ {item.price}</Text>
            </View>
            <MyButton
              title="View Menu"
              style={styles.btn}
              onPress={() =>
                navigation.navigate('SubscriptionDetails', {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  products: products,
                  startDate: startDate,
                  endDate: endDate,
                  selectedSubscription: selectedSubscription,
                  selectedMeal: selectedMeal,
                })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.name.toString()}
      />
    </View>
  );
};

export default SubscriptionProducts;
