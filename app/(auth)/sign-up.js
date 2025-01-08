import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [center, setCenter] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const translateY = useRef(new Animated.Value(450)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;

  const handleSignup = () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          Toast.show({
            type: "success",
            text1: "Account Created",
            text2: "Welcome to Saylani Quiz App!",
          });

          await AsyncStorage.setItem(
            "info",
            JSON.stringify({
              email: email,
              name: name,
              uid: user.uid,
              center: center,
            })
          );

          await setDoc(doc(collection(db, "users"), user.uid), {
            email: email,
            name: name,
            uid: user.uid,
            center: center,
          });

          router.push("/(drawer)/");
          setName("");
          setEmail("");
          setCenter("");
          setPassword("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Signup Failed",
            text2: error.message,
          });
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill out all fields.",
      });
    }
  };

  const toggleAnimation = () => {
    if (expanded) {
      // Collapse
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 450,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(false));
    } else {
      // Expand
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -290, // Move logo higher
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(true));
    }
  };

  return (
    <View style={styles.background}>
      <Animated.View
        style={[styles.logoSection, { transform: [{ translateY: logoTranslateY }] }]}
      >
        <Image
          source={require("../../assets/images/bgremovedlogo.png")}
          style={styles.logo}
        />
      </Animated.View>

      <ScrollView
        style={styles.contentSection}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity onPress={toggleAnimation} style={styles.iconContainer}>
          <FontAwesome
            name={expanded ? "chevron-down" : "chevron-up"}
            size={30}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Create an Account</Text>
        <Text style={styles.subheading}>Sign up to start your quiz journey</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#808080"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Center"
          placeholderTextColor="#808080"
          value={center}
          onChangeText={setCenter}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="#808080" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/sign-in")}
          >
            Sign In
          </Text>
        </Text>
      </ScrollView>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentSection: {
    width: "100%",
    backgroundColor: "#d4d4d4",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 40, // Add extra space at the bottom of the content
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: "contain",
  },
  iconContainer: {
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
     fontSize: 30,
     color: "#000",
     fontWeight: "bold",
      marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    color: "#000",
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 15,
    paddingRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    padding: 15,
    color: "#000",
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#000",
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  linkText: {
    color: "#4c9efa",
    fontWeight: "bold",
  },
});
