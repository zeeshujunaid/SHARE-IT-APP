import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider, facebookProvider } from "../../utils/firebase";
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

          router.push("/(tabs)/");
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

  // const handleGoogleSignup = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then(async (userCredential) => {
  //       const user = userCredential.user;
  //       await AsyncStorage.setItem("info", JSON.stringify({ email: user.email, name: user.displayName, uid: user.uid }));
  //       router.push("/(tabs)/");
  //     })
  //     .catch((error) => {
  //       Toast.show({
  //         type: "error",
  //         text1: "Google Signup Failed",
  //         text2: error.message,
  //       });
  //     });
  // };

  // const handleFacebookSignup = () => {
  //   signInWithPopup(auth, facebookProvider)
  //     .then(async (userCredential) => {
  //       const user = userCredential.user;
  //       await AsyncStorage.setItem("info", JSON.stringify({ email: user.email, name: user.displayName, uid: user.uid }));
  //       router.push("/(tabs)/");
  //     })
  //     .catch((error) => {
  //       Toast.show({
  //         type: "error",
  //         text1: "Facebook Signup Failed",
  //         text2: error.message,
  //       });
  //     });
  // };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://quiz.saylaniwelfare.com/images/smit.png' }}
          style={styles.logo}
        />
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
  
        {/* Social Sign Up Section
        <View style={styles.socialLoginContainer}>
    <Text style={styles.socialText}>Or sign in with</Text>
    <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.socialIconButton}>
            <Image
                source={{ uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' }}
                style={styles.socialIcon}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconButton}>
            <Image
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png' }}
                style={styles.socialIcon}
            />
        </TouchableOpacity>
    </View>
</View> */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.linkText} onPress={() => router.push("/sign-in")}>
            Log In
          </Text>
        </Text>
  
        <Toast />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  container: {
    width: "95%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    padding: 20,
    alignSelf: "center",
  },
  heading: {
    fontSize: 30,
    color: "#33CC33",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    color: "#555555",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderColor: "#33CC33",
    borderWidth: 1,
    borderRadius: 8,
    color: "#333333",
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#33CC33",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 15,
    paddingRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    padding: 15,
    color: "#333333",
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#33CC33",
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
    // paddingTop:0,
  },
  linkText: {
    color: "#33CC33",
    fontWeight: "bold",
  },
 
//   socialLoginContainer: {
//     alignItems: "center",
//     // marginVertical: 30,
// },
// socialText: {
//   fontSize: 14,
//   color: "#555",
//     marginBottom: 10,
//     marginTop:10,
//     textAlign: "center",
// },
// socialIcons: {
//   flexDirection: "row",
//   justifyContent: "center",  // Center icons horizontally
//   alignItems: "center",      // Center icons vertically
//   width: "100%",             // Ensure the container takes the full width
//   paddingHorizontal: 70,     // Add padding to ensure proper spacing within the container
// },

// socialIconButton: {
//   marginHorizontal: 10,      // Reduced margin for better spacing between icons
//   borderRadius: 10,          // Rounded corners for the buttons
//   overflow: "hidden",        // Ensures the image fits properly within the rounded button
// },
// socialIcon: {
//     width: 60,
//     height: 60,
//     resizeMode: "contain",
// },
});
