import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';

export default function InventoryItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const { name, currentValue, currentUnit } =  navState.business.inventoryItems[navState.payload]

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

    const hadleRemoveItem = () => {

    }

    const handleAddItem = () => {

    }

    return(
         <View style={styles.container}>
            <Text>{name} details:</Text>
            <Text>{currentValue}</Text>
            <Text>{currentUnit}</Text>
            <Button
                onPress={hadleRemoveItem}
                title="Remove Items"/>
            <Button 
                onPress={handleAddItem}
                title="Add Items"/>
        </View>
    )
}
