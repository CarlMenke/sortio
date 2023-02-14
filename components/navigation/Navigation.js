import { View } from 'react-native';
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
import BusinessSettingsScreen from '../screens/BusinessSettingsScreen';
import styles from '../style/styles';

export default function Navigation() {

    const { isAuthenticated } = useSelector(state => state.reducer)
    const { navState } = useSelector(state => state.reducer)

    if(isAuthenticated){
      switch (navState.screen) {
        case 'businessSettings':
          return(
            <BusinessSettingsScreen/>
          )
          
        case 'business':
          return (
            <BusinessScreen/>
          )
        
        case 'businessForm':
          return (
            <BusinessForm/>
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

