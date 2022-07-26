import React, { FC, useEffect } from 'react';
import { Platform } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

const App: FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // NativeModules.SplashScreenModule.hide();
    }
  }, []);
  return <StackNavigation />;
};

export default App;
