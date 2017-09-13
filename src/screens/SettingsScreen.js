import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';
import { Button, Icon } from 'react-native-elements';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => <Icon size={30} name='settings' color={tintColor}/>,
    tabBarLabel: ({ tintColor }) => <Text style={{ color: tintColor }}>Settings</Text>
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