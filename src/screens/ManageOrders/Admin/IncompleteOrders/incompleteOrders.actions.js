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
          params.setToday(res.data);
        } else {
          // console.log('err getToday', err);
        }
      },
    );
  }
};

export const getCourier = async (params) => {
  if (params.accessToken) {
    apiCall(
      {
        method: 'GET',
        url: 'getCourier',
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('resCourier', res.data);
          params.setCourier(res.data);
        } else {
          // console.log('err Courier', err);
        }
      },
    );
  }
};

export const getOrders = (params) => {
  params.setIsLoading(true);
  if (params.accessToken) {
    apiCall(
      {
        method: 'GET',
        url: 'manageOrders',
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
  let statusArr = [];
  data.forEach((item) => {
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
        let status = statusArr.find((el) => el.id == item.id);
        if (!status) {
          statusArr.push({
            id: item.id,
            // label: item.order_status,
            value: item.order_status_code,
          });
        }
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
  if (params.isUpdatedOrders !== undefined) {
    params.setUpdatedOrders(orderArr);
  } else {
    params.setOrders(orderArr);
  }
  params.setStatusCheck(statusArr);
};

export const updateOrderStatus = (id, value, label, params) => {
  if (params.accessToken) {
    apiCall(
      {
        method: 'POST',
        url: 'updateOrderStatus',
        data: {
          order_id: id,
          order_status: label,
          order_status_code: value,
        },
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          const exists = params.statusCheck.find((e) => e.id == id);
          if (exists) {
            const arr = [...params.statusCheck];
            const currIndex = arr.indexOf(exists);
            arr[currIndex].value = value;
            params.setStatusCheck(arr);
          }
        } else {
          // console.log('err updateOrderStatus', err);
        }
      },
    );
  }
};
