import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const GoogleLogin = () => {
  const [googleUser, setGoogleUser] = useState(null);

  GoogleSignin.configure();
  GoogleSignin.configure({
    scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '456802105954-se8vscav7iaev00kms7k5d2npg7idvde.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER

    // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    androidClientId:
      '456802105954-75639vo4vnltc6iqmdttvg1nkrd7og3p.apps.googleusercontent.com',
  });

  const signIn = async () => {
    console.log('func');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleUser(userInfo);
      console.log('try', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('e1', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('e2', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('e3', error);
      } else {
        // some other error happened
        console.log('else', error);
      }
    }
  };
  console.log('g', googleUser);

  return (
    <GoogleSigninButton
      style={{width: 192, height: 55}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
      // disabled={this.state.isSigninInProgress}
    />
  );
};

export default GoogleLogin;
