import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const Registration = props => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../assets/icons/logo.png')} />
      <TextInput
        style={styles.textInput}
        placeholder={'First Name '}
        value={firstname}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Last Name'}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.textInput}
        placeholder={'Mobile no.'}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.textInput}
        placeholder={'password'}
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={async () => {
          let data = {
            firstname,
            lastName,
            email,
            phone,
            password
          };
          if (
            firstname === '' ||
            lastName === '' ||
            email === '' ||
            phone === ''||
            password === ""
          ) {
            Alert.alert('Please enter all the fileds');
            return;
          }
          let userArray = await AsyncStorage.getItem('userData');

          let newData =
            JSON.parse(userArray) === null ? [] : JSON.parse(userArray);
          newData.push(data);
          console.log('newData', newData);
          let dataSave = JSON.stringify(newData);

          await AsyncStorage.setItem('userData', dataSave);
          Alert.alert('User Created successfully ');

          props.navigation.goBack();
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginTxt}>Submit </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Registration;

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
    width: width - 20,
  },
  loginTxt: {
    color: '#fff',
    fontWeight: '600',
  },
});
