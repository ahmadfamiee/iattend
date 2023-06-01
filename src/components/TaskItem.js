import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../themes';
export default TaskItem = props => {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
      <View
        style={{
          backgroundColor: color.offwhite,
          borderRadius: 12,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
          elevation: 4,
          bottom: 7,
        }}>
        <Text
          style={{
            color: color.grey,
            fontSize: 20,
          }}>
          {props.index}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: color.offwhite,
          borderRadius: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 10,
          elevation: 4,
          bottom: 7,
        }}>
        <Text style={{color: color.grey, width: '90%', fontSize: 16}}>
          {props.task}
        </Text>
        <TouchableOpacity onPress={() => props.deleteTask()}>
          <Icon
            style={{marginLeft: 8}}
            name="delete"
            size={19}
            color={color.lightred}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
