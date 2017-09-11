import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { isReady: false };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('fb_token');

    this.setState({ isReady: true });

    if (token) {
      this.props.navigation.navigate('map');
    }
  }

  handleSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator size={80} style={styles.spinner} />
    }

    return (
      <Slides
        data={SLIDE_DATA}
        onSlidesComplete={this.handleSlidesComplete}
      />
    );
  }
}

const styles = {
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export { WelcomeScreen };