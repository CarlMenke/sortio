import { StyleSheet, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import { showHome, showSettings} from '../navFunctions'

export default function BottomBar() {

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.reducer)
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "row",
          backgroundColor: '#694D57',
          width:"100%",
          justifyContent:'space-around',
          alignItems:"center",
        }
    });

    return(
        <View style={styles.container}>
            <Button
            style={styles.bottomTab}
            title="Home"
            onPress={()=>{if(isAuthenticated)showHome(navState, setNavStateAction)}}/>
            <Button
            style={styles.bottomTab}
            title="Settings"
            onPress={()=>{if(isAuthenticated)showSettings(navState, setNavStateAction)}}/>
        </View>
    )
}

