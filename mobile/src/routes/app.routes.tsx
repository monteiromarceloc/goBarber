import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      // headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AppStack.Screen name="Dashboard" component={Dashboard} />
  </AppStack.Navigator>
);

export default AppRoutes;
