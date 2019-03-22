import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";

export default class App extends Component {
  state = {
    location: null,
    latitude: '',
    longitude: '',
    msg: ''
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position)
        this.setState({ latitude: position.coords.latitude })
        this.setState({ longitude: position.coords.longitude })
        this.setState({ location })
        console.log(this.state.latitude + ", " + this.state.longitude)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    )
  }

  translateCoordinates = () => {
    const key = "dcb0c0c270922b"
    const lat = this.state.latitude
    const lon = this.state.longitude

    console.log("I'm about to fetch")
    fetch('http://us1.locationiq.com/v1/reverse.php?key=' + key + '&lat=' + lat + '&lon=' + lon + '&format=json')
    .then((response) => { 
      console.log(response)
      return response.json() 
    })
    .catch((error) => {
      console.error(error);
      Alert.alert(error)
    })
    .then((address) => {
      console.log(address)
      this.setState({ msg: address.display_name })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.translateCoordinates}>
          <Text style={styles.welcome}>Translate to Address</Text>
          <Text>Address: {this.state.msg}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});