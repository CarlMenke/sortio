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
    console.log("nav state menu items:", navState.business.menuItems, "navState.payload:", navState.payload, "navstate:", navState)
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
        const response = await addInventoryItemsToMenuItem({[item[0]]:{amountUsed:amountUsed, amountUnit: amountUnit}}, menuItem, navState.business.businessName)
        setShow(false)
        
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
            <Text>${menuItem.price}</Text>
            <Text>Ingredients: </Text>
            {Object.entries(menuItem.itemsUsed).map((item, index)=>{
                return(
                    <InventoryItemCard inMenuItem={true} inventoryItem={{name:item[0], ...item[1]}} key={index}/>
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