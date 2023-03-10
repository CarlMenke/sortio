import { Text, View, Button, TextInput } from 'react-native';
import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const convert = require('convert-units')
import { setNavState } from '../../redux/actions';
import { showMenuItems } from '../../navFunctions'
import { createMenuItem } from '../../firebaseFunctions'
import InventoryScreen from '../screens/InventoryScreen';
import QuantityForm from './QuantityForm';
import styles from '../style/styles';

export default function MenuItemForm() {
    const [menuItemName, setMenuItemName] = useState("")
    const [price, setPrice] = useState("")
    const [inventoryItems, setInventoryItems] = useState([])
    const [show, setShow] = useState(false)
    const [ item, setItem ] = useState()
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const proptAmountOfItemUsed = (item) => {
        if(show) return
        setShow(true)
        setItem(item)
    }

    const addInventoryItemToMenuItemState = (item) => {
        if(show) return
        let has = false
        for(let i = 0; i < inventoryItems.length; i++){
            if(item[0] === inventoryItems[i].name){
                has = true
            }
        }
        if(has){
            proptAmountOfItemUsed(item[0])
        }else{
            const inventoryItemsTemp = [...inventoryItems]
            inventoryItemsTemp.push(item[0])
            setInventoryItems(inventoryItemsTemp)
            proptAmountOfItemUsed(item[0])
        }
        
    }

    const handleSubmit = async () => {
        try{
            const itemsUsed = {}
            for(const element of inventoryItems){
                itemsUsed[element.name] = {
                    amountUnit: element.amountUnit,
                    amountUsed: element.amountUsed
                }
            }
            const response = await createMenuItem(menuItemName, price , itemsUsed, navState.business.businessName)
            if(response.status){
                showMenuItems(navState, setNavStateAction)
            }else{
                console.log(response.data)
            }
        }catch(error){
            console.log("Error from handleSubmit inside MenuItemForm:", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>New Menu Item:</Text>

            <View style={styles.item} >
                <Text>Menu Item Name:</Text>
                <TextInput
                style={styles.input}
                onChangeText={setMenuItemName}
                value={menuItemName}
                placeholder="Menu Item Name"/>
            </View>
            
            <View style={styles.item} >  
                <Text>Price:</Text>
                <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                keyboardType='numeric'
                placeholder="price"/>
            </View>

            <QuantityForm 
            show = {show} 
            setShow={setShow} 
            inventoryItems={inventoryItems} 
            setInventoryItems={setInventoryItems} 
            item={item}/>

            <View style={styles.container}>
                <Text>Add Inventory Items:</Text>
                <InventoryScreen onPressHandler={(item)=>addInventoryItemToMenuItemState(item)}/>
            </View>

            <Button
                title="Create"
                onPress={handleSubmit}/>
        </View>
    )
}
