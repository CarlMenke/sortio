import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import StartScreen from './StartScreen';
import Home from './Home'
import BusinessPage from './BusinessPage';
import BusinessForm from '../forms/BusinessForm';
import MenuItemsPage from './MenuItemsPage';
import InventoryPage from './InventoryPage';
import InventoryItemForm from '../forms/InventoryItemForm';

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
              <BusinessPage/>
            )
          
          case 'createBusiness':
            return (
              <BusinessForm action="create"/>
            )

          case 'joinBusiness':
            return (
              <BusinessForm action="join"/>
            )

          case 'updateBusiness':
            return (
              <BusinessForm action="update"/>
            )

          case 'inventory':
            return (
              <InventoryPage/>
            )
          
          case 'menuItems':
            return (
              <MenuItemsPage/>
            )
          
          case 'createInventoryItem':
            return (
              <InventoryItemForm/>
            )
          
          case 'home':
            return(
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

