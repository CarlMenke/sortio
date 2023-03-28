import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';
import styles from '../style/styles';

export default function QuantityForm(props) {
    const { show, setShow, inventoryItems, setInventoryItems, item} = props
    const [amountUsed, setAmountUsed] = useState(null)
    const [amountUnit, setAmountUnit] = useState(null)
    const [open, setOpen] = useState(false);
    const [unitArray , setUnitArray] = useState([{label:'grams', value:'grams'}, {label:'ounces', value:'ounces'}, {label:'pounds', value:'pounds'}])
    const handleSubmit = () =>{
        if(!amountUnit || !amountUsed) return
        const temporaryInventoryItems = [...inventoryItems]
        for(let i = 0; i < temporaryInventoryItems.length; i++){
            const element = temporaryInventoryItems[i]
            if(element === item){
                temporaryInventoryItems[i] = {
                    name: element,
                    amountUnit:amountUnit,
                    amountUsed:amountUsed
                }
            }
        }
        setInventoryItems(temporaryInventoryItems)
        setShow(false)
    }

    if(show){
        return (
            <View style={styles.quantityForm}>
                <View style={styles.quantityFormLabelView}>
                    <Text style={styles.quantityFormLabelText}>Amount:</Text>
                </View>

                <View style={styles.quantityFormInputArea} > 
                    <TextInput
                    style={styles.quantityFormInput}
                    onChangeText={setAmountUsed}
                    value={amountUsed}
                    keyboardType='numeric'/>

                    <DropDownPicker
                    placeholder="Unit"
                    open={open}
                    value={amountUnit}
                    containerStyle={styles.dropDownContainer}
                    style={styles.dropDownStyle}
                    labelStyle={styles.dropDownLabelStyle}
                    itemStyle={styles.dropDownItemStyle}
                    dropDownStyle={styles.dropDownStyle}
                    dropDownItemStyle={styles.dropDownItemStyle}
                    selectedLabelStyle={styles.dropDownLabelStyle}
                    items={unitArray}
                    setOpen={setOpen}
                    setValue={setAmountUnit}
                    setItems={setUnitArray}/>

                    <TouchableOpacity
                    style={styles.quantityFormSubmit}
                    onPress={()=>{
                        setAmountUnit(null)
                        setAmountUsed(null)
                        props.handleSubmit ? props.handleSubmit(amountUsed, amountUnit, item) : handleSubmit()
                    }}>
                        <Text
                        style={[styles.quantityFormSubmitText]}>
                            Enter
                        </Text>
                    </TouchableOpacity>
                </View>
    
            </View>
        )
    }
}
