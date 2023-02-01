import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';

export default function QuantityForm(props) {
    const { show, setShow, inventoryItems, setInventoryItems, item} = props
    const [amountUsed, setAmountUsed] = useState(null)
    const [amountUnit, setAmountUnit] = useState(null)
    const [open, setOpen] = useState(false);
    const [unitArray , setUnitArray] = useState([{label:'grams', value:'grams'}, {label:'ounces', value:'ounces'}, {label:'pounds', value:'pounds'}])
 
    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        },
        item : {
            flex: .2
        }
    });

    const handleSubmit = () =>{
        if(!amountUnit || !amountUsed) return
        const temporaryInventoryItems = [...inventoryItems]
        for(let i = 0; i < temporaryInventoryItems.length; i++){
            const element = temporaryInventoryItems[i].name
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

    if(show)
    {
        return (
            <View style={styles.container}>
                <View style={styles.item} >  
                    <Text>How much do you use?:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAmountUsed}
                        value={amountUsed}
                        keyboardType='numeric'
                        placeholder="Amount Used"/>
                    <DropDownPicker
                        title="Unit"
                        open={open}
                        value={amountUnit}
                        items={unitArray}
                        setOpen={setOpen}
                        setValue={setAmountUnit}
                        setItems={setUnitArray}/>
                </View>
    
                <Button
                    title="Enter"
                    onPress={handleSubmit}/>
            </View>
        )
    }
}
