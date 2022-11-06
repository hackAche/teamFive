import { StatusBar, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import UserInfoCard from '../components/userInfoCard';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfoProps {
  name: string,
  document: string,
  course: string,
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>();
  useEffect(() => {
    let user = {} as UserInfoProps;
    user.course = "Engenharia de computação",
    user.document= "18103368",
    user.name= "Darlei Matheus Schmegel"

    AsyncStorage.setItem("@routeufpel:userInfo", JSON.stringify(user));
    async function loadStorageUserName() {
      const getUser = await AsyncStorage.getItem("@routeufpel:userInfo");
      let user = (getUser ? JSON.parse(getUser): null) as UserInfoProps;
      setUserInfo(user);
      // console.log(userInfo)
    }

    loadStorageUserName();
  }, []);
  return (
    <View style={styles.container}>
      <UserInfoCard />

      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
