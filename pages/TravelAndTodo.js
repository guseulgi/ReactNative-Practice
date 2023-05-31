import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text,
  TouchableOpacity, TextInput, ScrollView, Pressable,
  Alert, ActivityIndicator,
} from 'react-native';
import { theme } from '../utils/colors';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Octicons } from '@expo/vector-icons';

const STORAGE_KEY = '@todos';
const TAB_KEY = '@tabs';
const btnSize = 22;

export default function TravelAndTodo() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState({});

  const travel = () => {
    setWorking(false);
    saveTabs(false);
  };
  const work = () => {
    setWorking(true);
    saveTabs(true);
  };

  useEffect(() => {
    loadTodos();
    loadTabs();
  }, []);

  const onChangeText = (payload) => {
    setText(payload);
  }

  const saveTodos = async (val) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch(err) {
      throw err;
    }
  }

  const removeTodos = async (key) => {
    try {
      Alert.alert('✔️ 안내', `정말로 '${todos[key].text}' 내용을 삭제하시겠습니까?`, [
        {
          text: '취소',
          style: 'cancel',
        },
        { 
          text: '삭제', 
          onPress: async () => {
            Reflect.deleteProperty(todos, key);
            await saveTodos(todos);
            loadTodos();
          },
          style: 'destructive'
        }
      ]);
    } catch(err) {
      throw err;
    }
  }

  const saveTabs = async () => {
    try {
      const result = JSON.stringify(working);
      await AsyncStorage.setItem(TAB_KEY, result);
    } catch (err) {
      throw err;
    }
  }

  const loadTabs = async () => {
    try {
      const result = await AsyncStorage.getItem(TAB_KEY);
      result !== null ? setWorking(JSON.parse(result)) : null;
    } catch (err) {

    }
  }
  
  const loadTodos = async () => {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEY);
      if (result) {
        const data = JSON.parse(result);
        data !== null ? setTodos(data) : null;
      }
    } catch (err) {
      throw err;
    }
  }

  const addTodo = async () => {
    if (text === '') return;

    const newTodos = { 
      ...todos,
      [Date.now()] : {
        text,
        working,
        done : false,
      }
    };

    setTodos(newTodos);
    await saveTodos(newTodos);
    setText('');
  }

  const doneTodo = async (key) => {
    const changeDone = {
      ...todos,
      [key] : {
        ...todos[key],
        done : !todos[key].done,
      },
    }

    setTodos(changeDone);
    await saveTodos(changeDone);
  }

  const modifyTodoBtn = async (key) => {
    try {
      Alert.prompt('수정 안내', '수정하실 내용을 입력해주세요.', [
        {
          text : '취소',
          style: 'cancel'
        },
        {
          text: '수정',
          style:'destructive',
          onPress: async (txt) => {
            const modifyingTodo = {
              ...todos,
              [key] : {
                ...todos[key],
                text : txt,
              }
            }

            setTodos(modifyingTodo);
            await saveTodos(modifyingTodo);
          }
        }
      ],
      {
        cancelable : true,
      });
    } catch(err) {
      throw err;
    }
  }

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
        value={text}
        returnKeyType='send'
        onSubmitEditing={addTodo} 
        onChangeText={onChangeText}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        {todos === {} 
          ? <ActivityIndicator size='large' color='white' style={{ marginTop: 70, }}/> 
          : Object.keys(todos).map((el) => {
          return (
            todos[el].working === working ?
              <View 
                key={el}
                style={{
                  ...styles.todo,
                  backgroundColor : todos[el].done ? theme.doneBg : theme.todoBg,
                }} 
              >
                <Text style={styles.todoText}>
                  {todos[el].text}
                </Text>
                <View style={styles.btns}>
                  <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => doneTodo(el)}
                    activeOpacity={0.6}
                  >
                    <AntDesign name="checkcircleo" size={btnSize} 
                      color={todos[el].done ? theme.notDoneBtn : theme.doneBtn} />
                  </TouchableOpacity>
                  {todos[el].done ? null 
                    : <TouchableOpacity
                      style={styles.btn}
                      onPress={() => modifyTodoBtn(el)}
                      activeOpacity={0.6}>
                    <Octicons name="pencil" size={btnSize} color="white" />
                  </TouchableOpacity>}
                  <TouchableOpacity
                    style={styles.btn} 
                    onPress={() => removeTodos(el)}
                    activeOpacity={0.6}
                  >
                    <AntDesign name="delete" size={btnSize} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            : null
          );
        })}
      </ScrollView>
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
    marginTop: 100,
  },
  btnText : {
    fontSize : 38,
    fontWeight: 600,
  },
  input : {
    backgroundColor : '#fff',
    paddingVertical : 15,
    paddingHorizontal : 20,
    borderRadius : 30,
    marginTop : 45,
    fontSize : 18,
    marginVertical: 40,
  },
  todo : {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    flex : 1,
    marginBottom: 15,
    paddingVertical : 15,
    paddingHorizontal: 18,
    borderRadius : 15,
  },
  todoText : {
    flex : 8,
    color: 'white',
    fontSize : 18,
    fontWeight: 400,
    marginRight: 10,
  },
  btns : {
    flexDirection : 'row',
    flex : 3,
    justifyContent : 'flex-end',
  },
  btn : {
    marginLeft: 10,
  }
});