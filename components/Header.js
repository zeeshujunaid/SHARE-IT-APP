import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase"; // Firebase configuration
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Header() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const navigation = useNavigation(); // Use useNavigation hook

  // Function to fetch user data from AsyncStorage or Firebase
  const fetchUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("info");
      if (storedUserInfo) {
        const { name } = JSON.parse(storedUserInfo);
        setUserName(name);
      } else {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserName(userData.name || "Name Not Available");
            await AsyncStorage.setItem(
              "info",
              JSON.stringify({ name: userData.name })
            );
          } else {
            setUserName("Name Not Available");
            Toast.show({
              type: 'error',
              text1: 'Hi user',
              text2: ' plz restart the app to see the changes',
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUserName("Error Loading Name");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <StatusBar style="light" hidden={false} translucent={true} />
      {Platform.OS === "android" && (
        <RNStatusBar translucent backgroundColor="transparent" />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.leftSection}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text style={styles.drawerButton}>☰</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleSection}>
            <Text style={styles.nameText}>
              Hi, {userName || "User"}
            </Text>
            <Text style={styles.subtitleText}>
              Welcome Back! Let's Start Practicing!
            </Text>
          </View>
          <View style={styles.rightSection}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/Profile")}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
                }}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 120,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",  
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    height: 110,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  leftSection: {
    width: "20%", // Left section takes 25% of width
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  middleSection: {
    width: "60%", // Middle section takes 40% of width
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  rightSection: {
    width: "20%", // Right section takes 30% of width
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    marginTop: 30,
  },
  subtitleText: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
  },
  drawerButton: {
    fontSize: 30,
    color: "#000",
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
