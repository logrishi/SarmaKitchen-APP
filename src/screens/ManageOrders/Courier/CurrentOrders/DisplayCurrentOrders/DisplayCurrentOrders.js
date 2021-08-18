import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';

import Colors from 'constants/colors';
import DeliveryOTP from '../DeliveryOTP';
import {showSwing} from 'constants/loading';
import styles from './displayCurrentOrders.styles';

const DisplayCurrentOrders = ({orders, today}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscriptionItems = (item) => {
    let dishDelivered = null;
    for (var i in item.orderSubscriptionStatus) {
      let deliveryDate = item.orderSubscriptionStatus[i].delivery_date;
      deliveryDate = new Date(deliveryDate);
      deliveryDate =
        deliveryDate.getDate() +
        '-' +
        (deliveryDate.getMonth() + 1) +
        '-' +
        deliveryDate.getFullYear();

      if (today == deliveryDate) {
        dishDelivered = item.orderSubscriptionStatus[i].product_delivered;
      }
    }
    return (
      <View style={styles.productView}>
        {/* <Text style={styles.productText}>
          {e.subscriptionDuration} days {e.mealType} Subscription
        </Text> */}
        <Text style={styles.productText}>{dishDelivered}</Text>
      </View>
    );
  };

  const handleQuantities = (item) => {
    let totalDishes = item.orderItems.length;
    let totalItems = 0;
    let subscriptionDuration = 0;

    for (var i in item.orderItems) {
      totalItems += item.orderItems[i].quantity;
      subscriptionDuration = item.orderItems[i].subscriptionDuration;
    }
    if (subscriptionDuration == 1) {
      return (
        <View style={styles.mealTypeView}>
          <Text style={styles.itemHeadingText}>
            Total Dishes - {totalDishes}
          </Text>
          <Text style={styles.itemHeadingText}>
            Total Item Quantity - {totalItems}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : !orders.length ? (
        <View>
          <Text>No orders</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.orderNoContainer}>
                <Text style={styles.orderIdText}>Order No: {item.orderId}</Text>
              </View>
              <View style={styles.orderDateView}>
                <Text style={styles.orderDateText}>
                  Order Date: {item.orderDate}
                </Text>
              </View>
              {item.orderItems.map((e, index) =>
                e.mealType == 'Lunch' && index == 0 ? (
                  <View style={styles.mealTypeView} key={e.mealType}>
                    <Text style={styles.itemHeadingText}>
                      Meal Type - Lunch
                    </Text>
                  </View>
                ) : e.mealType == 'Dinner' && index == 0 ? (
                  <View style={styles.mealTypeView} key={e.mealType}>
                    <Text style={styles.itemHeadingText}>
                      Meal Type - Dinner
                    </Text>
                  </View>
                ) : null,
              )}
              <View style={styles.itemHeading}>
                <Text style={styles.itemHeadingText}>Item</Text>
                <Text style={styles.itemHeadingText}>Quantity</Text>
              </View>
              {item.orderItems.map((e, index) => (
                <View
                  key={e.orderItemId}
                  style={[
                    styles.items,
                    {
                      backgroundColor:
                        index % 2 == 0
                          ? Colors.extremeLightGrayish
                          : Colors.lightGrayish,
                    },
                  ]}>
                  {e.subscriptionDuration == 1 ? (
                    <View style={styles.productView}>
                      <Text style={styles.productText}>
                        {e.productName}
                        {e.size ? ` (${e.size})` : null}
                        {e.note ? ` - (${e.note})` : null}
                      </Text>
                    </View>
                  ) : (
                    // <View style={styles.productView}>
                    //   <Text style={styles.productText}>
                    //     {e.subscriptionDuration} days {e.mealType} Subscription
                    //   </Text>
                    // </View>
                    handleSubscriptionItems(item)
                  )}
                  {e.subscriptionDuration == 1 ? (
                    <Text style={styles.quantityText}>{e.quantity}</Text>
                  ) : (
                    <Text style={styles.quantityText}>{e.numPersons}</Text>
                  )}
                </View>
              ))}

              {handleQuantities(item)}

              <View style={styles.customerView}>
                {/* <Text style={styles.customerText}>
                Order Total : ₹ {item.totalPrice}
              </Text> */}
                <Text style={styles.customerText}>
                  Customer Name : {item.customer}
                </Text>
                <Text style={styles.customerText}>Phone : {item.phoneNo}</Text>
                <Text style={styles.customerText}>
                  Address : {item.address}
                </Text>
              </View>

              <DeliveryOTP item={item} today={today} />
            </View>
          )}
          keyExtractor={(item) => item.orderId.toString()}
        />
      )}
    </View>
  );
};

export default DisplayCurrentOrders;
