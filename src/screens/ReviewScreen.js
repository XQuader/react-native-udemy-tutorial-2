import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigate('settings')}
        backgroundColor='rgba(0, 0, 0, 0)'
        color='rgba(0, 122, 255, 1)'
      />
    )
  });

  render() {
    return (
      <View/>
    );
  }
}

export { ReviewScreen };