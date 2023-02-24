import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react"
import { setNavState } from '../../redux/actions';
import QuantityForm from '../forms/QuantityForm';
import { deleteInventoryItem, updateInventoryItem } from "../../firebaseFunctions"
import { showInventory, showInventoryItemDetails } from '../../navFunctions'
import styles from '../style/styles';

const NameInput = (props) => {
    if(props.showNameInput){
        return(
            <View style={styles.container}>
                <TextInput 
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder="New Item Name"/>
                <Button
                onPress={props.handleSubmit}
                title="Update"/>
            </View>
        )
    }
}

export default function InventoryItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [name, setName] = useState(navState.business.inventoryItems[navState.payload].name)
    const [currentValue, setCurrentValue] = useState(navState.business.inventoryItems[navState.payload].currentValue)
    const [currentUnit, setCurrentUnit] = useState(navState.business.inventoryItems[navState.payload].currentUnit)
    const [item, setItem ] = useState(navState.business.inventoryItems[navState.payload])
    const [newItem, setNewItem] = useState([])
    const [show, setShow] = useState(false)
    const [showNameInput, setShowNameInput] = useState(false)
    const [newName, setNewName] = useState()

    useEffect(()=> {
        setName(navState.business.inventoryItems[navState.payload].name)
        setCurrentValue(navState.business.inventoryItems[navState.payload].currentValue)
        setCurrentUnit(navState.business.inventoryItems[navState.payload].currentUnit)
    }, [navState])

    const promptQuantityForm = () => {
        setShow(true)
    }

    const handleUpdateNameSubmit = async () => {
        const data = {
            name: newName,
            currentValue: currentValue,
            currentUnit: currentUnit
        }
        const respose = await updateInventoryItem(name, data, navState.business.businessName)
        await showInventoryItemDetails(navState, setNavStateAction, {refresh: true}, newName)

    }

    const handleUpdateInventoryItem = async (currentValue, currentUnit, item) => {
        setShow(false)
        const data = {
            name: item.name,
            currentValue: currentValue,
            currentUnit: currentUnit
        }
        const response = await updateInventoryItem(name, data, navState.business.businessName)
        await showInventoryItemDetails(navState, setNavStateAction, {refresh: true}, item.name)
    }

    const handleDeleteItem = async () => {
        const response = await deleteInventoryItem(name, navState.business.businessName)
        showInventory(navState, setNavStateAction, {})
    }

    return(
         <View style={styles.container}>
            <Text>{name} details:</Text>
            <Text>{currentValue}</Text>
            <Text>{currentUnit}</Text>
            <Button
                onPress={promptQuantityForm}
                title="Set Current Amount"/>
            <Button
                onPress={handleDeleteItem}
                title="Delete"/>
            <Button
            onPress={()=>{setShowNameInput(true)}}
            title="Update Item Name"/>
           <QuantityForm 
                show = {show} 
                setShow={setShow} 
                inventoryItems={newItem} 
                setInventoryItems={setNewItem} 
                item={item} 
                handleSubmit={(currentValue, currentUnit, item) => {handleUpdateInventoryItem(currentValue, currentUnit, item)}}/>
            <NameInput
                showNameInput={showNameInput}
                value={newName}
                onChangeText={setNewName}
                handleSubmit={handleUpdateNameSubmit}/>
        </View>
    )
}
