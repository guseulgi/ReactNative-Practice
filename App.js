import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';


const { height: deviceHeight, width:deviceWidth } = Dimensions.get('window');

export default function App() {
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");

  const getWeahter = async() => {
    try {
      const {granted} = await Location.requestForegroundPermissionsAsync();

      // 권한을 받지 못했을 때
      if(!granted) {
        setOk(false);
      }
  
      // 권한을 성공적으로 받으면
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 3 });
  
      const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
      setCity(location[0].city);
    } catch (err ) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWeahter();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView 
          pagingEnabled
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#abdbe3',
  },
  city : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName : {
    color: 'black',
    fontSize: 36,
    fontWeight: '600',
  },
  weather : {
  },
  day : {
    width : deviceWidth,
    alignItems: 'center',
  },
  temp : {
    fontSize: 120,
    fontWeight: 600,
    marginTop : 50,
  },
  description: {
    fontSize: 30,
    marginTop: -10,
  },
});
