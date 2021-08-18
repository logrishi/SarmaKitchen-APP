import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import {
  getConfig,
  handleErrors,
  isLoggedIn,
  showReload,
} from 'constants/handleErrors';
import {
  getOrders,
  getRating,
  getToday,
  handleData,
  handleRating,
} from './orders.actions';

import Card from 'components/Card';
import Colors from 'constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuModal from './OrderComponents/MenuModal';
import RateModal from './OrderComponents/RateModal';
import ScheduleModal from './OrderComponents/ScheduleModal';
import ShowRating from './OrderComponents/MiniComponents/ShowRating';
import {UserContext} from 'context/UserContext';
import {showSwing} from 'constants/loading';
import {source} from 'constants/axiosCalls';
import styles from './orders.styles';

//custom hooks
// import useHandleErrors from 'hooks/useHandleErrors';

const Orders = ({navigation}) => {
  const {storedUserData, setLogOutData} = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [today, setToday] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ratedOrderItemId, setRatedOrderItemId] = useState();
  const [initialRating, setInitialRating] = useState({});
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    let cancelToken = source.token;
    getToday({accessToken, setToday});
    getOrders({setIsLoading, accessToken, organiseData});
    return navigation.addListener('focus', () => {
      getToday({accessToken, setToday});
      getOrders({setIsLoading, accessToken, organiseData});
    });
    return () => source.cancel('Operation canceled by the user.');
  }, [storedUserData]);

  useEffect(() => {
    getRating({
      ratedOrderItemId,
      accessToken,
      orders,
      initialRating,
      setInitialRating,
    });
  }, [ratedOrderItemId]);

  const organiseData = (data) => {
    handleData(data, {setOrders, setInitialRating});
  };

  const showOTP = (orderStatus, item) => {
    let subscriptionDuration = null;
    let otp = null;

    for (var i in item.orderItems) {
      subscriptionDuration = item.orderItems[i].subscriptionDuration;
    }
    if (subscriptionDuration > 1) {
      for (var i in item.orderSubscriptionStatus) {
        if (
          item.orderSubscriptionStatus[i].delivery_date == today &&
          item.orderSubscriptionStatus[i].order_status == 'Out For Delivery'
        ) {
          otp = item.orderSubscriptionStatus[i].otp;
          return orderStatus !== 'Delivered' ? (
            <View style={styles.otpView}>
              <Text style={styles.otpText}>OTP: {otp}</Text>
            </View>
          ) : null;
        }
      }
    } else {
      otp = item.otp;
      return orderStatus == 'Out For Delivery' ? (
        <View style={styles.otpView}>
          <Text style={styles.otpText}>OTP: {otp}</Text>
        </View>
      ) : null;
    }
  };

  const handleIcon = (orderStatus, item) => {
    return (
      <View style={styles.statusIconContainer}>
        {orderStatus == 'Processing' ? (
          <MaterialCommunityIcons
            name="circle-slice-3"
            color="red"
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : orderStatus == 'Accepted' ? (
          <MaterialCommunityIcons
            name="circle-slice-4"
            color={Colors.activeColorAccepted}
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : orderStatus == 'Out For Delivery' ? (
          <MaterialCommunityIcons
            name="circle-slice-5"
            color={Colors.activeColorOutForDelivery}
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : orderStatus == 'Delivered' ? (
          <Feather
            name="check-circle"
            color={Colors.richDarkCyan}
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : orderStatus == 'Cancelled' ? (
          <MaterialCommunityIcons
            name="cancel"
            color={Colors.primary}
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : orderStatus == 'Ongoing' ? (
          <MaterialCommunityIcons
            name="clock-start"
            color="blue"
            size={calcWidth(6)}
            style={styles.statusIcon}
          />
        ) : null}

        <Text style={styles.statusText}>{orderStatus}</Text>
        {showOTP(orderStatus, item)}

        {/* {orderStatus == 'Delivered' ? (
          <View style={styles.btnContainer}>
            <MyButton
              title="Re-order"
              style={{
                color: 'blue',
                width: calcWidth(15),
                // height: calcHeight(2),
                fontSize:
                  screenWidth > 700
                    ? calcWidth(2.5)
                    : screenWidth > 500
                    ? calcWidth(2.5)
                    : calcWidth(2.5),
              }}
            />
          </View>
        ) : null} */}
      </View>
    );
  };

  const showRating = (orderStatus, orderItemId) => {
    // return (
    //   <ShowRating
    //     orderStatus={orderStatus}
    //     orderItemId={orderItemId}
    //     orders={orders}
    //     accessToken={accessToken}
    //     setRatedOrderItemId={setRatedOrderItemId}
    //     handleRating={handleRating}
    //   />
    // );

    if (orderStatus == 'Delivered') {
      for (var i in orders) {
        let filteredOrder = orders[i].orderItems.filter(
          (e) => e.orderItemId == orderItemId,
        );
        let filteredRating = initialRating.filter(
          (e) => e.orderItemId == orderItemId,
        );
        // console.log('filteredOrder', filteredOrder);
        // console.log('filteredRate', filteredRating[0].rating);
        if (filteredOrder.length) {
          let rating = filteredRating[0].rating;
          if (!rating) {
            return (
              <RateModal
                handleRating={handleRating}
                orderItemId={orderItemId}
                accessToken={accessToken}
                setRatedOrderItemId={setRatedOrderItemId}
              />
            );
          } else {
            return (
              <View style={styles.rateView}>
                <Text style={styles.ratingText}>You rated this order: </Text>
                <Text style={styles.ratingValue}>{rating}</Text>
              </View>
            );
          }
        }
      }
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        showSwing
      ) : !accessToken ? (
        <View style={styles.pageHeadingContainer}>
          <Text style={styles.pageTitle}>Sign in to view your orders</Text>
        </View>
      ) : accessToken && !orders.length ? (
        <View style={styles.pageHeadingContainer}>
          <Text style={styles.pageTitle}>
            Hello {storedUserData.user.name} you have not shopped from us yet
          </Text>
        </View>
      ) : accessToken && orders.length ? (
        <View style={{flex: 1}}>
          <View style={styles.pageHeadingContainer}>
            <Text style={styles.pageTitle}>
              Hello {storedUserData.user.name} your orders
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orders}
              renderItem={({item}) => (
                <Card style={styles.card}>
                  <View style={styles.row}>
                    {handleIcon(item.orderStatus, item)}
                    {/* {showOTP(item)} */}
                    <View style={styles.cardItemsContainer}>
                      <View style={styles.cardItemsView}>
                        {item.orderItems.map((e) =>
                          e.subscriptionDuration == 1 ? (
                            <View style={styles.orderItems} key={e.orderItemId}>
                              <View>
                                <View style={styles.productNameView}>
                                  <View style={styles.productNameIconView}>
                                    {e.is_veg ? (
                                      <View style={styles.vegIcon}>
                                        <FontAwesome5
                                          name="dot-circle"
                                          color="green"
                                          size={calcHeight(1.5)}
                                        />
                                      </View>
                                    ) : (
                                      <View style={styles.vegIcon}>
                                        <FontAwesome5
                                          name="dot-circle"
                                          color="red"
                                          size={calcHeight(1.5)}
                                        />
                                      </View>
                                    )}
                                    <Text style={styles.productNameText}>
                                      {e.productName} x {e.quantity}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.orderDetailsView}>
                                <Text style={styles.orderDetailsText}>
                                  Ordered: {item.orderDate}
                                </Text>
                                <Text style={styles.orderDetailsText}>
                                  Paid: ₹ {item.totalPrice}
                                </Text>
                              </View>
                              {showRating(item.orderStatus, e.orderItemId)}
                            </View>
                          ) : (
                            <View style={styles.orderItems} key={e.orderItemId}>
                              <View style={styles.productNameView}>
                                <View style={styles.productNameIconView}>
                                  {e.productId == 'veg' ? (
                                    <View style={styles.vegIcon}>
                                      <FontAwesome5
                                        name="dot-circle"
                                        color="green"
                                        size={calcHeight(1.5)}
                                      />
                                    </View>
                                  ) : e.productId == 'nonVeg' ? (
                                    <View style={styles.vegIcon}>
                                      <FontAwesome5
                                        name="dot-circle"
                                        color="red"
                                        size={calcHeight(1.5)}
                                      />
                                    </View>
                                  ) : e.productId == 'mixed' ? (
                                    <View style={styles.vegIcon}>
                                      <FontAwesome5
                                        name="dot-circle"
                                        color="red"
                                        size={calcHeight(1.5)}
                                      />
                                    </View>
                                  ) : null}
                                  <Text style={styles.productNameText}>
                                    {e.productName}
                                  </Text>
                                </View>
                                <Text style={styles.productNameText}>
                                  ({e.subscriptionDuration} days {e.mealType}{' '}
                                  Subscription)
                                </Text>
                              </View>
                              <View style={styles.subsDetailsView}>
                                <Text style={styles.orderDetailsText}>
                                  Starts on: {e.startDate}
                                </Text>
                                <Text style={styles.orderDetailsText}>
                                  Ends on: {e.endDate}
                                </Text>
                              </View>
                              <MenuModal
                                menu={item.orderItems.flatMap(
                                  (e) => e.subscriptionMenu,
                                )}
                              />
                              <ScheduleModal
                                schedule={item.orderSubscriptionStatus}
                              />
                              <View style={styles.orderDetailsView}>
                                <Text style={styles.orderDetailsText}>
                                  Ordered: {item.orderDate}
                                </Text>
                                <Text style={styles.orderDetailsText}>
                                  Paid: ₹ {item.totalPrice}
                                </Text>
                              </View>

                              {showRating(item.orderStatus, e.orderItemId)}
                            </View>
                          ),
                        )}
                      </View>

                      <View style={styles.nextIcon}>
                        <TouchableOpacity>
                          <MaterialIcons
                            name="navigate-next"
                            color={Colors.richDarkCyan}
                            size={calcWidth(8)}
                            // onPress={() =>
                            //   navigation.navigate('OrderDetails', {
                            //     orderId: item.orderId,
                            //     products: item.products,
                            //   })
                            // }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card>
              )}
              keyExtractor={(item) => item.orderId.toString()}
            />
          </View>
        </View>
      ) : orders.error ? (
        showReload(getOrders)
      ) : null}
    </View>
  );
};

export default Orders;
