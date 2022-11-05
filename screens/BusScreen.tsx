import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function BusScreen() {
  const colorScheme = useColorScheme();
  const [userName, setUserName] = useState<string>();
  const [busStop, setBusStop] = useState<string>('');

  const data = [
    {
      label: 'Parada 1',
      accessibilityLabel: 'Your label',
    },
    {
      label: 'Parada 2',
      accessibilityLabel: 'Your label',
    },
  ];

  useEffect(() => {
    AsyncStorage.setItem('@routeufpel:user', 'Darlei Matheus Schmegel');
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@routeufpel:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '500', fontSize: 15 }}>Selecione a parada você vai descer.</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Picker
          selectedValue={busStop}
          style={{ height: 100, width: '90%', backgroundColor: Colors[colorScheme].purple, borderRadius: 8 }}
          onValueChange={(itemValue, itemIndex) => setBusStop(itemValue)}
        >
          {data.map((d) => {
            return <Picker.Item key={d.label} label={d.label} value={d.label} />;
          })}
        </Picker>
      </View>

      {/* {busStop !== "" && <Button variante="primary">Gerar Qrcode</Button>}  */}

      {busStop !== '' && (
        <View style={styles.card}>
          <QRCode size={250} value={busStop} />
          <Text style={{}}></Text>

          <View style={{ backgroundColor: '#f5f5f5' }}>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Nome: </Text>
              {userName}
            </Text>

            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Curso:</Text> Engenharia de Computação
            </Text>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Matricula:</Text> 18103368
            </Text>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Destino:</Text> {busStop}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    color: 'fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    elevation: 20,
    shadowColor: '#52006A',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
