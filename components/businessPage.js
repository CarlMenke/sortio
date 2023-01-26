import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect  } from 'react';
import { setNavState } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessDetails } from '../firebaseFunctions'
import IngredientForm from '../forms/IngredientForm'


export default function BusinessPage() {

    const [businessDetails, setBusinessDetails] = useState({})
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const helper = async () =>{
        const response  = await getBusinessDetails(navState.payload)
        response.status? setBusinessDetails(response.data) : console.log(response.data)
    }

    useEffect(()=> {
        if(navState.screen === 'business'){
            helper()
        }
    },[navState])


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

    const showInventory = () => {
        setNavStateAction({
            screen : "inventory",
            payload : businessDetails
        })
    }

    const showMenuItems = () => {
        setNavStateAction({
            screen : "menuItems",
            payload : businessDetails
        })
    }

    const updateBusiness = () => {
        setNavStateAction({
            screen : 'updateBusiness',
            payload : businessDetails
        })
    }

    // you will need a get business information firebase function here inside of a use effect 

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
            <IngredientForm/>
        </View>
    )
}
