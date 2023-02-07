import { StyleSheet, Text, View, Button } from 'react-native';
import { showInventory , showUpdateBusiness, showMenuItems } from '../../navFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';


export default function BusinessScreen() {
    const { navState } = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))

    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.businessName}>{navState.payload.businessName}</Text>
            <View style={styles.inventory}>
                <Button
                title="Inventory"
                onPress={()=>showInventory(navState, setNavStateAction)}/>
            </View>
            <View style={styles.menuItems}>
                <Button
                title="Menu Items"
                onPress={()=>showMenuItems(navState, setNavStateAction)}/>
            </View>
            <View>
                <Button
                title="Report Sales"/>
            </View>
            <View style={styles.businessSettings}>
                <Button
                title="Business Settings"
                onPress={()=>showUpdateBusiness(navState, setNavStateAction)}/>
            </View>
        </View>
    )
}