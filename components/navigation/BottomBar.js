import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showHome, showSettings, showBusiness} from '../../navFunctions'
import styles from '../style/styles';

export default function BottomBar() {

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.reducer)
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    if(navState.bottomBar === 'home'){
        return(
            <View style={styles.bottomBar}>
                <TouchableOpacity
                style={styles.bottomTab}
                onPress={()=>{if(isAuthenticated)showHome(navState, setNavStateAction)}}>
                    <Text
                    style={styles.bottomTabText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.bottomTab}
                onPress={()=>{if(isAuthenticated)showSettings(navState, setNavStateAction)}}>
                    <Text
                    style={styles.bottomTabText}>Settings</Text>
                </TouchableOpacity>
            </View>
        )
    }else if(navState.bottomBar === 'business'){
        return(
            <View style={styles.bottomBar}>
                <TouchableOpacity
                style={styles.bottomTab}
                onPress={()=>{if(isAuthenticated)showBusiness(navState, setNavStateAction, {}, navState.business.businessName)}}>
                    <Text
                    style={styles.bottomTabText}>Business</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomTab}
                onPress={()=>{if(isAuthenticated)showHome(navState, setNavStateAction)}}>
                    <Text
                    style={styles.bottomTabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.bottomTab}
                onPress={()=>{if(isAuthenticated)showSettings(navState, setNavStateAction)}}>
                    <Text
                    style={styles.bottomTabText}>Settings</Text>
                </TouchableOpacity>
            </View>
        )
    }else{
        return(
            <></>
        )
    }
}

