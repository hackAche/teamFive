import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import { useEffect, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

import {
  GetAllBusStopQuery,
  useGetAllBusStopLazyQuery,
  useGetAllBusStopQuery,
} from '../graphql/generated';

interface QRcodeProps {
  document: string;
  busStop: string;
}

interface UserInfoProps {
  name: string;
  document: string;
  course: string;
}

export default function BusScreen() {
  const colorScheme = useColorScheme();
  const [busStopName, setBusStopName] = useState<string>('');
  const { data, loading, error } = useGetAllBusStopQuery();

  const [QRcodeString, setQRcodeString] = useState<QRcodeProps | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfoProps | null>();
  useEffect(() => {
    async function loadStorageUserName() {
      const getUser = await AsyncStorage.getItem('@routeufpel:userInfo');
      let user = (getUser ? JSON.parse(getUser) : null) as UserInfoProps;
      setUserInfo(user);
    }

    loadStorageUserName();
  }, []);

  function handleSetQRcodeString(busStop: string) {
    if (!userInfo) {
      Alert.alert('Erro', 'Voce não está logado!');
      return;
    }
    let qrinfo = {} as QRcodeProps;
    qrinfo.busStop = busStop;
    qrinfo.document = userInfo?.document;
    const findName = data?.busStops.find((busStopMap) => busStopMap.id === busStop);
    if (findName) {
      setBusStopName(findName.name);
    }
    setQRcodeString(qrinfo);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: '400', fontSize: 15 }}>
        Para gerar o QRcode que deve ser mostrado na entrar no Onibus.
      </Text>
      <Text style={{ fontWeight: '400', fontSize: 15, marginBottom: 20 }}>
        Selecione a{' '}
        <Text style={{ fontWeight: '600', fontSize: 20, color: Colors[colorScheme].purple }}>
          parada
        </Text>{' '}
        que você vai descer.
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <LinearGradient
          style={{ width: '90%', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
          colors={['#D500F9', '#4A148C']}
        >
          {loading && <Text>Carregando paradas...</Text>}
          {data?.busStops && (
            <Picker
              selectedValue={QRcodeString?.busStop}
              style={{ width: '90%', color: Colors[colorScheme].white }}
              dropdownIconColor={Colors[colorScheme].white}
              onValueChange={(itemValue, itemIndex) => handleSetQRcodeString(itemValue)}
              mode="dropdown"
            >
              {data.busStops.map((busStops) => {
                return <Picker.Item key={busStops.id} label={busStops.name} value={busStops.id} />;
              })}
            </Picker>
          )}
        </LinearGradient>
      </View>

      {/* {busStop !== "" && <Button variante="primary">Gerar Qrcode</Button>}  */}

      {QRcodeString && (
        <View style={styles.card}>
          <QRCode size={250} value={JSON.stringify(QRcodeString)} />
          <Text style={{}}></Text>

          <View style={{ backgroundColor: '#f5f5f5' }}>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Nome: </Text>
              {userInfo?.name}
            </Text>

            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Curso:</Text> {userInfo?.course}
            </Text>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Matricula:</Text> {userInfo?.document}
            </Text>
            <Text style={{}}>
              <Text style={{ fontWeight: '700' }}>Destino:</Text> {busStopName}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
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
