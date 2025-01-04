import '../global.css';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message'; // Correct import
import { Provider } from '../hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: '(auth)/loading',
};

export default function RootLayout() {
  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Expo Router Stack Navigation */}
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="(auth)/loading"
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/loading" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="LiveQuiz" options={{ headerShown: false }} />
        </Stack>

        {/* Toast Component */}
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}
