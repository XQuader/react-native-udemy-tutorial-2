import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_SUCCESS
} from './types';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
  } else {
    //login and set token
    // AsyncStorage.setItem('fb_token', token);
  }
};