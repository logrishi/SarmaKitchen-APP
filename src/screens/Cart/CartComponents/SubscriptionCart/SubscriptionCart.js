import {Image, Text, TouchableOpacity, View} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {calcHeight} from 'constants/deviceConfig';
import styles from './subscriptionCart.styles';

const SubscriptionCart = ({item, removeSubscription}) => {
  return (
    <View style={styles.cardView}>
      <View>
        <View style={styles.imageContainer}>
          {item.id == 'mixed' ? (
            <Image
              source={require('assets/images/mixed.jpg')}
              style={styles.image}
            />
          ) : item.id == 'veg' ? (
            <Image
              source={require('assets/images/vegOnly.jpg')}
              style={styles.image}
            />
          ) : item.id == 'nonVeg' ? (
            <Image
              source={require('assets/images/nonVegOnly.jpg')}
              style={styles.image}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.titleContainer}>
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
            style={styles.icon}
            size={calcHeight(1.5)}
          />
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
        <Text style={styles.titleText}>
          ({item.selectedSubscription} Days {item.selectedMeal} Subscription)
        </Text>
        {/* <View style={{marginVertical: calcHeight(1)}}>
          <Text style={styles.detailsText}>Tiffin Start Date:</Text>
          <Text style={styles.detailsText}>{item.startDate}</Text>
          <Text style={styles.detailsText}>Tiffin End Date: </Text>
          <Text style={styles.detailsText}>{item.endDate}</Text>
          <Text style={styles.detailsText}>
            Deliver for: {item.quantity} persons
          </Text>
        </View> */}
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>₹ {item.price}</Text>
        <TouchableOpacity
          style={styles.delete}
          onPress={() =>
            removeSubscription(
              item.id,
              item.selectedMeal,
              item.selectedSubscription,
            )
          }>
          <MaterialCommunityIcons
            name="delete-empty"
            color="red"
            size={calcHeight(3)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionCart;
