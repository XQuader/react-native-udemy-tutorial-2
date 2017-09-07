import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { dummy } from '../actions';

const APP_ID = 1929727650627951;

class AuthScreen extends Component {

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
      </View>
    );
  }
}

const reduxed = connect(null, { dummy })(AuthScreen);
export { reduxed as AuthScreen };