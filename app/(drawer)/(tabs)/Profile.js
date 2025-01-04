import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { auth, db } from "../../utils/firebase";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      let name = "Name Not Available";
      let email = "Email Not Available";
      let center = "Not Available";
  
      const storedProfile = await AsyncStorage.getItem("info");
      if (storedProfile) {
        const { name: asyncName, email: asyncEmail, center: asyncCenter } =
          JSON.parse(storedProfile);
        name = asyncName || name;
        email = asyncEmail || email;
        center = asyncCenter || center;
      }
  
      if (name === "Name Not Available") {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);
  
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            name = userData.name || "Name Not Available";
            email = userData.email || "Email Not Available";
            center = userData.center || "Not Available";
            await AsyncStorage.setItem("info", JSON.stringify({ name, email, center }));
          }
        }
      }
  
      setProfileInfo({ name, email, center });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error fetching data", text2: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      Toast.show({ type: "success", text1: "Logged Out", text2: "You have been successfully logged out." });
      router.push("/sign-in");
    } catch (error) {
      Toast.show({ type: "error", text1: "Logout Failed", text2: "Please try again." });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
              <View style={styles.Loadingcontainer}>
              <Image
                source={{ uri: 'https://quiz.saylaniwelfare.com/images/smit.png' }}
                style={styles.loaderImage}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
      ) : (
        <>
          <ScrollView style={styles.scoresContainer} showsVerticalScrollIndicator={false}>
            {/* Top Section */}
            <View style={styles.topSection}>
              {profileInfo && (
                <View style={styles.profileCard}>
                  <View style={styles.header}>
                    <Image
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
                      }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>{profileInfo.name}</Text>
                  </View>

                  <View style={styles.profileDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Email:</Text>
                      <Text style={styles.detailValue}>{profileInfo.email}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Center:</Text>
                      <Text style={styles.detailValue}>{profileInfo.center}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => router.push("/(auth)/quizResult")}
              >
                <Text style={styles.navigateText}>View All Quiz Results</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  Loadingcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
  },
  loaderImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: "#ccc",
    elevation: 4,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 12,
    textAlign: "center",
  },
  scoresContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  profileCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: "center",
  },
  profileDetails: {
    marginTop: 20,
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  navigateButton: {
    backgroundColor: "#28A745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  navigateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  topSection: {
    flex: 1,
    marginBottom: 40,
  },
  bottomSection: {
    flex: 1,
    alignItems: "center",
  },
});

