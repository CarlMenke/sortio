import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import { showInventory } from '../navFunctions'
import InventoryItemCard from '../cards/InventoryItemCard';

export default function MenuItemDetails(props) {
    const menuItem = props.menuItem
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
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

    const handleShowItemsToAdd = () => {
        showInventory(navState, setNavStateAction, {
            autoFillMenuItem: menuItem
        })
    }

    return(
        <View style={styles.container}>
            <Text>{menuItem.name}</Text>
            <Text>IMAGE HERE</Text>
            <Text>{menuItem.price}</Text>
            <Text># could tht could be made w/ inventory</Text>
            {Object.entries(menuItem.inventoryItems).map((inventoryItem, index)=>{
                return(
                    <InventoryItemCard inventoryItem={inventoryItem} key={index}/>
                )
            })}
            <Button
            onPress={()=>handleShowItemsToAdd()}
            title="Add Items"/>
        </View>
    )
}

/*
make sure that the inventoryItemDetails has a button on it to add that inventoryItem 
to a menuItem.
*/