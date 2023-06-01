import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import color from '../themes';
import {Navigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {fonts} from '../fonts';
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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePass, setVisiblePass] = useState(true);

  const image = require('../assets/bgtest2.png');

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(user.idToken); // get google credential
      const firebaseUserCredential = await auth().signInWithCredential(
        // inject user credential to firebase for listening to user state changes
        googleCredential,
      );

      console.log('firebaseUserCredential', firebaseUserCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground source={image} style={{flex: 1, resizeMode: 'cover'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />
        <View
          style={{
            marginTop: '10%',
            marginBottom: '20%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 59,
              fontFamily: fonts.primary.yes,
              color: color.brown,
              marginBottom: -10,
            }}>
            iAttend
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 16,
              width: 340,
              fontFamily: fonts.primary.yes,
              color: color.grey,
            }}>
            Simplify the attendance process with paperless application method
          </Text>
        </View>
        <View
          style={{
            marginBottom: '20%',
          }}>
          <Image
            source={require('../assets/tuxurilogo.png')}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>

        <View
          style={{
            marginTop: '5%',
            width: '100%',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}>
          <View>
            <TouchableOpacity
              onPress={_signIn}
              style={{
                width: '80%',
                borderRadius: 90,
                height: 65,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: color.brown,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                SIGN IN WITH
              </Text>
              <Image
                source={require('../assets/icons/google.png')}
                style={{
                  resizeMode: 'contain',
                  height: 25,
                  width: 25,
                  marginLeft: '5%',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '25%',
              }}></View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
