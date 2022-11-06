import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";

export default function UserInfoCard() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    AsyncStorage.setItem("@routeufpel:user", "Darlei Matheus Schmegel");
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@routeufpel:user");
      setUserName(user || "");
    }

    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>

        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/48039442?s=400&u=f2b71badc3fd29d1698cb523d20f1a82bd8f49d9&v=4",
          }}
          style={styles.image}
        />
        <Text style={styles.userName}>{userName}</Text>
      <View style={{}}>
        
      <Text style={{}}><Text style={{fontWeight:"700"}}>Curso</Text>: Engenharia de Computação</Text>
      <Text style={{}}><Text style={{fontWeight:"700"}}>Matricula</Text>: 18103368</Text>
      
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: '#f5f5f5',
    elevation: 20,
    shadowColor: '#52006A',
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  text: {
    color: "#fff"
  },

  image: {
    width: 180,
    height: 180,
    borderColor: "#9C27B0",
    borderWidth: 2,
    borderRadius: 90,
  },

  greeting: {
    fontSize: 32,
  },

  userName: {
    fontSize: 22,
    textAlign: "center",
    lineHeight: 40,
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
