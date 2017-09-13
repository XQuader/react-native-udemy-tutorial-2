import React, { Component } from 'react';
import { Dimensions, Text, View, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import Deck from '../components/Deck';
import { likeJob, dislikeJob } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DeckScreen extends Component {
  renderCard(job, index) {
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
          style={{ flex: 1, display: index > 2 ? 'none' : 'flex' }}
          region={region}
          scrollEnabled={false}
          cacheEnabled={Platform.OS === 'android'}
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

  onSwipeRight = job => {
    this.props.likeJob(job);
  };

  onSwipeLeft = job => {
    this.props.dislikeJob(job);
  };

  renderNoMoreCards = () => {
    return (
      <Card
        containerStyle={{ borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165 }}
        title="No more jobs"
      >
        <Button
          title='Back To Map'
          large
          icon={{ name: 'my-location' }}
          backgroundColor='#03A9F4'
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    )
  };

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

const reduxed = connect(mapStateToProps, { likeJob, dislikeJob })(DeckScreen);
export { reduxed as DeckScreen };