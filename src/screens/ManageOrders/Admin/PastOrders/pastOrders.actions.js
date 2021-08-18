import {apiCall} from 'constants/axiosCalls';

export const getPastOrders = (params) => {
  params.setIsLoading(true);
  if (params.accessToken) {
    apiCall(
      {
        method: 'GET',
        url: 'getPastOrders',
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res Orders', res.data);
          params.organiseData(res.data);
          params.setIsLoading(false);
        } else {
          params.setIsLoading(false);
          // console.log('err Orders', err);
        }
      },
    );
  }
};

export const handleData = (data, params) => {
  let orderArr = [];
  data.map((item) => {
    item.order_items.map((orderItem) => {
      let exists = orderArr.find((e) => e.orderId == item.id);
      if (!exists) {
        orderArr.push({
          orderId: item.id,
          totalPrice: item.total_price,
          orderDate: item.created_at,
          orderStatus: item.order_status,
          orderStatusCode: item.order_status_code,
          address: item.address,
          payment: item.payment,
          customer: item.user.name,
          phoneNo: item.user.phone_no,
          email: item.user.email,
          orderSubscriptionStatus: item.order_subscription_status.length
            ? item.order_subscription_status
            : null,
          orderItems: [
            {
              orderItemId: orderItem.id,
              productName: orderItem.product_name,
              quantity: orderItem.quantity,
              price: orderItem.price,
              is_veg: orderItem.is_veg,
              size: orderItem.size,
              note: orderItem.note,
              mealType: orderItem.meal_type,
              subscriptionDuration: orderItem.subscription_duration,
              numPersons: orderItem.num_persons,
              startDate: orderItem.start_date,
              endDate: orderItem.end_date,
              subscriptionMenu: orderItem.subscription_menu,
            },
          ],
        });
      } else {
        let currIndex = orderArr.indexOf(exists);
        orderArr[currIndex].orderItems.push({
          orderItemId: orderItem.id,
          productName: orderItem.product_name,
          quantity: orderItem.quantity,
          price: orderItem.price,
          is_veg: orderItem.is_veg,
          size: orderItem.size,
          note: orderItem.note,
          mealType: orderItem.meal_type,
          subscriptionDuration: orderItem.subscription_duration,
          numPersons: orderItem.num_persons,
          startDate: orderItem.start_date,
          endDate: orderItem.end_date,
          subscriptionMenu: orderItem.subscription_menu,
        });
      }
    });
  });
  params.setOrders(orderArr);
};
