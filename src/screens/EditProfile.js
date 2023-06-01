import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import color from '../themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function EditProfile({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const update = () => {
    navigation.navigate({
      name: 'Profile',
      params: {name: name},
      merge: true,
    });
    ToastAndroid.show('Changes Updated!', ToastAndroid.SHORT);
  };

  const openGallery = () => {
    console.log('hello');
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      includeBase64: true,
    };
    console.log('email', email);
  };
  const [filePath, setFilePath] = useState({});
  const user = auth().currentUser;

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, // Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
        } else {
          const data = response.assets[0];
          setFilePath(data);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
      } else {
        const data = response.assets[0];
        setFilePath(data);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  return (
    <View contentContainerStyle={{flex: 1}}>
      <KeyboardAwareScrollView>
        <StatusBar backgroundColor={color.beige} barStyle="dark-content" />

        <View
          style={{
            flex: 1,
            backgroundColor: color.beige,
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <View style={{margin: -5}}>
              <View style={styles.squreStyle}>
                <View
                  style={{
                    backgroundColor: color.beige,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: '20%',
                    borderRadius: 90,
                  }}>
                  <Image
                    source={{uri: user?.photoURL}}
                    style={{
                      height: 140,
                      width: 140,
                      borderRadius: 80,

                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
              <View style={styles.arcStyle} />
            </View>
          </View>
          <View style={{marginTop: '25%', paddingLeft: 20, paddingRight: 20}}>
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 5,
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'inter',
                color: color.pele,
              }}>
              USERNAME
            </Text>
            <View
              style={{
                paddingLeft: '5%',
                paddingRight: '-5%',
                backgroundColor: color.lightgrey,
                borderRadius: 10,
                marginBottom: '8%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: '85%',
                  height: 55,
                  color: 'black',
                }}
                placeholder="ahmadfahmiee"
                selectionColor={color.brown}
                fontWeight="500"
                placeholderTextColor="grey"
                value={name}
                onChangeText={text => setName(text)}
              />
              <Icon name="rename-box" color={color.pele} size={27} />
            </View>
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 5,
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'inter',
                color: color.pele,
              }}>
              PHONE NUMBER
            </Text>
            <View
              style={{
                paddingLeft: '5%',
                paddingRight: '-5%',
                backgroundColor: color.lightgrey,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 0,
              }}>
              <TextInput
                style={{
                  width: '85%',
                  height: 55,
                  color: 'black',
                }}
                placeholder="013-6419280"
                selectionColor={color.blue}
                fontWeight="500"
                placeholderTextColor="grey"
                value={phonenumber}
                onChangeText={text => setPhonenumber(text)}
              />
              <Icon name="phone-settings" color={color.pele} size={27} />
            </View>
          </View>

          <TouchableOpacity
            onPress={update}
            style={{
              width: '35%',
              marginBottom: '7%',
              marginTop: '38%',
              borderRadius: 35,
              height: 45,
              alignItems: 'center',
              justifyContent: 'space-around',
              alignSelf: 'center',
              backgroundColor: color.brown,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'white',
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default EditProfile;

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
