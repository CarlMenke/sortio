import { StyleSheet, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showHome, showSettings, showBusiness} from '../../navFunctions'

export default function BottomBar() {

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.reducer)
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "row",
          backgroundColor: '#2E2E2E',
          width:"100%",
          paddingBottom:15,
          justifyContent:'space-around',
          alignItems:"center",
          shadowColor:"#181818",
          shadowOpacity: .3,
          shadowOffset:{height: -3}
        },
        bottomTab:{
            marginBottom: 10
        }
    });

    if(navState.bottomBar === 'home'){
        return(
            <View style={styles.container}>
                <Button
                color="#FFC600"
                title="Home"
                onPress={()=>{if(isAuthenticated)showHome(navState, setNavStateAction)}}/>
                <Button
                color="#FFC600"
                title="Settings"
                onPress={()=>{if(isAuthenticated)showSettings(navState, setNavStateAction)}}/>
            </View>
        )
    }else if(navState.bottomBar === 'business'){
        return(
            <View style={styles.container}>
                <Button
                color="#FFC600"
                title="Business"
                onPress={()=>{if(isAuthenticated)showBusiness(navState, setNavStateAction, {}, navState.business.businessName)}}/>
                <Button
                color="#FFC600"
                title="Home"
                onPress={()=>{if(isAuthenticated)showHome(navState, setNavStateAction)}}/>
                <Button
                color="#FFC600"
                title="Settings"
                onPress={()=>{if(isAuthenticated)showSettings(navState, setNavStateAction)}}/>
            </View>
        )
    }
}

