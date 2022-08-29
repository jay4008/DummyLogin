import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const dummyData = [
  {
    name: 'Order history',
    image: require('../assets/icons/history.png'),
    point : true,
  },
  {
    name: 'Payment method',
    image: require('../assets/icons/payment.png'),
    point : true,
  },
  {
    name: 'Tracking',
    image: require('../assets/icons/web.png'),
    point : false,
  },
  {
    name: 'Statistics',
    image: require('../assets/icons/graph.png'),
    point : true,
  },

  {
    name: 'Statistics',
    image: require('../assets/icons/graph.png'),
    point : false,
  },
  {
    name: 'Settings',
    image: require('../assets/icons/setting.png'),   point : true,
  },
  {
    name: 'circle',
    image: require('../assets/icons/cir.png'),
    point : false,
  },
];
const DashBoard = props => {
  const [userData, setData] = useState({});
  const DataSet = async () => {
    let data = await AsyncStorage.getItem('currentUserData');
    console.log('data', JSON.parse(data));
    setData(JSON.parse(data));
  };
  useEffect(() => {
    DataSet();
  }, []);

  const getData = async() =>{
    let LogedUser =  await AsyncStorage.getItem('LogedUser');
    console.log("LogedUser", LogedUser);
   }

  const renderItem = ({item , index}) => {
    return (
      <TouchableOpacity
      onPress = {() => getData()}
        style={styles.flatlistContainer}>
          {
            item.point &&    <TouchableOpacity
            style={styles.floatingbadge}>
                <Text style={{color: '#fff'}}>1</Text>
          </TouchableOpacity>
          }
          <Image style = {{height : 80 , width : 80 , resizeMode :'contain'}} source = {item.image} />
          <Text>{item.name}</Text>
        </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Image
          style={styles.backImg}
          source={require('../assets/icons/back.png')}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image
            style={styles.cartImg}
            source={require('../assets/icons/cart.png')}
          />
          <Image
            style={styles.cartImg}
            source={require('../assets/icons/menu.png')}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '20%',
        }}>
        <Image
          style={styles.avtar}
          source={require('../assets/icons/avtar.png')}
        />
        <Text style={{marginLeft: 20}}>
          {userData?.firstname} {userData?.lastName}
        </Text>
      </View>

      <View
        style={styles.blueContainer}>
        <View
          style={{
            ...styles.box,
            marginLeft: 20,
          
            
          }}>
          <Text style={styles.headingTxt}>10%</Text>
          <Text style={styles.descTxt}>DISCOUNT</Text>
        </View>
        <View
          style={{
            ...styles.box
          }}>
          <Text style={styles.headingTxt}>10%</Text>
          <Text style={styles.descTxt}>DISCOUNT</Text>
          <TouchableOpacity
            style={styles.floatingbadge}>
            <Text style={{color: '#fff'}}>1</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginRight: 20,
          ...styles.box
          }}>
          <Text style={styles.headingTxt}>10%</Text>
          <Text style={styles.descTxt}>DISCOUNT</Text>
        </View>
      </View>
      <FlatList
        scrollEnabled={true}
        // style={{flex: 1}}
        style={{
          marginTop: -40,
          backgroundColor: '#fff',
          borderRadius: 25,
          height: height - 300,
        }}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        renderItem={renderItem}
        data={dummyData}
        ListFooterComponent={() => (
          <View style={{height: 200, backgroundColor: '#fff'}} />
        )}
      />
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  backImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  cartImg: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  avtar: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  headingTxt: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  descTxt: {
    fontSize: 12,
    color: 'blue',
    textAlign: 'center',
  },
  flatlistContainer :{
    borderRadius: 10,
    elevation: 6,
    marginVertical: 10,
    width: width / 2 - 30,
    height: width / 2 - 30,
    backgroundColor: '#fff',
    alignItems :'center',
    justifyContent :'center'
  },
  floatingbadge:{
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },blueContainer :{
    backgroundColor: 'blue',
    borderTopLeftRadius: 30,
    paddingBottom: 70,
    paddingTop: 20,
    marginTop: 40,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    flexDirection: 'row',
 
    justifyContent: 'space-between',
  },
  box :{
    width: width / 3 - 30,
    height: width / 3 - 30,
  
    backgroundColor: '#dbe9f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 10,
  }
});
