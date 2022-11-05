import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView from 'react-native-maps';
import { Marker, LatLng } from 'react-native-maps';

// import { LatLng, LeafletView } from 'react-native-leaflet-view';
import Colors from "../constants/Colors";

interface BusStop {
  id: string,
  name: string,
  address: string,
  location: LatLng
}

export default function MapComponent() {

  var busStops_JSON = `{
    "data": {
      "busStops": [
        {
          "id": "cla40vtik2vtr0bm2absk7o66",
          "name": "Anglo",
          "address": "Rua Gomes Carneiro, 01",
          "location": {
            "latitude": -31.781281638065245,
            "longitude": -52.323999078191505
          }
        },
        {
          "id": "cla414wjc2wk70blyinky5xyn",
          "name": "Cotada",
          "address": "Rua Benjamin Constant esquina Rua Dona Mariana",
          "location": {
            "latitude": -31.781088612508977,
            "longitude": -52.33514408888547
          }
        }
    ]
    }
  }`

  var result = JSON.parse(busStops_JSON);

  const [mapRegion, setmapRegion] = useState({
    latitude: -31.772913131279175,
    longitude: -52.3357961389593,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  const [selectedValue, setSelectedValue] = useState("Todas");
  return (
    <View style={styles.container}>
      <View style={styles.mapHeader}>
        <Text style={styles.titleText}>
          Paradas
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150, flex: 1}}
          onValueChange={(itemValue: string, itemIndex: number) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Todas" value="Todas" />
          <Picker.Item label="Anglo" value="Anglo" />
          <Picker.Item label="Pelotas -> Capão do Leão" value="Pelotas -> Capão do Leão" />
          <Picker.Item label="Capão do Leão -> Pelotas" value="Capão do Leão -> Pelotas" />
        </Picker>
      </View>
      

      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        //showsUserLocation={true}  
        showsPointsOfInterest={false}
      >
        {result.data.busStops.map((stop: BusStop, index: number) => (
          <Marker
            key={index}
            coordinate={stop.location}
            title={stop.name}
            pinColor={"#52006A"}
            description={stop.address}
            onPress={e => console.log(stop.name)}
            onCalloutPress={e => console.log(stop.address)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
  },
  mapHeader: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
    width: "100%"
  },
  titleText: {
    fontWeight: "600",
    flex: 0
  }
});
