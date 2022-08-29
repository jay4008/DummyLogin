import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import DashBoard from '../screens/DashBoard';

const Stack = createStackNavigator();

function RootStackNav( ) {
  return (
    <Stack.Navigator screenOptions = {{headerShown : false}}>
      <Stack.Screen name="DashBoard" component={DashBoard} />
      {/* <Stack.Screen name="Registration" component={Registration} /> */}
    </Stack.Navigator>
  );
}


export default RootStackNav;