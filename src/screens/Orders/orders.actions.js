import {apiCall} from 'constants/axiosCalls';

export const getToday = async (params) => {
  if (params.accessToken) {
    apiCall(
      {
        method: 'GET',
        url: 'getToday',
        data: null,
        accessToken: params.accessToken,
        cancelToken: params.cancelToken,
      },
      (res, err) => {
        if (!err) {
          params.setToday(res.data);
        } else {
          // console.log(err);
        }
      },
    );
  }
};

export const getOrders = (params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'GET',
        url: 'orders',
        data: null,
        // params: {setIsLoading},
        accessToken: params.accessToken,
        cancelToken: params.cancelToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res Orders', res.data);
          params.organiseData(res.data);
          params.setIsLoading(false);
        } else {
          params.setIsLoading(false);
          console.log('err Orders', err);
        }
      },
    );
  }
};

export const getRating = async (params) => {
  if (params.ratedOrderItemId) {
    apiCall(
      {
        method: 'GET',
        url: `getRating/?ratedOrderItemId=${params.ratedOrderItemId}`,
        data: null,
        params: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          for (var i in params.orders) {
            let existingRating = [...params.initialRating];
            let currIndex = existingRating.findIndex(
              (e) => e.orderItemId == params.ratedOrderItemId,
            );
            existingRating[currIndex].rating = res.data[0].rating;
            params.setInitialRating(existingRating);
          }
        } else {
          // console.log(err);
        }
      },
    );
  }
};

export const handleRating = async (rating, params) => {
  apiCall(
    {
      method: 'POST',
      url: 'saveRating',
      data: {rating: rating, orderItemId: params.orderItemId},
      params: null,
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        // console.log('hndleRtng', res);
        params.setRatedOrderItemId(params.orderItemId);
      } else {
        // console.log(err);
      }
    },
  );
};

export const handleData = (data, params) => {
  let orderArr = [];
  let ratingArr = [];

  data.forEach((item) => {
    item.order_items.forEach((orderItem) => {
      let exists = orderArr.find((e) => e.orderId == item.id);
      if (!exists) {
        orderArr.push({
          orderId: item.id,
          orderDate: item.created_at,
          address: item.address,
          orderStatus: item.order_status,
          payment: item.payment,
          totalPrice: item.total_price,
          otp: item.otp,
          orderSubscriptionStatus: item.order_subscription_status.length
            ? item.order_subscription_status
            : null,
          orderItems: [
            {
              orderItemId: orderItem.id,
              productId: orderItem.product_id,
              productName: orderItem.product_name,
              note: orderItem.note,
              size: orderItem.size,
              quantity: orderItem.quantity,
              price: orderItem.price,
              is_veg: orderItem.is_veg,
              // rating: orderItem.rating,
              // rating: handleInitialRating(orderItem.rating, orderItem.id),
              // rating: ratingArr.push({
              //   orderItemId: orderItem.id,
              //   rating: orderItem.rating,
              // }),
              mealType: orderItem.meal_type,
              subscriptionDuration: orderItem.subscription_duration,
              numPersons: orderItem.num_persons,
              startDate: orderItem.start_date,
              endDate: orderItem.end_date,
              subscriptionMenu: orderItem.subscription_menu,
            },
          ],
        });
        ratingArr.push({
          orderItemId: orderItem.id,
          rating: orderItem.rating,
        });
      } else {
        let currIndex = orderArr.indexOf(exists);
        orderArr[currIndex].orderItems.push({
          orderItemId: orderItem.id,
          productId: orderItem.product_id,
          productName: orderItem.product_name,
          note: orderItem.note,
          size: orderItem.size,
          quantity: orderItem.quantity,
          price: orderItem.price,
          is_veg: orderItem.is_veg,
          // rating: orderItem.rating,
          // rating: handleInitialRating(orderItem.rating, orderItem.id),
          // rating: ratingArr.push({
          //   orderItemId: orderItem.id,
          //   rating: orderItem.rating,
          // }),
          mealType: orderItem.meal_type,
          subscriptionDuration: orderItem.subscription_duration,
          numPersons: orderItem.num_persons,
          startDate: orderItem.start_date,
          endDate: orderItem.end_date,
          subscriptionMenu: orderItem.subscription_menu,
        });
        ratingArr.push({
          orderItemId: orderItem.id,
          rating: orderItem.rating,
        });
      }
    });
  });
  params.setOrders(orderArr);
  params.setInitialRating(ratingArr);
};
