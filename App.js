import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider as PaperProvider} from 'react-native-paper';

import Root from './src';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    // '88699299948-gin65278dd6c9jv26m6ftg4hbb50r5u8.apps.googleusercontent.com',
    '88699299948-12g59oof5v4vhmvinu47k4bpomt0oclk.apps.googleusercontent.com',
});

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
