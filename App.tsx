import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './components/Navigation';
import BottomBar from './components/BottomBar';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex:1
  },
  navigation:{
    flex: .9
  },
  bottomBar:{
    flex: .1
  }
});


function App(): JSX.Element {
  return (
    <Provider store = {store}>
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      accessible={false}>
        <View style={styles.container}>
          <View style={styles.navigation}>
            <Navigation/>
          </View>
          <View style={styles.bottomBar}>
            <BottomBar/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}

export default App;
