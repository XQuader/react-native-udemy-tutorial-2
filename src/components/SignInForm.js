import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { FormLabel, FormInput, Button} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-e9109.cloudfunctions.net';

class SignInForm extends Component {
  state = { phone: '', code: '' };

  handlePhoneChange = phone => this.setState({ phone });
  handleCodeChange = code => this.setState({ code });

  handleSubmit = async () => {
    const { phone, code } = this.state;

    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyPassword`, { phone, code });

      console.log(data);
      firebase.auth().signInWithCustomToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={{ borderColor: 'black', borderWidth: 1, margin: 10, padding: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={this.handlePhoneChange}
            keyboardType='numeric'
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={this.handleCodeChange}
            keyboardType='numeric'
          />
        </View>
        <Button
          title='SignIn'
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignInForm;