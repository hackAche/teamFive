import React, { useState, useEffect } from 'react';
import { routeAll, routeAnglo, routeCapao, mapStyle } from '../utils/Variables';
import { generateFullRoute } from '../utils/Functions';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import MapView from 'react-native-maps';
import { Marker, LatLng, Circle, Callout, Polyline } from 'react-native-maps';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import useColorScheme from '../hooks/useColorScheme';
import {
  useGetAllBusStopQuery,
  useGetLineAngloQuery,
  useGetAllBusesQuery,
} from '../graphql/generated';
import Button from '../components/Button';

interface positionProps {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const { data: dataAnglo, loading: loadingAnglo, error: errorAnglo } = useGetLineAngloQuery();

  const [mapRoute, setMapRoute] = useState<Array<LatLng>>(routeAll);
  const [busPosition, setBusPosition] = useState<LatLng>({
    latitude: -31.781266223226314,
    longitude: -52.32405422917516,
  });
  const { data, loading, error } = useGetAllBusStopQuery();
  const { data: dataAllBuses } = useGetAllBusesQuery();
  // const busInTransite = dataAllBuses
  //   ? dataAllBuses.buses.find((bus) => bus.inTransit == true)
  //   : null;

  async function refreshPage() {
    await AsyncStorage.setItem('busPosition', JSON.stringify(busCurrentPosition));
    await AsyncStorage.setItem('busRouteIndex', i.toString());
    setBusPosition(busCurrentPosition);
  }

  const colorScheme = useColorScheme();
  let busRoute = generateFullRoute(routeAnglo);
  let busCurrentPosition: any, i: number, storageIndex: any;
  let mapRegion = {
    latitude: -31.772913131279175,
    longitude: -52.3357961389593,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };
  const [selectedValue, setSelectedValue] = useState('Todas');
  const getData = async () => {
    let lastMapRegion = await AsyncStorage.getItem('mapRegion');
    busCurrentPosition = await AsyncStorage.getItem('busPosition');
    storageIndex = await AsyncStorage.getItem('busRouteIndex');
    if (busCurrentPosition == null) {
      busCurrentPosition = busRoute[0];
    } else {
      busCurrentPosition = JSON.parse(busCurrentPosition);
    }
    if (storageIndex == null) {
      i = 0;
    } else {
      i = parseInt(storageIndex);
    }
    if(lastMapRegion != null) {
      mapRegion = JSON.parse(lastMapRegion);
    } else {
      mapRegion = {
        latitude: -31.772913131279175,
        longitude: -52.3357961389593,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }
    }
  };
  getData();
  setInterval(() => {
    ++i;
    if (i === busRoute.length) i = 0;
    busCurrentPosition = busRoute[i];
  }, 1000);

  useEffect(() => {

  }, [])
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 15, maxWidth: 300 }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}
          >
            Você pode selecionar uma{' '}
            <Text style={{ fontWeight: '600', fontSize: 20, color: Colors[colorScheme].purple }}>
              linha
            </Text>{' '}
            para encontar suas paradas no mapa mais rapidamente
          </Text>
          <Button
            onPress={refreshPage}
            style={{ padding: 10 }}
            variante="secundary"
            icon="refresh-cw"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <LinearGradient
            style={{
              width: '90%',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#D500F9', '#4A148C']}
          >
            <Picker
              selectedValue={selectedValue}
              style={{ width: '90%', color: Colors[colorScheme].white }}
              dropdownIconColor={Colors[colorScheme].white}
              onValueChange={(itemValue) => {
                setSelectedValue(itemValue);
                if (itemValue === 'Anglo') {
                  setMapRoute(routeAnglo);
                } else if (itemValue === 'Todas') {
                  setMapRoute(routeAll);
                } else {
                  setMapRoute(routeCapao);
                }
              }}
              mode="dropdown"
            >
              <Picker.Item label="Todas" value="Todas" />
              <Picker.Item label="Anglo" value="Anglo" />
              <Picker.Item label="Pelotas -> Capão do Leão" value="Pelotas -> Capão do Leão" />
              <Picker.Item label="Capão do Leão -> Pelotas" value="Capão do Leão -> Pelotas" />
            </Picker>
          </LinearGradient>
        </View>
      </View>
      {<MapView
        style={{ alignSelf: 'stretch', height: 400 }}
        region={mapRegion}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsPointsOfInterest={false}
      >
        <Polyline coordinates={mapRoute} strokeColor="#0000ff" strokeWidth={4} />
        <Marker
          // Ônibus
          coordinate={busPosition}
          title={'Linha Anglo'}
          description={'Passageiros: 30/80'}
        >
          <Image
            source={require('../assets/images/busMarker.png')}
            style={{ width: 36, height: 40 }}
            resizeMode="contain"
          />
        </Marker>
        {data &&
          dataAnglo &&
          data.busStops.map((stop, index: number) => {
            if (dataAnglo && dataAnglo.route) {
              let isOk =
                dataAnglo.route?.busStops.findIndex((busStop) => busStop.id === stop.id) > -1;

              // console.log(isOk, stop.id);
              if (!isOk && selectedValue === 'Anglo') return null;
            }
            return (
              <View key={stop.id}>
                <Marker coordinate={stop.location} title={stop.name} pinColor={'#52006A'}>
                  <Callout>
                    <Text>
                      {stop.name + '\n'}
                      {stop.address + '\n'}
                      Passageiros a espera: {stop.waitingCount}
                    </Text>
                  </Callout>
                </Marker>
                <Circle
                  center={stop.location}
                  radius={stop.waitingCount * 10}
                  strokeColor={'#ff000050'}
                  fillColor={'#ff000050'}
                  lineCap={'round'}
                  strokeWidth={2}
                />
              </View>
            );
          })}
      </MapView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
