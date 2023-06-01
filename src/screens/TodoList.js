import React, {useState} from 'react';
import color from '../themes';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ToastAndroid,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import TaskInputField from '../components/TaskInputField';
import TaskItem from '../components/TaskItem';
import {fonts} from '../fonts';

const Location = ({navigation}) => {
  const user = auth().currentUser;
  const [tasks, setTasks] = useState([]);

  const addTask = task => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  };

  const deleteTask = deleteIndex => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
    ToastAndroid.show('List Deleted', ToastAndroid.SHORT);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 75,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: color.brown,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Hello, {user?.displayName} 👋
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: color.beige,
        }}>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: color.beige,
          }}>
          <Text
            style={{
              color: color.ash,
              fontSize: 19,
              fontFamily: fonts.primary.bold,
              marginTop: 30,
              marginBottom: 10,
              textAlign: 'center',
            }}>
            Anything you need to do?
          </Text>
          <ScrollView>
            {tasks.map((task, index) => {
              return (
                <View key={index} style={{marginTop: 20}}>
                  <TaskItem
                    index={index + 1}
                    task={task}
                    deleteTask={() => deleteTask(index)}
                  />
                </View>
              );
            })}
          </ScrollView>
          <TaskInputField addTask={addTask} />
        </View>
      </View>
    </View>
  );
};

export default Location;
