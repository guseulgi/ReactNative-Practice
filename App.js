import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons'; 

const { height: deviceHeight, width:deviceWidth } = Dimensions.get('window');
const API_KEY = 'ff321907d5efa254723d69e647d2398f';

const icons = {
  "Clouds" : 'cloudy',
  'Clear' : 'day-sunny',
  'Rain' : 'rains',
  'Wind' : 'wind',
  'Snow' : 'snow',
  'Thunderstorm' : 'lighting',
  'Drizzle' : 'rain',
  'Atmosphere' : 'cloudy-gusts',
}

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

      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      const json = await response.json();

      setDays(json.list);
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
            {days.length === 0 
              ? (<View style={{...styles.day, alignItems : 'center'}}>
                  <ActivityIndicator size="large"/>
                </View>)
              : days.map((el, idx) => {
                return (
                  <View style={styles.day} key={idx}>
                    <View style={styles.tempContainer}>
                      <Text style={styles.temp}>{el.main.temp.toFixed(1)}</Text>
                      <Fontisto name={icons[el.weather[0].main]} style={styles.icon} size={64} color="black" />
                    </View>
                    <Text style={styles.description}>{el.weather[0].main}</Text>
                  </View>
                );
              }
            )}
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
    marginLeft : 2,
  },
  tempContainer : {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  temp : {
    fontSize: 90,
    fontWeight: 600,
  },
  icon : {
    marginLeft: 10,
  },
  description: {
    fontSize: 22,
    marginTop: -10,
    marginLeft: 10,
  },
});
