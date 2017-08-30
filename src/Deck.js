import React, { Component } from 'react';
import { ScrollView, Animated } from 'react-native';

class Deck extends Component {
  renderCards() {
    return this.props.data.map(this.props.renderCard);
  }

  render() {
    return (
      <ScrollView>
        {this.renderCards()}
      </ScrollView>
    );
  }
}

export default Deck;