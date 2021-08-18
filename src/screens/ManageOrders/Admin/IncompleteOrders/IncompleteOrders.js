import {FlatList, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  getCourier,
  getOrders,
  getToday,
  handleData,
  updateOrderStatus,
} from './incompleteOrders.actions';

import Colors from 'constants/colors';
import MenuModal from 'screens/Orders/OrderComponents/MenuModal';
import NewOrderIcon from 'components/NewOrderIcon';
import OrderSwitchSelector from './OrderSwitchSelector';
import ScheduleModal from 'screens/Orders/OrderComponents/ScheduleModal';
import UpdateDeliveryModal from './UpdateDeliveryModal';
import {UserContext} from 'context/UserContext';
import {isLoggedIn} from 'constants/handleErrors';
import {showSwing} from 'constants/loading';
import styles from './incompleteOrders.styles';

const IncompleteOrders = ({navigation}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [updatedOrders, setUpdatedOrders] = useState([]);
  const [today, setToday] = useState();
  const [courier, setCourier] = useState([]);
  const [statusCheck, setStatusCheck] = useState({});
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getToday({setToday});
    getCourier({accessToken, setCourier});
    getOrders({accessToken, setIsLoading, organiseData});
    navigation.addListener('focus', () => {
      getToday({accessToken, setToday});
      getCourier({accessToken, setCourier});
      getOrders({accessToken, setIsLoading, organiseData});
    });
    // setInterval(() => {
    //   getOrders();
    // }, 5000);
  }, []);

  useEffect(() => {
    showIcon();
  }, [statusCheck]);

  useEffect(() => {
    if (updatedOrders.length) {
      setOrders(updatedOrders);
    }
  }, [updatedOrders]);

  const organiseData = (data, isUpdatedOrders) => {
    handleData(data, {
      setOrders,
      setStatusCheck,
      setUpdatedOrders,
      isUpdatedOrders,
    });
  };

  const showIcon = (id) => {
    return <NewOrderIcon data={statusCheck} id={id} />;
  };

  const handleChange = async (id, value, label, initialStatusCode) => {
    updateOrderStatus(id, value, label, {
      statusCheck,
      setStatusCheck,
      accessToken,
    });
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

  const handleDates = (item) => {
    let subscriptionDuration = 0;
    let startDate = null;
    let endDate = null;
    let orderId = item.orderId;
    let menu = [];

    for (var i in item.orderItems) {
      subscriptionDuration = item.orderItems[i].subscriptionDuration;
      startDate = item.orderItems[i].startDate;
      endDate = item.orderItems[i].endDate;
      menu.push(item.orderItems[i].subscriptionMenu);
    }

    return (
      <View style={styles.dateView}>
        <UpdateDeliveryModal
          today={today}
          orderId={orderId}
          menu={menu[0]}
          schedule={item.orderSubscriptionStatus}
          courier={courier}
          organiseData={organiseData}
          deliveredBy={item.deliveredBy}
          subscriptionDuration={subscriptionDuration}
        />
      </View>
    );
  };

  const handleSubscriptionDetails = (item) => {
    let subscriptionDuration = 0;
    let menu = [];
    for (var i in item.orderItems) {
      subscriptionDuration = item.orderItems[i].subscriptionDuration;
      menu.push(item.orderItems[i].subscriptionMenu);
    }
    if (subscriptionDuration > 1) {
      return (
        <View style={styles.subscriptionModalView}>
          <MenuModal menu={menu[0]} />
          <ScheduleModal schedule={item.orderSubscriptionStatus} />
        </View>
      );
    }
  };

  const handleSwitchSelector = (item) => {
    let subscriptionDuration = 0;
    for (var i in item.orderItems) {
      subscriptionDuration = item.orderItems[i].subscriptionDuration;
    }
    return (
      <OrderSwitchSelector
        item={item}
        handleChange={handleChange}
        subscriptionDuration={subscriptionDuration}
      />
    );
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : orders.length ? (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <View style={styles.card}>
              <View style={styles.orderNoContainer}>
                <Text style={styles.orderIdText}>Order No: {item.orderId}</Text>
                {showIcon(item.orderId)}
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
                    <View style={styles.productView}>
                      <Text style={styles.productText}>
                        {e.subscriptionDuration} days {e.mealType} Subscription
                      </Text>
                    </View>
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
                <Text style={styles.customerText}>
                  Order Total : ₹ {item.totalPrice}
                </Text>
                <Text style={styles.customerText}>
                  Customer Name : {item.customer}
                </Text>
                <Text style={styles.customerText}>Phone : {item.phoneNo}</Text>
                <Text style={styles.customerText}>
                  Address : {item.address}
                </Text>
              </View>

              {handleDates(item)}

              {handleSubscriptionDetails(item)}

              {handleSwitchSelector(item)}
            </View>
          )}
          keyExtractor={(item) => item.orderId.toString()}
        />
      ) : (
        <Text>No Orders</Text>
      )}
      {/* {orders.length > 0 && statusCheck.length > 0 ? ( */}
    </View>
  );
};

export default IncompleteOrders;
