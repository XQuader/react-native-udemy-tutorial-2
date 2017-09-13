import React, { Component } from 'react';
import { View, ScrollView, Platform, Linking } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title='Settings'
        onPress={() => navigate('settings')}
        backgroundColor='rgba(0, 0, 0, 0)'
        color='rgba(0, 122, 255, 1)'
      />
    )
  });

  renderJob = job => {
    const { jobtitle, company, jobkey, formattedRelativeTime, url, latitude, longitude } = job;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.042,
      longitudeDelta: 0.02
    };

    return (
      <Card
        containerStyle={{
          borderRadius: 10,
        }}
        key={jobkey}
        title={jobtitle}
      >
        <View style={{ height: 200 }}>
          <MapView
            style={{ flex: 1 }}
            region={region}
            scrollEnabled={false}
            cacheEnabled={Platform.OS === 'android'}
          />
          <View style={styles.detailsWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            title='Apply Now!'
            backgroundColor='#03A9F4'
            onPress={() => Linking.openURL(url)}
          />
        </View>
      </Card>
    )
  };

  renderLikeJobs() {
    return this.props.likes.map(this.renderJob);
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikeJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  },
  italics: {
    fontStyle: 'italic'
  }
};

const mapStateToProps = ({ likes }) => ({ likes });

const reduxed = connect(mapStateToProps)(ReviewScreen);
export { reduxed as ReviewScreen };