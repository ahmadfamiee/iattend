import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../fonts';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../themes';
export default TaskInputField = props => {
  const [task, setTask] = useState();

  const handleAddTask = value => {
    props.addTask(value);
    setTask(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{
        borderColor: color.white,
        backgroundColor: color.ash,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 23,
      }}>
      <TextInput
        style={{
          color: color.white,
          height: 60,
          flex: 1,
          paddingLeft: 10,
          fontFamily: fonts.primary.yes,
        }}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder={'Write a task here'}
        placeholderTextColor={color.white}
      />
      <TouchableOpacity onPress={() => handleAddTask(task)}>
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 5,
            marginRight: 4,
            backgroundColor: color.brown,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
          }}>
          <Icon name="plus-box" size={35} color={color.white} />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
