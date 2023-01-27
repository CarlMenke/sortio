import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState  } from 'react';
import { setNavState } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createBusiness, joinBusiness } from '../firebaseFunctions'
import { showHome } from '../navFunctions'

export default function BusinessForm(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [businessName, setBusinessName] = useState("")
    const [businessCode, setBusinessCode] = useState("")
    const [header, setHeader] = useState({
        header1: "Create a Business,",
        header2: "you will be the business owner",
        method1: 'Create',
        method2: 'Join Business',
        function: createBusiness
    })

    const toggleMethod = () => {
        if(header.method1 === "Create"){
          setHeader({
            header1: "Join a Business,",
            header2: "you will be a business admin.",
            method1: "Join",
            method2: 'I want to create a business.',
            function: joinBusiness
          })
        }else{
          setHeader({
            header1: "Create a Business,",
            header2: "you will be the business owner.",
            method1: "Create",
            method2: 'I want to join a business.',
            function: createBusiness
          })
        }
      }

    const handleSubmit =  async () => {
        const response = await header.function(businessName, businessCode)
        if(response.status){
            showHome(navState, setNavStateAction)
            console.log(response.data)
        }else{
            console.log(response.data)
        }
    }
 
    const styles = StyleSheet.create({
        container: {
            height:"100%",
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header1}>{header.header1}</Text>
                <Text style={styles.header2}>{header.header2}</Text>
            </View>

            <View>
                <Text>Business Name: </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText = {setBusinessName}
                    value = {businessName}
                    placeholder = "Business Name"/>
            </View>

            <View>
                <Text>Business Code: </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText = {setBusinessCode}
                    value = {businessCode}
                    placeholder = "Besiness Password"/>
            </View>

            <View>
                <Button
                    style = {styles.button}
                    onPress = {handleSubmit}
                    title = {header.method1} />
                <Button
                    style = {styles.button}
                    onPress = {toggleMethod}
                    title = {header.method2}  />
            </View>
        </View>
    )
}
