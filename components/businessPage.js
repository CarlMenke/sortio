import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect  } from 'react';
import { setNavState } from '../redux/actions';
import {  getBusinessDetails } from '../firebaseFunctions'
import { useDispatch, useSelector } from 'react-redux';
import InventoryItemForm from '../forms/InventoryItemForm'


export default function BusinessPage() {

    const { navState } = useSelector(state => state.reducer)
    const [businessDetails, setBusinessDetails] = useState(navState.payload)
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

    const showInventory = async () => {
        const response  = await getBusinessDetails(businessDetails.businessName)
        setNavStateAction({
            screen : "inventory",
            payload : response.data
        })
    }

    const showMenuItems = async () => {
        const response  = await getBusinessDetails(businessDetails.businessName)
        setNavStateAction({
            screen : "menuItems",
            payload : response.data
        })
    }

    const updateBusiness = async () => {
        const response  = await getBusinessDetails(businessDetails.businessName)
        setNavStateAction({
            screen : 'updateBusiness',
            payload : response.data
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.businessName}>{businessDetails.businessName}</Text>
            <View style={styles.inventory}>
                <Button
                title="Inventory"
                onPress={showInventory}/>
            </View>
            <View style={styles.menuItems}>
                <Button
                title="Menu Items"
                onPress={showMenuItems}/>
            </View>
            <View style={styles.businessSettings}>
                <Button
                title="Business Settings"
                onPress={updateBusiness}/>
            </View>
            <InventoryItemForm/>
        </View>
    )
}
