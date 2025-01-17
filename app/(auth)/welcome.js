import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const WelcomeScreen = () => {
  const router = useRouter();
  const videoRef = useRef(null);

  const checkUser = async () => {
    router.push('/sign-in');
    console.log('Welcome page');
  };

  useFocusEffect(
    useCallback(() => {
      // Play video when the screen is focused
      if (videoRef.current) {
        videoRef.current.playAsync();
      }

      return () => {
        // Pause and mute the video when the screen is unfocused or navigated away from
        if (videoRef.current) {
          videoRef.current.pauseAsync();  // Pause the video
          videoRef.current.setStatusAsync({ volume: 0, isMuted: true });  // Mute the video sound
        }
      };
    }, [])
  );

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
        // isLooping
      />

      {/* Transparent Overlay */}
      <View style={styles.overlay}>
        {/* Content Box with Border */}
        <View style={styles.contentBox}>
          {/* Logo */}
          <Image
            source={{ uri: "https://quiz.saylaniwelfare.com/images/smit.png" }}
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
