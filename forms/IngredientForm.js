import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';
import { createIngredient } from '../firebaseFunctions'
const convert = require('convert-units')

export default function IngredientForm() {
    const [ingredientName, setIngredientName] = useState("")
    const [amountValue, setAmountValue] = useState(null)
    const [amountUnit, setAmountUnit] = useState(null)
    const [open, setOpen] = useState(false);
    const [unitArray , setUnitArray] = useState([{label:'grams', value:'grams'}, {label:'ounces', value:'ounces'}, {label:'pounds', value:'pounds'}])

    const styles = StyleSheet.create({
        container: {
            height:"100%",
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    return (
        <View style={styles.container}>
            <Text>New Ingredient:</Text>
            <View>
                <Text>Ingredient Name: </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText = {setIngredientName}
                    value = {ingredientName}
                    placeholder = "Ingredient Name"/>
            </View>

            <View>
                <Text>How much do you have: </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText = {setAmountValue}
                    value = {amountValue}
                    keyboardType = 'numeric'
                    placeholder = "quantity"/>
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
                    style = {styles.button}
                    onPress = {async ()=>{await createIngredient(ingredientName, amountValue, amountUnit)}}
                    title = "Create" />
            </View>
        </View>
    )
}
