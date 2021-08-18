import axios from 'axios';
import {getData} from './AsyncStorage';
import promise from 'promise';

const APP_ENVIRONMENT = 'local';

var axiosBaseUrl, appOrigin;

if (APP_ENVIRONMENT === 'local') {
  appOrigin = 'http://192.168.1.102:80/';
  axiosBaseUrl = 'sarmaKitchenJSON/public/api';
  // axiosBaseUrl = 'http://192.168.1.100:9090';
  // axiosBaseUrl = 'http://48a5ee48d703.ngrok.io/';
  // axiosBaseUrl = 'https://tt-doctor.loca.lt/';
} else {
  appOrigin = 'http://159.203.115.251';
  axiosBaseUrl = 'http://159.203.115.251:8080';
}

let axiosInstance = axios.create({
  baseURL: axiosBaseUrl,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    //If the header does not contain the token and the url not public, redirect to login
    var accessToken;
    if (config.url !== '/oauth/token') {
      // console.log('request interceptor before', config);
      await getData('token', (res) => {
        if (res) {
          // console.log('request interceptor res', res);
          accessToken = JSON.parse(res).access_token;
        }
      });
      // console.log('request interceptor after', accessToken);
      //if token is found add it to the header
      if (accessToken) {
        if (config.method !== 'OPTIONS') {
          // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }
    // console.log('After set', config);
    return config;
  },
  function (error) {
    // Do something with request error
    return promise.reject(error);
  },
);
class ApiCall {
  invokeApi = (request, callback) => {
    // console.log('Invoking API ', url);

    let config = {
      method: request.method,
      url: request.url,
    };
    if (request.headers !== undefined) {
      request.headers.Origin = appOrigin;
      config.headers = request.headers;
    } else {
      config.headers = {
        'Content-Type': 'application/json',
      };
    }
    if (request.data !== undefined) {
      config.data = request.data;
    }
    if (request.params !== undefined) {
      config.params = request.params;
    }

    if (request.responseType !== undefined) {
      config.responseType = request.responseType;
    }
    axiosInstance
      .request(config)
      .then((res) => {
        // console.log('Operation Successful ', request.url, res);
        callback(res.data, false);
      })
      .catch((err) => {
        console.log('Fetch Err ', err);
        if (err.response !== undefined) {
          callback(err.response.data, true);
        } else {
          callback(undefined, true);
        }
      });
  };
}
const app = new ApiCall();
export default app;
