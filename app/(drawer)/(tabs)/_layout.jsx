import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, // Show labels for better accessibility
        tabBarLabelStyle: {
          fontSize: 12, // Smaller font size for the labels
          fontWeight: '600',
          color: '#6a6a6a', // Default inactive label color
        },
        tabBarStyle: {
          position: 'absolute', // Ensure it's fixed at the bottom
          bottom: 0, // Fix tab bar at the bottom
          left: 20,
          right: 20,
          height: 60, // Adjusted height for a more balanced look
          borderTopLeftRadius: 20, // Subtle rounded top corners
          borderTopRightRadius: 20, // Subtle rounded top corners
          borderBottomLeftRadius: 0, // Fixed bottom corners
          borderBottomRightRadius: 0, // Fixed bottom corners
          backgroundColor: '#fff', // White background for clean design
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          

        },
        tabBarActiveTintColor: '#40cf47', // Active tab icon color
        tabBarInactiveTintColor: '#A4D7A6', // Inactive tab icon color
        
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: 'Home', // Add label for clarity
        }}
      />

      {/* quiz Tab (Custom Center Button) */}
      <Tabs.Screen
        name="LiveQuiz"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.centerButton,
                { backgroundColor: focused ? '#66BB6A' : '#4CAF50' }, // Active/inactive background color
              ]}
            >
              <TabBarIcon name="plus" color="white" />
            </View>
          ),
          tabBarLabel: 'Live Quiz', // Add label for clarity
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarLabel: 'Profile', // Add label for clarity
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 60, // Slightly increased size for prominence
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position above the tab bar
    bottom: 0, // Position the button at the very bottom
    left: '70%',
    transform: [{ translateX: -35 }], // Center the button horizontally
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});