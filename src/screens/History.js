import React, {useEffect, useState} from 'react';
import {Agenda} from 'react-native-calendars';
import color from '../themes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {format} from 'date-fns';
import {Paragraph, Subheading} from 'react-native-paper';

const History = ({navigation, route}) => {
  const [date, setDateTime] = useState();

  const [attList, setAttList] = useState([]);

  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;

  //   useRoute(() => {
  //     if (route.params?.username) {
  //       console.log('Sent successfully.');
  //     }
  //   }, [route.params?.username]);

  const [data, setData] = useState({});

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function fetch() {
        await fetchHistory();
        setLoading(false);
      }

      fetch();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const fetchHistory = async () => {
    try {
      let response = await fetch('http://10.3.0.197/viewWork.php', {});

      if (response.status === 200) {
        let data = await response.json();
        let empty = {};
        for (let i = 0; i < data.length; i++) {
          let item = data[i];

          let object = {
            [String(item.date)]: [
              {
                name: item.time,
              },
            ],
          };

          let copy = {...empty};

          empty = Object.assign(copy, object);
        }

        setData(empty);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     let empty = {};
  //     let now = new Date();

  //     for (let i = 0; i < 6; i++) {
  //       let nextDay = new Date(now.getTime());

  //       nextDay.setDate(now.getDate() + i);

  //       let formatedDate = format(nextDay, 'yyyy-MM-dd');

  //       let object = {
  //         [String(formatedDate)]: [
  //           {
  //             name: 'Total Minute: ',
  //           },
  //         ],
  //         // [String(formatedDate)]: [
  //         //   {
  //         //     name: 'ClockOut: ',
  //         //   },
  //         // ],
  //       };

  //       console.log(object);

  //       let copy = {...empty};

  //       empty = Object.assign(copy, object);
  //     }

  //     // console.log('empty', empty);

  //     setData(empty);
  //   }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 75,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: color.lightblue,
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
          backgroundColor: color.beige,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Agenda
          items={data}
          selected={format(new Date(), 'yyyy-MM-dd')}
          renderItem={(reservation, isFirst) => {
            const color = isFirst ? 'black' : '#43515c';

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  {
                    height: 10,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Paragraph style={{color, letterSpacing: 1.5}}>
                  Duration : {reservation.name} minutes
                  {/* {reservation.clock_in} to {reservation.clock_out} */}
                </Paragraph>
              </TouchableOpacity>
            );
          }}
          renderEmptyDate={() => {
            return (
              <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
              </View>
            );
          }}
          rowHasChanged={(r1, r2) => {
            return r1.name !== r2.name;
          }}
          showClosingKnob={true}
        />
        {/* <Agenda
          //   theme={{
          //     calendarBackground: color.offwhite,
          //     selectedDayBackgroundColor: color.tuxuri,
          //     dayTextColor: color.white,
          //     agendaKnobColor: color.blue,
          //     agendaTodayColor: color.pekat,
          //     monthTextColor: color.tuxuri,
          //     agendaDayTextColor: color.grey,
          //     agendaDayNumColor: color.grey,
          //     dayTextColor: color.darkgrey,
          //     dotColor: color.blue,
          //   }}
          selected="2023-01-27"
          items={data}
          renderList={listProps => {
            console.log(listProps);
            return <View></View>;
          }}
          renderDay={(date, item) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: color.blue,
                  flex: 1,
                  justifyContent: 'center',
                  padding: 10,
                  width: '100%',
                  margin: 10,
                }}>
                <Text style={{color: color.white, fontSize: 18}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          renderEmptyData={() => {
            return <View />;
          }}
        /> */}
      </View>
    </View>
  );
};

export default History;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
