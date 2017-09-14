import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'https://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let token = await AsyncStorage.getItem('pushToken');
  console.log(token);

  if (!token) {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status === 'granted') {
      token = await Notifications.getExpoPushTokenAsync();
      await axios.post(PUSH_ENDPOINT, { token: { token } });
      await AsyncStorage.setItem('pushToken', token);
    }
  }
}