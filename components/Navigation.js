import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import StartScreen from './startScreen';
import Home from './home'
import BusinessPage from './businessPage';
import BusinessForm from '../forms/business';

export default function Navigation() {

    const { isAuthenticated } = useSelector(state => state.reducer)
    const { navState } = useSelector(state => state.reducer)

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
        switch (navState.screen) {

          case 'business':
            return (
              <BusinessPage business = {navState.payload}/>
            )
          
          case 'businessForm':
            return (
              <BusinessForm/>
            )

          case 'home':
            return (
              <Home/>
            )
          
          default:
            return (
              <Home/>
            )
        }
      }else{
        return(
            <View style={styles.container}>
                <StartScreen/>
            </View>
        )
      }
}

