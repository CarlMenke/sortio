import { StyleSheet, ScrollView, Button, View, StatusBar} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import InventoryItemCard from '../cards/InventoryItemCard';
import { showInventoryItemForm, showInventoryItemDetails} from '../../navFunctions'

export default function InventoryScreen(props) {

    if(props.hide) return 
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
                {Object.entries(navState.business.inventoryItems).map((inventoryItem, index) => {
                    return(
                        <InventoryItemCard 
                        inventoryItem={inventoryItem[1]} 
                        key={index} 
                        onPressHandler={
                            props.onPressHandler ? 
                            ()=>{props.onPressHandler(inventoryItem)} : 
                            ()=>{showInventoryItemDetails(navState, setNavStateAction, {}, inventoryItem[1].name)}
                        }/>
                    )
                })}
            </ScrollView>
            <Button
            onPress={()=>{showInventoryItemForm(navState, setNavStateAction, {})}}
            title="New Item"/>
        </View>
    )
}
