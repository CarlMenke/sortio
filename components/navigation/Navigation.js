import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import StartScreen from '../screens/StartScreen';
import HomeScreen from '../screens/HomeScreen'
import BusinessScreen from '../screens/BusinessScreen';
import BusinessForm from '../forms/BusinessForm';
import MenuItemsScreen from '../screens/MenuItemsScreen';
import InventoryScreen from '../screens/InventoryScreen';
import MenuItemForm from '../forms/MenuItemForm';
import InventoryItemForm from '../forms/InventoryItemForm';
import InventoryItemDetailsScreen from '../screens/InventoryItemDetailsScreen'
import MenuItemDetailsScreen from '../screens/MenuItemDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
            <BusinessScreen/>
          )
        
        case 'businessForm':
          return (
            <BusinessForm action="create"/>
          )
        
        case 'menuItems':
          return (
            <MenuItemsScreen />
          )
        
        case 'menuItemForm':
          return(
            <MenuItemForm/>
          )
        
        case 'menuItemDetail':
          return(
            <MenuItemDetailsScreen menuItem={navState.payload}/>
          )

        case 'inventory':
          if("autoFillMenuItem" in navState.options){
            return <InventoryScreen onPressHandler={navState.options.autoFillMenuItem}/> 
          }
          return (
            <InventoryScreen/>
          )

        case 'inventoryItemDetail':
          return(
            <InventoryItemDetailsScreen />
          )
          
        case 'inventoryItemForm':
          return (
            <InventoryItemForm/>
          )
        
        case "settings":
          return(
            <SettingsScreen/>
          )
          
        case 'home':
          return(
            <HomeScreen/>   
          )

        default:
          return (
            <HomeScreen/>
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

