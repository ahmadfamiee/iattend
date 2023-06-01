import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import color from '../themes';
import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ClockOut = ({navigation, route}) => {
  const [date, setDateTime] = useState();
  const showDate = () => {
    //Get Current Date
    var date = new Date().getDate();

    //Get Current Month
    var month = new Date().getMonth() + 1;

    //Get Current Year
    var year = new Date().getFullYear();

    //Get Current Time Hours
    var hours = new Date().getHours();

    //Get Current Time Minutes
    var min = new Date().getMinutes();

    //Get Current Time Seconds
    var sec = new Date().getSeconds();

    var finalMasa = hours + ':' + min + ':' + sec;

    setDateTime(finalMasa);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 75,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: color.lightred,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Assamualaikum Ahmad!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: color.beige,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 70,
        }}>
        <View>
          <Text
            style={{
              fontSize: 45,
              alignSelf: 'center',
              fontWeight: '400',
              color: 'black',
            }}>
            5:05 PM
          </Text>
          <Text
            style={{
              paddingBottom: 30,
              fontSize: 16,
              alignSelf: 'center',
              fontWeight: '400',
              color: 'grey',
            }}>
            Tuesday, 10 October
          </Text>
        </View>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />

        <TouchableOpacity onPress={() => navigation.navigate('ClockOut')}>
          <Image
            source={require('../assets/clockoutbutton.png')}
            style={{
              height: 220,
              width: 220,
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 20,
            fontSize: 30,
            fontStyle: 'inter',
            fontWeight: '500',
            color: color.black,
            alignSelf: 'center',
          }}>
          CLOCK OUT
        </Text>
        <View
          style={{
            height: 55,
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: 300,
            }}>
            <View style={{}}>
              <Image
                source={require('../assets/clockinicon.png')}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  paddingTop: 15,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                8:55 AM
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 13,
                  fontWeight: 'grey',
                  alignSelf: 'center',
                  color: 'grey',
                }}>
                Clock In
              </Text>
            </View>

            <View>
              <Image
                source={require('../assets/clockouticon.png')}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingTop: 15,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                5:05 PM
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 12,
                  alignSelf: 'center',
                  fontWeight: '400',
                  color: 'grey',
                }}>
                Clock Out
              </Text>
            </View>

            <View>
              <Image
                source={require('../assets/workinghouricon.png')}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingTop: 15,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                8H 10M
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 12,
                  alignSelf: 'center',
                  fontWeight: '400',
                  color: 'grey',
                }}>
                Working Hour
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ClockOut;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#1C95A6',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});
