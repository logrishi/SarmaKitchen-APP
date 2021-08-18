import {apiCall} from 'constants/axiosCalls';
import {storeData} from 'constants/asyncStorage';

export const getAddress = (params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'GET',
        url: 'address',
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res address', res.data);
          params.setAddress(res.data.address);
          params.setPhone(res.data.phone[0].phone_no);
          params.setIsLoading(false);
        } else {
          params.setIsLoading(false);
          // console.log('err', err);
        }
      },
    );
  }
};

export const removeAddress = (id, params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'DELETE',
        url: `address/${id}`,
        data: null,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res dlte', res.data);
          let filteredAddress = params.address.filter((e) => e.id != id);
          const exists = params.checked.find((e) => e.id == id);
          if (exists) {
            params.setChecked([]);
          }
          params.setAddress(filteredAddress);
          params.setIsLoading(false);
        } else {
          // console.log('err dlte', err);
          //  {
          //    e.response.data.tokenError
          //      ? showLogin(navigation, setLogOutData)
          //      : null;
          //  }
          params.setIsLoading(false);
        }
      },
    );
  }
};
