import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../assets/icons/logo.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Email'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Password'}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={async () => {
            // let data = {email, email, password: password};
            let userArray = await AsyncStorage.getItem('userData');

            let newData = JSON.parse(userArray);
            let Login = false;

            newData.map(async (item, index) => {
              console.log('item', item);
              if (item.email === email && item.password === password) {
                Login = true;
                Alert.alert('ok');
                await AsyncStorage.setItem('currentUserData', JSON.stringify(item));
              }
            });

            if (!Login) {
              Alert.alert('Wrong UserName Password');
              return;
            }
            if (Login) {
              await AsyncStorage.setItem('LogedUser', 'true');
              props.navigation.dispatch(
                StackActions.replace('DashBoard')
              );
              props.navigation.navigate('DashBoard');
            } else {
              await AsyncStorage.setItem('LogedUser', 'false');
            }
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginTxt}>Login </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row-reverse',
          width: width - 30,
          marginTop: 10,
        }}>
        <Text style={{fontWeight: '600'}}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Registration')}>
        <Text style={{fontWeight: '700'}}>Registration</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textInput: {
    width: width - 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  loginBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  loginTxt: {
    color: '#fff',
    fontWeight: '600',
  },
});
