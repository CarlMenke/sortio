import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './components/Navigation';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store = {store}>
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      accessible={false}>
        <View style={{flex:1}}>
          <Navigation/>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}

export default App;
