import { View, Button, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { setNavState } from '../../redux/actions';
const trashCan = require('../../assets/images/trashCan.png')
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
        <View style={styles.menuItemDetails}>
            <View style={styles.menuItemDetailsHeader}>
                <Text style={styles.title}>{menuItem.name}</Text>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.priceLabelHeader}>$ </Text>
                    <Text style={styles.priceAmountHeader}>{menuItem.price}</Text>
                </View>
            </View>
            <View style={styles.menuItemIngredients}>
                <Text style={styles.ingredientsTitle}>Ingredients: </Text>
                <View style={{width: "100%"}}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {Object.entries(menuItem.itemsUsed).map((item)=>{
                            return(
                                <View style={styles.ingredientCard} key={item[0]}>
                                    <View style={styles.ingredientInfo}>
                                        <Text style={styles.cardName}>{item[0]}</Text>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={styles.cardAmount}>{item[1].amountUsed}</Text>
                                            <Text style={styles.cardUnit}>  {item[1].amountUnit}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ingredientActions}>
                                        <TouchableOpacity
                                            style={styles.adjustButton}
                                            onPress={()=>{proptAmountOfItemUsed(item)}}>
                                                <Text
                                                style={styles.adjustButtontext}>Adjust Amount</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{handleRemoveInventoryItemFromMenuItem(item)}}>
                                                <Image 
                                                style={styles.deleteImage}
                                                source={trashCan}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
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