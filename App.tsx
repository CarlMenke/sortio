import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './components/navigation/Navigation';
import BottomBar from './components/navigation/BottomBar';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

function App(): JSX.Element {

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      flex:1,
      backgroundColor: "#f2f2f2"
    },
    statusBar: {
      flex:.075
    },
    navigation:{
      flex: .835,
    },
    bottomBar:{
      flex: .09,
      zIndex: -1,
  
    }
  });
  
  return (
    <Provider store = {store}>
      <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      accessible={false}>
        <View style={styles.container}>
          <View style={styles.statusBar}/>
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
