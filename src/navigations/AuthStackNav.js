import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import DashBoard from '../screens/DashBoard';
import {ActivityIndicator, AsyncStorage, View, Text} from 'react-native';

const Stack = createStackNavigator();

function AuthStakNav() {
  let [loader, setLoader] = useState(false);
  const [logedUser, setLogedUser] = useState('');

  const getData = async () => {
    let LogedUser = await AsyncStorage.getItem('LogedUser');
    setLogedUser(LogedUser);
    console.log('LogedUser', LogedUser);
  };

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
    getData();
  }, []);

  if (loader) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={'#000'} />
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={logedUser === 'true' ? 'DashBoard' : 'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
    </Stack.Navigator>
  );
}

export default AuthStakNav;
