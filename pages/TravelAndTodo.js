import React, { useState } from 'react'
import { StyleSheet, View, Text,
  TouchableOpacity, TextInput,
} from 'react-native';
import { theme } from '../utils/colors';
import { StatusBar } from 'expo-status-bar';

export default function TravelAndTodo() {
  const [working, setWorking] = useState(true);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);



  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={work}>
          <Text style={{...styles.btnText, color: working ? '#fff' : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={0.5}
          onPress={travel}>
          <Text style={{...styles.btnText, color: working ? theme.gray : '#fff' }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input}
        placeholder={working ? 'Add a To do' : 'Where do you want to go?'}
        returnKeyType='send' 
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },  
  header : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  btnText : {
    fontSize : 38,
    fontWeight: 600,
  },
  input : {
    backgroundColor : '#fff',
    paddingVertical : 10,
    paddingHorizontal : 20,
    borderRadius : 30,
    marginTop : 20,
    fontSize : 18,
  }
});