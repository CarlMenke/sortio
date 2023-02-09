import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../firebaseFunctions'
const convert = require('convert-units')
import { setNavState } from '../../redux/actions';
import { addToMenuItem } from '../../firebaseFunctions'
import { showInventory } from '../../navFunctions'

export default function InventoryItemForm() {
    const [inventoryItemName, setIventoryItemName] = useState("")
    const [amountValue, setAmountValue] = useState(null)
    const [amountUnit, setAmountUnit] = useState(null)
    const [open, setOpen] = useState(false);
    const [unitArray , setUnitArray] = useState([{label:'grams', value:'grams'}, {label:'ounces', value:'ounces'}, {label:'pounds', value:'pounds'}])
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
            flex:.3,
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    const submitCreate = async () => {
        const response = await createIngredient(inventoryItemName, amountValue, amountUnit, [], navState.business.businessName)
        if(response.status){
            console.log(response.data)
            showInventory(navState, setNavStateAction)
        }else{
            console.log(response.data)
        }
    }

    return (
        <View style={styles.container}>
            <Text>New Inventory Item:</Text>
            <View>
                <Text>Item Name: </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setIventoryItemName}
                    value={inventoryItemName}
                    placeholder="Ingredient Name"/>
            </View>

            <View>
                <Text>How much do you have: </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setAmountValue}
                    value={amountValue}
                    keyboardType='numeric'
                    placeholder="quantity"/>
                <DropDownPicker
                    title="Unit"
                    open={open}
                    value={amountUnit}
                    items={unitArray}
                    setOpen={setOpen}
                    setValue={setAmountUnit}
                    setItems={setUnitArray}/>
            </View>
            <View>
                <Button
                    style={styles.button}
                    onPress={submitCreate}
                    title="Create" />
            </View>
        </View>
    )
}
