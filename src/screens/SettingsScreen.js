import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {
  static navigationOptions = () => ({
    title: 'Settings'
  });

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='Clear Liked Jobs'
          onPress={this.props.clearLikedJobs}
          icon={{ name: 'delete-forever' }}
          backgroundColor='#F44336'
          large
        />
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 10
  }
};

const reduxed = connect(null, { clearLikedJobs })(SettingsScreen);
export { reduxed as SettingsScreen };