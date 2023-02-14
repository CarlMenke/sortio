import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { setNavState } from '../../redux/actions';
import InventoryItemCard from '../cards/InventoryItemCard';
import { addInventoryItemsToMenuItem, removeInventoryItemfromMenuItem, deleteMenuItem } from '../../firebaseFunctions'
import { showMenuItemDetails, showMenuItems} from "../../navFunctions"
import QuantityForm from '../forms/QuantityForm';
import InventoryScreen from './InventoryScreen';
import styles from '../style/styles';

export default function MenuItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [itemsUsed, setItemsUsed] = useState([])
    const [show, setShow] = useState(false)
    const [hideInventoryScreen, setHideInventoryScreen] = useState(true)
    const [item, setItem ] = useState()
    const [menuItem, setMenuItem] = useState(navState.business.menuItems[navState.payload])

    const proptAmountOfItemUsed = (item) => {
        if(show) return
        setShow(true)
        setItem(item)
    }

    const submitItemToMenuItem = async (amountUsed, amountUnit, item) => {
        const response = await addInventoryItemsToMenuItem({[item[0]]:{amountUsed:amountUsed, amountUnit: amountUnit}}, menuItem, navState.business.businessName)
        console.log(response)
        await showMenuItemDetails(navState, setNavStateAction, {refresh:true}, menuItem.name)
        setShow(false)
    }

    useEffect(()=>{
        setMenuItem(navState.business.menuItems[navState.payload])
        if(itemsUsed.length > 0){
            submitItemToMenuItem()
        }
    }, [show, navState])

    const handleSelectedInventoryItem  = (inventoryItem) => {
        setHideInventoryScreen(true)
        proptAmountOfItemUsed(inventoryItem)
    }

    const handleRemoveInventoryItemFromMenuItem = async (item) => {
        await removeInventoryItemfromMenuItem(item[0], menuItem.name, navState.business.businessName)
        await showMenuItemDetails(navState, setNavStateAction, {refresh:true}, menuItem.name)
    }

    const handleDeleteMenuItem = async () => {
        await deleteMenuItem(menuItem.name, navState.business.businessName)
        await showMenuItems(navState, setNavStateAction, {})
    }

    return(
        <View style={styles.container}>
            <Text>{menuItem.name}</Text>
            <Text>IMAGE HERE</Text>
            <Text>${menuItem.price}</Text>
            <Text>Ingredients: </Text>
            {Object.entries(menuItem.itemsUsed).map((item, index)=>{
                return(
                    <View style={styles.container} key={index}>
                       <InventoryItemCard 
                            inMenuItem={true} 
                            inventoryItem={{name:item[0], ...item[1]}}
                            onPressHandler={()=>{}}/>
                       <Button
                            title="Set Amount Used"
                            onPress={()=>{proptAmountOfItemUsed(item)}}/>
                       <Button
                            title="Delete"
                            onPress={()=>{handleRemoveInventoryItemFromMenuItem(item)}}/>
                    </View>
                )
            })}
            <QuantityForm 
                show = {show} 
                setShow={setShow} 
                inventoryItems={itemsUsed} 
                setInventoryItems={setItemsUsed} 
                item={item} 
                handleSubmit={submitItemToMenuItem}/>
            <InventoryScreen 
                hide={hideInventoryScreen} 
                onPressHandler={(inventoryItem)=>{handleSelectedInventoryItem(inventoryItem)}}/>
            <Button
                onPress={()=>setHideInventoryScreen(false)}
                title="Add Items"/>
            <Button
                onPress={handleDeleteMenuItem}
                title="Delete Menu Item"/>
        </View>
    )
}