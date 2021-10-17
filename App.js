import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Albums, Photos, Details } from './app/screens'
import store from './app/redux/store'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();

const App = () => {
  SplashScreen.hide()
  return (
    <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Photos" component={Photos} />
          <Stack.Screen name="Details" component={Details} />   

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
