import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { setNavState } from '../../redux/actions';
import InventoryItemCard from '../cards/InventoryItemCard';
import { addInventoryItemsToMenuItem } from '../../firebaseFunctions'
import QuantityForm from '../forms/QuantityForm';
import InventoryScreen from './InventoryScreen';

export default function MenuItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [itemsUsed, setItemsUsed] = useState([])
    const [show, setShow] = useState(false)
    const [hideInventoryScreen, setHideInventoryScreen] = useState(true)
    const [item, setItem ] = useState()
    const menuItem = navState.business.menuItems[navState.payload]


    const styles = StyleSheet.create({
        container: {
          flex:1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth:1,
          borderColor: "yellow",
          borderRadius: 10,
          padding:10,
          margin: 10
        },
    });

    const proptAmountOfItemUsed = (item) => {
        if(show) return
        setShow(true)
        setItem(item)
    }

    const submitItemToMenuItem = async (amountUsed, amountUnit, item) => {
        const response = await addInventoryItemsToMenuItem([{amountUsed:amountUsed, amountUnit: amountUnit, name:item[0]}], menuItem, navState.business.businessName)
    }

    useEffect(()=>{
        if(itemsUsed.length > 0){
            submitItemToMenuItem()
        }
    }, [show])


    const handleSelectedInventoryItem  = (inventoryItem) => {
        setHideInventoryScreen(true)
        proptAmountOfItemUsed(inventoryItem)
    }

    return(
        <View style={styles.container}>
            <Text>{menuItem.name}</Text>
            <Text>IMAGE HERE</Text>
            <Text>{menuItem.price}</Text>
            <Text>Ingredients: </Text>
            {Object.entries(menuItem.itemsUsed).map((item, index)=>{
                return(
                    <InventoryItemCard inventoryItemName={item[1]} key={index}/>
                )
            })}
            <QuantityForm show = {show} setShow={setShow} inventoryItems={itemsUsed} setInventoryItems={setItemsUsed} item={item} handleSubmit={submitItemToMenuItem}/>
            <InventoryScreen hide={hideInventoryScreen} onPressHandler={(inventoryItem)=>{handleSelectedInventoryItem(inventoryItem)}}/>
            <Button
            onPress={()=>setHideInventoryScreen(false)}
            title="Add Items"/>
        </View>
    )
}

/*
make sure that the inventoryItemDetails has a button on it to add that inventoryItem 
to a menuItem.
*/