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
            <View style={styles.navigationView}>
              <BusinessSettingsScreen/>
            </View>
          )
          
        case 'business':
          return (
            <View style={styles.navigationView}>
              <BusinessScreen/>
            </View>
          )
        
        case 'businessForm':
          return (
            <View style={styles.navigationView}>
              <BusinessForm/>
            </View>
          )
        
        case 'menuItems':
          return (
            <View style={styles.navigationView}>
              <MenuItemsScreen />
            </View>
          )
        
        case 'menuItemForm':
          return(
            <View style={styles.navigationView}>
              <MenuItemForm/>
            </View>
          )
        
        case 'menuItemDetail':
          return(
            <View style={styles.navigationView}>
              <MenuItemDetailsScreen menuItem={navState.payload}/>
            </View>
          )

        case 'inventory':
          if("autoFillMenuItem" in navState.options){
            return (
              <View style={styles.navigationView}>
              <InventoryScreen onPressHandler={navState.options.autoFillMenuItem}/>
              </View>
            )
          }
          return (
            <View style={styles.navigationView}>
              <InventoryScreen/>
            </View>
          )

        case 'inventoryItemDetail':
          return(
            <View style={styles.navigationView}>
              <InventoryItemDetailsScreen />
            </View>
          )
          
        case 'inventoryItemForm':
          return (
            <View style={styles.navigationView}>
              <InventoryItemForm/>
            </View>
          )
        
        case "settings":
          return(
            <View style={styles.navigationView}>
              <SettingsScreen/>
            </View>
          )
          
        case 'home':
          return(
            <View style={styles.navigationView}>
              <HomeScreen/>   
            </View>
          )

        default:
          return (
            <View style={styles.navigationView}>
              <HomeScreen/>
            </View>
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

