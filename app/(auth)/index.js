import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';

const WelcomeScreen = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const navigation = useNavigation();

  const checkUser = async () => {
    try {
      const user = await AsyncStorage.getItem('info');
      if (user !== null) {
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: 'Hope you like the app',
        });
        router.push('(tabs)'); // Replace '(tabs)' with your dashboard route
      } else {
        Toast.show({
          type: 'info',
          text1: 'No User Found',
          text2: 'Please sign-up to continue',
        });
        router.push('/sign-in'); // Replace '/sign-in' with your login route
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No user found, please try again',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Pause video playback when the screen is navigated away
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    });

    return unsubscribe; // Cleanup listener on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        ref={videoRef}
        source={require('../../assets/video/A glimpse of the grand event held at National Stadium Karachi..mp4')}
        style={StyleSheet.absoluteFillObject}
        rate={1.0}
        volume={0.2}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
      />

      {/* Transparent Overlay */}
      <View style={styles.overlay}>
        {/* Content Box with Border */}
        <View style={styles.contentBox}>
          {/* Logo */}
          <Image
            source={{ uri: "https://quiz.saylaniwelfare.com/images/smit.png" }} // Replace with your logo path
            style={styles.logo}
          />

          <Text style={styles.title}>WELCOME TO</Text>
          <Text style={styles.subtitle}>SAYLANI QUIZ APP</Text>
          <TouchableOpacity style={styles.button} onPress={checkUser}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Bar */}
      <StatusBar style="light" translucent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
  },
  contentBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent background
    borderWidth: 3,
    borderColor: '#fff', // White border
    borderRadius: 15,
    padding: 20,
  },
  logo: {
    width: 200, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;
