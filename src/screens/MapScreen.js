import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { fetchJobs } from '../actions'

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  handleRegionChange = region => {
    this.setState({ region });
  };

  handleSearchButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => this.props.navigation.navigate('deck'));
  };

  render() {
    if (!this.state.mapLoaded) {
      return <ActivityIndicator size={80} style={styles.spinner}/>
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.handleRegionChange}
        />
        <Button
          title='Search This Area'
          onPress={this.handleSearchButtonPress}
          containerViewStyle={styles.buttonContainer}
          buttonStyle={{ flex: 1 }}
          backgroundColor='#009688'
          icon={{ name: 'search' }}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row'
  }
};

const reduxed = connect(null, { fetchJobs })(MapScreen);
export { reduxed as MapScreen };