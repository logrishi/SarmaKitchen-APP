// import {StyleSheet, Text, View} from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import React from 'react';
// import styles from '../../orders.styles';

// const OrderStatusIcons = (orderStatus, item, showOTP) => {
//   return (
//     <View style={styles.statusIconContainer}>
//       {orderStatus == 'Processing' ? (
//         <MaterialCommunityIcons
//           name="circle-slice-3"
//           color="red"
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : orderStatus == 'Accepted' ? (
//         <MaterialCommunityIcons
//           name="circle-slice-4"
//           color={Colors.activeColorAccepted}
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : orderStatus == 'Out For Delivery' ? (
//         <MaterialCommunityIcons
//           name="circle-slice-5"
//           color={Colors.activeColorOutForDelivery}
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : orderStatus == 'Delivered' ? (
//         <Feather
//           name="check-circle"
//           color={Colors.richDarkCyan}
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : orderStatus == 'Cancelled' ? (
//         <MaterialCommunityIcons
//           name="cancel"
//           color={Colors.primary}
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : orderStatus == 'Ongoing' ? (
//         <MaterialCommunityIcons
//           name="clock-start"
//           color="blue"
//           size={calcWidth(6)}
//           style={styles.statusIcon}
//         />
//       ) : null}
//       <Text style={styles.statusText}>{orderStatus}</Text>
//       {showOTP(orderStatus, item)}
//       {/* {orderStatus == 'Delivered' ? (
//           <View style={styles.btnContainer}>
//             <MyButton
//               title="Re-order"
//               style={{
//                 color: 'blue',
//                 width: calcWidth(15),
//                 // height: calcHeight(2),
//                 fontSize:
//                   screenWidth > 700
//                     ? calcWidth(2.5)
//                     : screenWidth > 500
//                     ? calcWidth(2.5)
//                     : calcWidth(2.5),
//               }}
//             />
//           </View>
//         ) : null} */}
//     </View>
//   );
// };

// export default OrderStatusIcons;

// // const styles = StyleSheet.create({});
