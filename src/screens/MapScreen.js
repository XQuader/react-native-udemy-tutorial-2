import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MapView } from 'expo';

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

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
        const { region } = this.state;
        const { latitude, longitude } = position.coords;
        const newRegion = { ...region, latitude, longitude };

        this.setState({ mapLoaded: true, region: newRegion });
      }, error => this.setState({ mapLoaded: true }), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  handleRegionChange = region => {
    this.setState({ region });
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
  }
};

export { MapScreen };