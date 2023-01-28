import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import MenuItemCard from '../cards/MenuItemCard';
import { showMenuItemForm } from '../navFunctions'

export default function MenuItemsPage() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });

    return(
        <View style={styles.container}>
            {Object.entries(navState.payload.menuItems).map((menuItem, index)=>{
               return(
                <MenuItemCard menuItem={menuItem} key={index}/>
               )
            })}
            <Button
            onPress={()=>showMenuItemForm(navState, setNavStateAction)}
            title="Create New Menu Item"/>
        </View>
    )
}
