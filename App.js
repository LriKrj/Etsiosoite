import React, { useState} from "react";
import {StyleSheet, View, Button, TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";


export default function App() {
  const start = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  };
  const [region, setRegion] = useState(start);
  const [address, setAddress] = useState("");
  

  const showCoordinates = async (location) => {
    
    const URL = `http://www.mapquestapi.com/geocoding/v1/address?key=FBdRiKKHrEdW5pa20tORCDewx4ZL5iI2&location=${location}, FINLAND`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const lat = data.results[0].locations[0].latLng.lat;
      const lng = data.results[0].locations[0].latLng.lng;
      setRegion({ ...region, latitude: lat, longitude: lng });
    } catch (error) {
      Alert.alert("Error fetching coordinates");
    }
    
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} />
      </MapView>
      <View />

      <TextInput
        style={styles.texts}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Button title="Search" onPress={() => showCoordinates(address)} />
      <View/>
      <View/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  
  texts: { 
    fontSize: 18,
    width: 200, 
    borderWidth: 1, 
    padding: 5 }
});

