import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  Dimensions,
  Text
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNoMoreCards: () => <Text>No more Cards to show!</Text>
  };

  state = {
    index: 0
  };

  constructor(props) {
    super(props);

    this.positionActiveCard = new Animated.ValueXY();
    this.positionRestCards = new Animated.ValueXY({ x: 0, y: 10 });
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.positionActiveCard.setValue({ x: gesture.dx, y: gesture.dy });
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  forceSwipe(direction) {
    const x = direction === 'Right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(this.positionActiveCard, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'Right' ? onSwipeRight(item) : onSwipeLeft(item);
    Animated.timing(this.positionRestCards, {
      toValue: { x: 0, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.positionActiveCard.setValue({ x: 0, y: 0 });
      this.positionRestCards.setValue({ x: 0, y: 10 });
      this.setState({ index: this.state.index + 1 });
    });

  };

  resetPosition() {
    Animated.spring(this.positionActiveCard, {
      toValue: {
        x: 0,
        y: 0
      }
    }).start();
  }

  getCardStyle() {
    const rotate = this.positionActiveCard.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.positionActiveCard.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if (i < this.state.index) { return null; }

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 1 }]}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return (
        <Animated.View key={item.id} style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <Animated.View style={[this.positionRestCards.getLayout(), this.props.style]}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    zIndex: 0
  }
};

export default Deck;