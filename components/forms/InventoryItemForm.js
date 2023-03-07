import { Text, View, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInventoryItem } from '../../firebaseFunctions'
const convert = require('convert-units')
import { setNavState } from '../../redux/actions';
import { showInventory } from '../../navFunctions'
import InputField from '../tags/InputField';
import styles from '../style/styles';
import QuantityForm from './QuantityForm';

export default function InventoryItemForm() {
    const [inventoryItemName, setIventoryItemName] = useState("")
    const [amountValue, setAmountValue] = useState("")
    const [amountUnit, setAmountUnit] = useState(null)
    const [open, setOpen] = useState(false);
    const [unitArray , setUnitArray] = useState([{label:'grams', value:'grams'}, {label:'ounces', value:'ounces'}, {label:'pounds', value:'pounds'}])
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const submitCreate = async () => {
        const response = await createInventoryItem(inventoryItemName, amountValue, amountUnit, [], navState.business.businessName)
        response.status ? showInventory(navState, setNavStateAction) : null
    }

    return (
        <View style={styles.inventoryItemForm}>
            <Text style={styles.title}>New Inventory Item:</Text>
            <InputField 
            onChangeText={setIventoryItemName}
            value={inventoryItemName}
            placeholder="Ingredient Name"/>

            <QuantityForm
            show={true}/>
            {/* <View style={styles.container}>
                <InputField 
                onChangeText={setAmountValue}
                value={amountValue}
                placeholder="Quantity"/>

                <DropDownPicker
                title="Unit"
                open={open}
                containerStyle={styles.dropDownContainer}
                style={styles.dropDownStyle}
                labelStyle={styles.dropDownLabelStyle}
                itemStyle={styles.dropDownItemStyle}
                dropDownStyle={styles.dropDownStyle}
                dropDownItemStyle={styles.dropDownItemStyle}
                selectedLabelStyle={styles.dropDownLabelStyle}
                value={amountUnit}
                items={unitArray}
                setOpen={setOpen}
                setValue={setAmountUnit}
                setItems={setUnitArray}/>
            </View> */}
            <View>
                <Button
                style={styles.button}
                onPress={submitCreate}
                title="Create" />
            </View>
        </View>
    )
}
