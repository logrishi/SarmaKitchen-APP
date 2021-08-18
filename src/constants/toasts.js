//Toast
import {RNToasty} from 'react-native-toasty';

const normalToast = (msg, duration) => {
  RNToasty.Normal({
    title: msg,
    position: 'bottom',
    duration: duration,
  });
};

const infoToast = (msg, duration) => {
  RNToasty.Info({
    title: msg,
    position: 'bottom',
    duration: duration,
  });
};

const successToast = (msg, duration) => {
  RNToasty.Success({
    title: msg,
    position: 'bottom',
    duration: duration,
  });
};

const warnToast = (msg, duration) => {
  RNToasty.Warn({
    title: msg,
    position: 'bottom',
    duration: duration,
  });
};

const errorToast = (msg, duration) => {
  RNToasty.Error({
    title: msg,
    position: 'bottom',
    duration: duration,
  });
};

export {normalToast, infoToast, successToast, warnToast, errorToast};
// export { (normalToast, infoToast, successToast, warnToast, errorToast)};
