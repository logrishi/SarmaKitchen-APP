import {apiCall} from 'constants/axiosCalls';

export const getToday = async (params) => {
  if (params.accessToken) {
    apiCall(
      {
        method: 'GET',
        url: 'getToday',
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res getToday', res.data);
          params.setToday(res.data);
        } else {
          // console.log('err getToday', err);
        }
      },
    );
  }
};

export const getCourierOrders = (params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'GET',
        url: 'getOrdersByCourier',
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res', res.data);
          params.organiseData(res.data);
          params.setIsLoading(false);
        } else {
          params.setIsLoading(false);
          // console.log('err', err);
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
          deliveredBy: item.delivered_by,
          address: item.address,
          payment: item.payment,
          customer: item.user.name,
          phoneNo: item.user.phone_no,
          email: item.user.email,
          orderSubscriptionStatus: [
            {
              delivery_date: item.delivery_date,
              delivered_by: item.delivered_by,
              product_delivered: item.product_delivered,
            },
          ],
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
