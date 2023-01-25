import { StyleSheet, View, Text} from 'react-native';

export default function Home() {

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
            <Text>
                Home
            </Text>
        </View>
    )
}
