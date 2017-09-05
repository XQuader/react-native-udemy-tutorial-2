import React from 'react';
import { View } from 'react-native';
import SignUp from './src/components/SignUp';
import SignIn from './src/components/SignIn';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 25 }}>
        <SignUp/>
      </View>
    );
  }
}