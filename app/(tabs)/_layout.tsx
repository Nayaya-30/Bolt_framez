import { Tabs } from 'expo-router';
import { Home, PlusSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#8a2be2',
        tabBarInactiveTintColor: '#aaa',
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#1a1a1a',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 24,
          color: '#fff',
        },
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Framez',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Post',
          tabBarIcon: ({ color, size }) => <PlusSquare color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}