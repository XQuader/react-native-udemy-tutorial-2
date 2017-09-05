import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './src/components/SignUpForm';
import SignInForm from './src/components/SignInForm';

export default class App extends React.Component {
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyAWSg-UpmoaUTsyw-PPZ1FpHVjMbGycdXU",
      authDomain: "one-time-password-e9109.firebaseapp.com",
      databaseURL: "https://one-time-password-e9109.firebaseio.com",
      projectId: "one-time-password-e9109",
      storageBucket: "one-time-password-e9109.appspot.com",
      messagingSenderId: "33190879535"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={{ marginTop: 25 }}>
        <SignUpForm/>
        <SignInForm/>
      </View>
    );
  }
}