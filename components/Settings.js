import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import { showHome, showSettings} from '../navFunctions'

export default function Settings() {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "row",
          backgroundColor: '#604D57',
          width:"100%",
          justifyContent:'center',
          alignItems:"center",
          padding: 17.5
        }
    });

    return(
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    )
}

