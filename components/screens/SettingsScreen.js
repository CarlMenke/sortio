import { StyleSheet, View, Text } from 'react-native';


export default function SettingsScreen() {

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

