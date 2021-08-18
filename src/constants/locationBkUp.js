// import {useState, useEffect} from 'react';

// //geo lib for distance calculation - not reqd. for just getting location
// import getPreciseDistance from 'geolib/es/getDistance';

// //constants
// import {base_url} from 'constants/url';
// import {errorToast} from 'constants/toasts';

// //db
// import axios from 'axios';

// // const Location = () => {
// //   useEffect(() => {
// //     getStoreLocationInfo();
// //   }, []);

// let baseCoordinates = null;
// let maxDistance = null;

// const getStoreLocationInfo = async () => {
//   try {
//     console.log('location try');
//     const res = await axios.get(`${base_url}/getLocationInfo`);
//     // setBaseCoordinates(res.data.baseCoordinates);
//     // setMaxDistance(res.data.maxDistance);

//     baseCoordinates = res.data.baseCoordinates;
//     maxDistance = res.data.maxDistance;

//     return {baseCoordinates, maxDistance};
//   } catch (e) {
//     errorToast('Unable to get Location. Please check locaation settings.', 0.8);
//     // console.log(e);
//   }
// };

// export {getStoreLocationInfo};
