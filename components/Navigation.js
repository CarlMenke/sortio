import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import StartScreen from './startScreen';
import Home from './home'

export default function Navigation() {

    const { isAuthenticated } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          width:"100%",
          height:"100%"
        },
    });

      if(isAuthenticated){
        return (
            <View style={styles.container}>
                <Home/>
            </View>
        )
      }else{
        return(
            <View style={styles.container}>
                <StartScreen/>
            </View>
        )
      }
}

