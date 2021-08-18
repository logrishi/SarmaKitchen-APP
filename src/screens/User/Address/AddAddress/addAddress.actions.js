import {apiCall} from 'constants/axiosCalls';

export const saveAddress = (postData, params) => {
  if (params.accessToken) {
    params.setIsLoading(true);
    apiCall(
      {
        method: 'POST',
        url: 'address',
        data: postData,
        accessToken: params.accessToken,
      },
      (res, err) => {
        if (!err) {
          // console.log('res', res.data);
          params.navigation.navigate('Payment', {
            phone_no: postData.phone_no,
            address_id: res.data.address_id,
            address: res.data.address,
          });
        } else {
          params.setIsLoading(false);
          // errorToast('Area not deliverable. We are expanding soon...', 0.8);
          // console.log('err', err);
        }
      },
    );
  }
};

// export const removeAddress = (id, params) => {
//   if (params.accessToken) {
//     params.setIsLoading(true);
//     apiCall(
//       {
//         method: 'DELETE',
//         url: `address/${id}`,
//         data: null,
//         accessToken: params.accessToken,
//       },
//       (res, err) => {
//         if (!err) {
//           // console.log('res', res.data);
//           let filteredAddress = params.address.filter((e) => e.id != id);
//           const exists = params.checked.find((e) => e.id == id);
//           if (exists) {
//             params.setChecked([]);
//           }
//           params.setAddress(filteredAddress);
//           params.setIsLoading(false);
//         } else {
//           // console.log('err', err);
//           //  {
//           //    e.response.data.tokenError
//           //      ? showLogin(navigation, setLogOutData)
//           //      : null;
//           //  }
//           params.setIsLoading(false);
//         }
//       },
//     );
//   }
// };
