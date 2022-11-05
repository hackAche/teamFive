import { StyleSheet } from 'react-native';
import MapComponent from '../components/MapComponent';
import { Text, View } from '../components/Themed';



export default function Map() {
  return (
    <View style={styles.container}>
      <MapComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
