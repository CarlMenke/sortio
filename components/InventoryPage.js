import { StyleSheet, ScrollView, Button, Text, View, StatusBar} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import InventoryItemCard from '../cards/InventoryItemCard';
import { showInventoryItemForm, showInventoryItemDetails} from '../navFunctions'

export default function InventoryPage(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
            paddingTop:StatusBar.currentHeight,
            flex: 1,
            flexDirection: "column",
            backgroundColor: '#544D57'
        }
    });

    return(
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {Object.entries(navState.payload.inventoryItems).map((inventoryItem, index) => {
                    return(
                        <InventoryItemCard 
                        inventoryItem={inventoryItem} 
                        key={index} 
                        onPressHandler={
                            props.onPressHandler ? 
                            ()=>{props.onPressHandler(inventoryItem)} : 
                            ()=>{showInventoryItemDetails(navState, setNavStateAction, {}, inventoryItem)}
                        }/>
                    )
                })}
            </ScrollView>
            <Button
            onPress={()=>{showInventoryItemForm(navState, setNavStateAction)}}
            title="New Item"/>
        </View>
    )
}
