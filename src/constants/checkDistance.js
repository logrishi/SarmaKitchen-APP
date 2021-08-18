//geo lib for distance calculation -

import {errorToast} from 'constants/toasts';
import getPreciseDistance from 'geolib/es/getDistance';

//toast

const getDistance = (baseCoords, maxDist, userCoords, msg, duration) => {
  // if (baseCoords !== undefined && maxDist !== undefined) {
  let distance = getPreciseDistance(baseCoords, userCoords);

  if (distance > maxDist) {
    const msgDefault = 'Area not deliverable. We are expanding soon...';
    if (msg == 'hideToast') {
      return;
    } else {
      errorToast(msg ? msg : msgDefault, duration ? duration : 1);
    }
  } else {
    return true;
  }
  // }
};

export {getDistance};
