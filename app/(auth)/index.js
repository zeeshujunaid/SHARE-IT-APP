import { View, StyleSheet, Image, Text } from 'react-native';
import { useEffect } from 'react'; // Import useEffect
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is installed and imported
import Toast from 'react-native-toast-message'; // Ensure Toast is installed and imported
import { useRouter } from 'expo-router'; // Adjust based on your routing library

function Loading() {
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('info');
        if (user !== null) {
          Toast.show({
            type: 'success',
            text1: 'Welcome Back!',
            text2: 'Hope you like the app',
          });
          router.push('(drawer)'); // Replace '(drawer)' with your dashboard route
        } else {
          Toast.show({
            type: 'info',
            text1: 'No User Found',
            text2: 'Please sign-up to continue',
          });
          router.push('/welcome'); // Replace '/sign-in' with your login route
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong. Please try again.',
        });
      }
    };

    checkUser(); // Automatically execute the function
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/bgremovedlogo.png')}
          style={styles.loaderImage}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Matching black for the background
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    color: '#1E90FF', // Blue color matching the logo
    fontWeight: 'bold',
  },
});

export default Loading;
