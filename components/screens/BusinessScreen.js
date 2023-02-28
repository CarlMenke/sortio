import { Text, View, TouchableOpacity } from 'react-native';
import { showInventory , showBusinessSettings, showMenuItems } from '../../navFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';


export default function BusinessScreen() {
    const { navState } = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))

    return (
        <View style={styles.businessScreen}>
            <Text style={styles.title}>{navState.business.businessName}</Text>
            <View style={styles.businessOptions}>
                <TouchableOpacity 
                style={styles.businessOption}                 
                onPress={()=>showInventory(navState, setNavStateAction, {})}>
                    <Text style={styles.businessOptionsTitle}>Inventory Items</Text>
                    <Text style={styles.businessOptionsDetails}>View and update your current inventory status, along with remove or add new items.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.businessOption}
                onPress={()=>showMenuItems(navState, setNavStateAction, {})}>
                    <Text style={styles.businessOptionsTitle}>Menu Items</Text> 
                    <Text style={styles.businessOptionsDetails}>Manage and view your existing menu items or create mew ones.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.businessOption}>
                    <Text style={styles.businessOptionsTitle}>Report Sales</Text>
                    <Text style={styles.businessOptionsDetails}>Report sales to automatically update your current inventory status.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.businessOption}
                onPress={()=>showBusinessSettings(navState, setNavStateAction, {updating: navState.business.businessName})}>
                    <Text style={styles.businessOptionsTitle}>Business Settings</Text>
                    <Text style={styles.businessOptionsDetails}>Manage permission and update business information. </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
