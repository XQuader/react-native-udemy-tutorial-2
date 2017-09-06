import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  state = { slide: 0 };

  renderLastSlide(index) {
    if (this.props.data.length - 1 === index) {
      return (
        <Button
          title='Onwards!'
          backgroundColor='#0288D1'
          containerViewStyle={{ marginTop: 15 }}
          raised
          onPress={this.props.onSlidesComplete}
        />
      );
    }
  }

  renderSlides() {
    const { data } = this.props;

    return data.map((slide, index) => (
      <View style={[styles.slideStyle, { backgroundColor: slide.color }]} key={slide.text}>
        <Text style={styles.textStyle}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {

  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  }
};

export default Slides;