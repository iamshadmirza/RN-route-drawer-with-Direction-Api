import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';
import polyUtil from 'polyline-encoded';
const YOUR_API_KEY = '';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
    };
  }

  componentDidMount() {
    this.getDirections('12.902118,77.5332684', '17.3850,78.4867');
  }
  async getDirections(startLoc, destinationLoc) {
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key= ${YOUR_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        let points = polyUtil.decode(data.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        this.setState({ coords });
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showCurrentLocation
          initialRegion={{
            latitude: 12.902118999999999,
            longitude: 77.53326849999999,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={3}
            strokeColor="rgb(88,59,249)"
            strokeColors={[
              'rgb(88,59,249)',
              'rgb(167,42,230)',
            ]}
            lineCap="round"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
