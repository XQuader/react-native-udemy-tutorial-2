import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View/>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => ({ token });

const reduxed = connect(mapStateToProps, { facebookLogin })(AuthScreen);
export { reduxed as AuthScreen };