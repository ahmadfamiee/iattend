import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import color from '../themes';
import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    // '88699299948-gin65278dd6c9jv26m6ftg4hbb50r5u8.apps.googleusercontent.com',
    '88699299948-12g59oof5v4vhmvinu47k4bpomt0oclk.apps.googleusercontent.com',
});

const Profile = ({navigation, route}) => {
  const user = auth().currentUser;
  const [name, setName] = useState('');

  useEffect(() => {
    if (route.params?.name) {
      console.log('Sent successfully.');
    }
  }, [route.params?.name]);

  const logout = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();

      console.log('isSignedIn', isSignedIn);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <StatusBar backgroundColor={color.beige} barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          backgroundColor: color.beige,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1}}>
          <View style={{margin: -5}}>
            <View contentContainerStyle={{flex: 1}}>
              <View style={styles.squreStyle}>
                <Image
                  source={{uri: user?.photoURL}}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 75,
                    justifyContent: 'center',
                    marginTop: 40,
                    alignSelf: 'center',
                    resizeMode: 'cover',
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: 'white',
                    alignSelf: 'center',
                    paddingTop: 14,
                  }}>
                  {user?.displayName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'white',
                    alignSelf: 'center',
                    paddingTop: 5,
                  }}>
                  {user?.email}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditProfile')}
                  style={{
                    width: '25%',
                    marginTop: 15,
                    borderRadius: 25,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    backgroundColor: color.neutral,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      color: 'white',
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.arcStyle} />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 120}}>
          <Text
            style={{
              marginBottom: 2,
              marginLeft: 65,
              fontSize: 14,
              fontWeight: '700',
              fontStyle: 'inter',
              color: color.pele,
            }}>
            USERNAME
          </Text>
          <View
            style={{
              backgroundColor: 'transparent',
              marginBottom: '7%',
              paddingRight: 10,
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              style={{
                width: 280,
                height: 45,
                fontSize: 18,
                fontWeight: '600',
                color: color.pekat,
                backgroundColor: 'transparent',
              }}
              placeholder={name}
              value={name}
              placeholderTextColor={color.darkpale}
            />
          </View>
          <Text
            style={{
              marginBottom: 2,
              marginLeft: 65,
              fontSize: 14,
              fontWeight: '700',
              fontStyle: 'inter',
              color: color.pele,
            }}>
            PHONE NUMBER
          </Text>
          <View
            style={{
              backgroundColor: 'transparent',
              paddingRight: 10,
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              style={{
                width: 280,
                height: 45,
                fontSize: 18,
                fontWeight: '600',
                color: 'black',
                backgroundColor: 'transparent',
              }}
              placeholder="013-6419280"
              editable={false}
              placeholderTextColor={color.darkpale}
            />
          </View>
        </View>
        <View
          backgroundColor={color.beige}
          style={{
            marginBottom: 35,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => logout()}
            style={{
              width: '60%',
              borderRadius: 55,
              height: 55,
              justifyContent: 'space-around',
              backgroundColor: color.brown,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
                alignSelf: 'center',
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  squreStyle: {
    width: '100%',
    height: 270,
    borderRadius: 12,
    backgroundColor: color.darkbeige,
    zIndex: 1,
  },
  arcStyle: {
    width: '20%',
    height: 70,
    position: 'absolute',
    bottom: -40,
    left: '40%',
    borderRadius: 35,
    backgroundColor: color.darkbeige,
    transform: [{scaleX: 5}, {scaleY: 1}],
  },
});
