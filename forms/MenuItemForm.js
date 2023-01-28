import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const convert = require('convert-units')
import { setNavState } from '../redux/actions';
import { showMenuItems } from '../navFunctions'
import { createMenuItem } from '../firebaseFunctions'
import InventoryPage from '../components/InventoryPage';

export default function MenuItemForm() {
    const [menuItemName, setMenuItemName] = useState("")
    const [price, setPrice] = useState("")
    const [inventoryItems, setInventoryItems] = useState([])
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    console.log(navState)
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

    useEffect(()=>{
        console.log(inventoryItems)
    }, [inventoryItems])

    const addInventoryItemToMenuItemState = (item) => {
        //LEFT OFF HERE
        //you need to make it so that they cant add an item if it is already in the array, 
        //AND so that they  are prompted to tell you how much of that iventoryItem is in the menuItem
        
        //idea:
            //when they click on an inventory item, check if it is inside the array already
                //if it is, then prompt them to update the amount of that item
                //if it is not, then add it to the array, and prompt them to input the amount of that item
        const inventoryItemsTemp = [...inventoryItems]
        inventoryItemsTemp.push(item)
        setInventoryItems(inventoryItemsTemp)
    }

    const handleSubmit = async () => {
        try{
            /* 
            [
                ["TestItem", {"currentUnit": "grams", "currentValue": "87", "name": "TestItem", "usedIn": [Array]}],
                ["testitem10", {"currentUnit": "ounces", "currentValue": "287", "name": "testitem10", "usedIn": [Array]}]
            ]
            it is like this becuase you use Object.entries(inventoryItems).map and that returns and array of length 2
            and the first is the key and the second is the value

            YOU MAYBE WANT IT TO LOOK LIKE THIS INSTEAD:

            [
                ["TestItem", {"currentUnit": "grams", "currentValue": "87", "name": "TestItem", "usedIn": [Array]}, AMOUNT_IN_MENU_ITEM],
                ["testitem10", {"currentUnit": "ounces", "currentValue": "287", "name": "testitem10", "usedIn": [Array]}, AMOUNT_IN_MENU_ITEM]
            ]

            OR CONVERT IT BACK TO AN OBJECT AT THIS POINT 

            {
                inventoryItem[0]:inventoryItem[1],
                amountUsed: GET_FROM_USER
                
            }

            */
            const response = await createMenuItem(menuItemName, price , inventoryItems, navState.payload.businessName)
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

            <View style={styles.item}>
                <Text>Add Inventory Items:</Text>
                <InventoryPage onPressHandler={addInventoryItemToMenuItemState}/>
            </View>

            <Button
                title="Create"
                onPress={()=>handleSubmit()}/>
        </View>
    )
}
