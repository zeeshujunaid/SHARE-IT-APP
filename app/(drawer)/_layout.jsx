import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerShown: false,
        headerTitle: 'Dashboard',
        drawerLabel: 'Dashboard',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;