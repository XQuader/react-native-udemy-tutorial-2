import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { FormLabel, FormInput, Button} from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-e9109.cloudfunctions.net';

class SignUpForm extends Component {
  state = { phone: '' };

  handlePhoneChange = phone => this.setState({ phone });

  handleSubmit = async () => {
    const { phone } = this.state;

    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone });
      await axios.post(`${ROOT_URL}/requestPassword`, { phone });
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
        <Button
          title='SignUp'
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignUpForm;