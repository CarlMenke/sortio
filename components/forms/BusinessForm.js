import { Text, View, TouchableOpacity } from 'react-native';
import { useState  } from 'react';
import { setNavState } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createBusiness, joinBusiness } from '../../firebaseFunctions'
import InputField from '../tags/InputField';
import { showHome } from '../../navFunctions'
import styles from '../style/styles';

export default function BusinessForm() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [businessName, setBusinessName] = useState("")
    const [businessCode, setBusinessCode] = useState("")
    const [header, setHeader] = useState({
        header1: "Create a Business:",
        header2: "you will be the business owner",
        method1: 'Create',
        method2: 'I want to join a business.',
        function: createBusiness
    })

    const toggleMethod = () => {
        if(header.method1 === "Create"){
          setHeader({
            header1: "Join a Business:",
            method1: "Join",
            method2: 'I want to create a business.',
            function: joinBusiness
          })
        }else{
          setHeader({
            header1: "Create a Business,",
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

    return (
        <View style={styles.businessForm}>
            <View style={styles.title}>
                <Text style={styles.title}>{header.header1}</Text>
            </View>

            <View style={styles.inputArea}>
                <InputField 
                onChangeText = {setBusinessName}
                value = {businessName}
                placeholder = "Business Name"/>

                <InputField 
                onChangeText = {setBusinessCode}
                value = {businessCode}
                placeholder = "Business Password"/>
            </View>

            <View style={styles.buttonsArea}>
                <TouchableOpacity
                style = {styles.submitButton}
                onPress = {handleSubmit}
                title = {header.method1}>
                    <Text style={styles.submitButtontext}>{header.method1}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.button}
                onPress = {toggleMethod}
                title = {header.method2}>
                    <Text  style={styles.switchButtonText} >{header.method2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
