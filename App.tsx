import React, { FC, useEffect } from 'react';
import { Platform } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
//import SignIn from './screens/User/SignIn';
//import SignUp from './screens/User/SignUp';

const App: FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // NativeModules.SplashScreenModule.hide();
    }
  }, []);
  return <StackNavigation />;
};

export default App;
