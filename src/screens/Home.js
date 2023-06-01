import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import color from '../themes';

import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {format} from 'date-fns';
import dayjs from 'dayjs';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fonts} from '../fonts';
import {Subheading} from 'react-native-paper';

const Home = ({navigation, route}) => {
  const [time, setTime] = useState(dayjs());

  const [text, setText] = useState('CLOCK IN');
  const onPressHandler = event => setText('CLOCK OUT');

  //   useEffect(() => {
  //     if (route.params?.username) {
  //       console.log('Sent successfully.');
  //     }
  //   }, [route.params?.username]);

  const user = auth().currentUser;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000 * 1);

    return () => clearInterval(interval);
  }, []);

  const twoOptionAlert = () => {
    Alert.alert(
      'Hello there!',
      'Are you sure to Clock your time now?',
      [
        {
          text: 'Yes',
          onPress: () => showDate(),
        },

        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const [clockIn, setClockIn] = useState('');
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOut, setClockOut] = useState('');
  const [clockOutTime, setClockOutTime] = useState(null);

  const [workingHour, setWorkingHour] = useState((clockOut - clockIn) / 60);

  const calculateTotal = () => {
    setWorkingHour(clockOut - clockIn);

    let dif = clockOutTime - clockInTime;

    const workHours = Math.round(Math.abs(dif / 1000 / 60));

    ToastAndroid.show('Total Minutes Calculated', ToastAndroid.SHORT);

    setWorkingHour(workHours);
  };

  const showDate = () => {
    if (clockIn.length > 0) {
      const now = new Date();
      const hours = new Date().getHours();

      //Get Current Time Minutes
      const min = new Date().getMinutes();

      //   //Get Current Time Seconds
      //   const sec = new Date().getSeconds();

      const finalMasa = hours + ':' + min;

      setClockOut(finalMasa);
      setClockOutTime(now);
    } else {
      const now = new Date();
      const hours = new Date().getHours();

      //Get Current Time Minutes
      const min = new Date().getMinutes();

      //   //Get Current Time Seconds
      //   const sec = new Date().getSeconds();

      const finalMasa = hours + ':' + min;

      setClockIn(finalMasa);
      setClockInTime(now);
    }
  };

  const submit = async () => {
    try {
      let response = await fetch('http://10.3.0.197/applyWork.php', {
        method: 'POST',
        body: JSON.stringify({
          time: workingHour,
          clock_in: clockInTime,
          clock_out: clockOutTime,
          date: format(new Date(), 'yyyy-MM-dd'),
        }),
      });
      if (response.status === 200) {
        console.log('hooray');
        ToastAndroid.show('Your Attendance Submitted!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 75,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: clockIn.length === 0 ? color.hijo : color.tuxuri,
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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{marginTop: '8%', marginBottom: '6%'}}>
          <Text
            style={{
              fontSize: 50,
              alignSelf: 'center',
              fontWeight: '400',
              color: 'black',
            }}>
            {time.format('h:mm A')}
          </Text>
          <Text
            style={{
              fontSize: 16,
              alignSelf: 'center',
              fontWeight: '400',
              color: 'grey',
            }}>
            {time.format('dddd, DD MMMM')}
          </Text>
        </View>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />
        <View
          style={{
            elevation: 14,
            borderRadius: 98,
          }}>
          <TouchableOpacity
            onPress={() => {
              twoOptionAlert();
              onPressHandler();
            }}
            activeOpacity={0.6}>
            <Image
              source={require('../assets/moos.png')}
              style={{
                height: 220,
                width: 220,
                resizeMode: 'cover',
                borderRadius: 150,
                overflow: 'hidden',
                backgroundColor: clockIn.length === 0 ? color.c2 : color.pekat,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 20,
            fontSize: 33,
            fontFamily: fonts.primary.yes,
            color: color.black,
            alignSelf: 'center',
            textShadowOffset: {height: 2, width: 2},
            textShadowColor: color.beige,
            textShadowRadius: 10,
          }}>
          {text}
        </Text>
        <View
          style={{
            height: 55,
            marginTop: 20,
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
            <View>
              <Icon
                name="clock-time-four"
                color={color.c2}
                size={38}
                style={{
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  paddingTop: 12,
                  fontSize: 17,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {clockIn}
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 13,
                  fontWeight: 'grey',
                  alignSelf: 'center',
                  color: 'grey',
                }}>
                Clock In at
              </Text>
            </View>

            <View>
              <Icon
                name="clock-time-four"
                color={color.pekat}
                size={38}
                style={{
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingTop: 12,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {clockOut}
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 13,
                  alignSelf: 'center',
                  fontWeight: '400',
                  color: 'grey',
                }}>
                Clock Out at
              </Text>
            </View>

            <View>
              <Icon
                name="clock-time-four"
                color={color.beje}
                size={38}
                style={{
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  paddingTop: 12,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {workingHour} M
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 13,
                  alignSelf: 'center',
                  fontWeight: '400',
                  color: 'grey',
                }}>
                Total Minutes
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '13%',
            marginBottom: '10%',
          }}>
          <TouchableOpacity
            onPress={() => calculateTotal()}
            style={{
              width: '40%',
              height: 50,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.beje,
              marginRight: '3%',
              elevation: 5,
            }}>
            <Subheading
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '700',
              }}>
              Total Minutes
            </Subheading>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => submit()}
            style={{
              width: '40%',
              height: 50,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.beje,
              elevation: 5,
            }}>
            <Subheading
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Submit
            </Subheading>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
