import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, ToastAndroid } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  state = {
    index: 0
  };

  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('Right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('Left');
        } else {
          this.resetPosition();
        }
      }
    });
  }

  forceSwipe(direction) {
    const x = direction === 'Right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    ToastAndroid.show(direction, 400);
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'Right' ? onSwipeRight(item) : onSwipeLeft(item);
  };

  resetPosition() {
    Animated.spring(this.position, {
      toValue: {
        x: 0,
        y: 0
      }
    }).start();
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (!index) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;