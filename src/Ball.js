import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY({x: 10, y: 30});
    Animated.spring(this.position, {
      toValue: {
        x: 200,
        y: 500
      },
      speed: 1
    }).start();
  }

  render() {
    const { ballStyle } = styles;

    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={ballStyle} />
      </Animated.View>
    )
  }
}

const styles = {
  ballStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  }
};

export default Ball;