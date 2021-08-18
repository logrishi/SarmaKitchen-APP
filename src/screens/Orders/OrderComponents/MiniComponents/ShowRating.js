// import {StyleSheet, Text, View} from 'react-native';

// import RateModal from '../RateModal';
// import React from 'react';

// const ShowRating = (
//   orderStatus,
//   orderItemId,
//   orders,
//   accessToken,
//   setRatedOrderItemId,
//   handleRating,
// ) => {
//   const displayRatings = () => {
//     // console.log('orders', orders);
//     // console.log('orderStatus', orderStatus);
//     // console.log('orderItemId', orderItemId);
//     // console.log('accessToken', accessToken);
//     // console.log('setRatedOrderItemId', setRatedOrderItemId);
//     // console.log('handleRating', handleRating);

//     if (orderStatus == 'Delivered') {
//       for (var i in orders) {
//         let filteredOrder = orders[i].orderItems.filter(
//           (e) => e.orderItemId == orderItemId,
//         );
//         let filteredRating = initialRating.filter(
//           (e) => e.orderItemId == orderItemId,
//         );
//         // console.log('filteredOrder', filteredOrder);
//         // console.log('filteredRate', filteredRating[0].rating);
//         if (filteredOrder.length) {
//           let rating = filteredRating[0].rating;
//           if (!rating) {
//             return (
//               <RateModal
//                 handleRating={handleRating}
//                 orderItemId={orderItemId}
//                 accessToken={accessToken}
//                 setRatedOrderItemId={setRatedOrderItemId}
//               />
//             );
//           } else {
//             return (
//               <View style={styles.rateView}>
//                 <Text style={styles.ratingText}>You rated this order: </Text>
//                 <Text style={styles.ratingValue}>{rating}</Text>
//               </View>
//             );
//           }
//         }
//       }
//     } else {
//       return null;
//     }
//   };
//   //   return <View style={{flex: 1}}>{handleRating()}</View>;
//   return displayRatings();
// };

// export default ShowRating;

// const styles = StyleSheet.create({});
