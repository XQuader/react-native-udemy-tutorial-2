import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { Dimensions, Text, View, Platform } from 'react-native';
import Deck from '../components/Deck';
import { MapView } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {
  renderCard(job) {
    const { latitude, longitude, company, jobtitle, formattedRelativeTime, snippet, url } = job;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card
        containerStyle={{ borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165, flexDirection: 'row' }}
        title={jobtitle}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          scrollEnabled={false}
          cacheEnabled={Platform.OS === 'android' ? true : false}
        />
        <View style={styles.detailsWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>
        <Text>
          {snippet.replace(/<\/?b>/gi, '')}
        </Text>
      </Card>
    )
  }

  onSwipeRight(job) {
    console.log('job liked: ' + job.jobtitle);
  }

  onSwipeLeft(job) {
    console.log('job disliked: ' + job.jobtitle);
  }

  renderNoMoreCards() {
    return (
      <Card
        containerStyle={{ borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165 }}
        title="No more jobs"
      />
    )
  }

  render() {
    return (
      <Deck
        data={this.props.jobs}
        keyProp='jobkey'
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
        onSwipeRight={this.onSwipeRight}
        onSwipeLeft={this.onSwipeLeft}
      />
    );
  }
}

const styles = {
  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  }
};

const mapStateToProps = ({ jobs }) => ({
  jobs: jobs.results
});
const reduxed = connect(mapStateToProps)(DeckScreen);

export { reduxed as DeckScreen };