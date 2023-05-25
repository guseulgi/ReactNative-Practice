import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const { height: deviceHeight, width:deviceWidth } = Dimensions.get('window');

export default function App() {
  

  return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>Seoul</Text>
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
