import { StyleSheet, Text, View, Button, TextInput, Animated, Easing } from 'react-native';
import { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAuthentication, setNavState } from '../redux/actions'
import { signup, login } from '../firebaseFunctions'
import { auth }   from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUsersBusinesses } from '../firebaseFunctions'

export default function StartScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayMessage, setDisplayMessage] = useState("")
  const [header, setHeader] = useState({
    header1: "Welcome,",
    header2: "create an account below.",
    header3: "Signup:",
    method: 'signup'
  })

const [emailFocused, setEmailFocused ] = useState(false)
const [passwordFocused, setPasswordFocused ] = useState(false)
const [firstNameFocused, setFirstNameFocused ] = useState(false)
const [lastNameFocused, setLastNameFocused ] = useState(false)

const emailAnim = useRef(new Animated.Value(0)).current
const passwordAnim = useRef(new Animated.Value(0)).current
const firstNameAnim = useRef(new Animated.Value(0)).current
const lastNameAnim = useRef(new Animated.Value(0)).current

useEffect(()=>{
  Animated.timing(emailAnim, {
    toValue: emailFocused? 1 : 0,
    duration: 175,
    useNativeDriver:false,
  }).start()
},[emailFocused])

useEffect(()=>{
  Animated.timing(passwordAnim, {
    toValue: passwordFocused? 1 : 0,
    duration: 175,
    useNativeDriver:false,
  }).start()
},[passwordFocused])

useEffect(()=>{
  Animated.timing(firstNameAnim, {
    toValue: firstNameFocused? 1 : 0,
    duration: 175,
    useNativeDriver:false,
  }).start()
},[firstNameFocused])

useEffect(()=>{
  Animated.timing(lastNameAnim, {
    toValue: lastNameFocused? 1 : 0,
    duration: 175,
    useNativeDriver:false,
  }).start()
},[lastNameFocused])

  const dispatch = useDispatch()
  const setAuthenticationAction = (isAuthenticated) => dispatch(setAuthentication(isAuthenticated))
  const setNavStateAction = (navState) => dispatch(setNavState(navState))
  const {navState} = useSelector(state => state.reducer)

  useEffect(()=> {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const response = await getCurrentUsersBusinesses()
        if(response.status){
          setNavStateAction({
            screen: "home",
            payload: response.data
          })
        }
        setAuthenticationAction(true)
      }else{
        setAuthenticationAction(false)
      }
    })
  }, [])

  const toggleMethod = () => {
    if(header.method === "signup"){
      setHeader({
        header1: "Hello,",
        header2: "nice to see you again.",
        header3: "Login:",
        method: 'login'
      })
    }else{
      setHeader({
        header1: "Welcome,",
        header2: "create an account below.",
        header3: "Signup:",
        method: 'signup'
      })
    }
  }

  const styles = StyleSheet.create({
      container: {
        height:"100%",
        width:"100%",
        flexDirection: "column",
        backgroundColor: '#353535',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingTop: 50,
        paddingLeft: 30
      },
      displayMessage: {
        fontWeight:'bold',
        position:"absolute",
        top:35
      },
      header1:{
        color:"#FFC600",
        fontSize: 60,
        shadowColor: "black",
        shadowOffset: {width: .7, height: .7},
        shadowOpacity: .8,
        shadowRadius: 1,
        fontFamily: "Arial Rounded MT Bold"
      },
      header2: {
        color:"#FEFEFE",
        fontSize:20,
        shadowColor: "black",
        shadowOffset: {width: .5, height: .5},
        shadowOpacity: .85,
        shadowRadius: 1,
        fontFamily: "Arial Rounded MT Bold",
        paddingLeft: 5
      },
      header3: {
        color:"#FEFEFE",
        fontSize:50,
        shadowColor: "black",
        shadowOffset: {width: .5, height: .5},
        shadowOpacity: .8,
        shadowRadius: 1,
        fontFamily: "Arial Rounded MT Bold",
        padding: 5
      },
      loginInputs:{
        alignSelf:"stretch",
        marginLeft: 20,
        marginRight: 20,
        flex: .7
      },
      loginInput1: {
        fontFamily: "Arial Rounded MT Bold",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: "#FFC600",
        backgroundColor: "#353535",
        borderWidth:.3,
        padding: 40,
        fontSize: 20,
        fontFamily: "Verdana"
      },
      line:{
        width: 10,
        height:5,
        borderColor: "grey",
        marginLeft: 100,
        marginRight: 100
      },
      loginInput2: {
        fontFamily: "Arial Rounded MT Bold",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth:.3,
        borderColor: "#FFC600",
        backgroundColor: "#353535",
        padding: 40,
        fontSize: 20,
        fontFamily: "Verdana"
      },
      input:{
        color:"white",
        fontSize:20,
        fontFamily: "Arial Rounded MT Bold",
        paddingBottom: 6.5
      },
      item : {
        width:"90%"
      },
      secondBorder: {
        borderWidth:2,
        borderColor:"white",
        width:"95%",
        borderRadius: 3
      },
      email:{
        marginTop:.5,
        opacity: emailFocused ? 1 : 0,
        borderWidth : 2,
        borderColor:"#FFC600",
        width:"95%",
        borderRadius: 3
      },
      password: {
        marginTop:.5,
        opacity: passwordFocused ? 1 : 0,
        borderWidth: 2,
        borderColor:"#FFC600",
        width:"95%",
        borderRadius: 3
      },
      firstName:{
        marginTop:.5,
        opacity: firstNameFocused ? 1 : 0,
        borderWidth: 2,
        borderColor:"#FFC600",
        width:"95%",
        borderRadius: 3
      },
      lastName: {
        marginTop:.5,
        opacity: lastNameFocused ? 1 : 0,
        borderWidth: 2,
        borderColor:"#FFC600",
        width:"95%",
        borderRadius: 3
      }
    });

    // create a component to to replace the 4 TextInputs
    
    if(header.method === "signup"){
      return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>


            <View style={styles.item}>
              <TextInput 
              style = {styles.input}
              onChangeText = {setFirstName}
              value = {firstName}
              placeholder = "First Name"
              onFocus={()=>setFirstNameFocused(true)}
              onBlur={()=>setFirstNameFocused(false)}/>
              <View style={styles.secondBorder}/>
              <Animated.View style={[styles.firstName,
              {width:firstNameAnim.interpolate({inputRange: [0,1], outputRange: ["0%", "95%"]}) }] }/>
            </View>

            <View style={styles.item}>           
              <TextInput 
              style = {styles.input}
              onChangeText = {setLastName}
              value = {lastName}
              placeholder = "Last Name"
              onFocus={()=>setLastNameFocused(true)}
              onBlur={()=>setLastNameFocused(false)}/>
              <View style={styles.secondBorder}/>
              <Animated.View style={[styles.lastName,
              {width:lastNameAnim.interpolate({inputRange: [0,1], outputRange: ["0%", "95%"]}) }] }/>
            </View>  

            <View style={styles.item}>
              <TextInput 
              style = {styles.input}
              onChangeText = {setEmail}
              value = {email}
              placeholder = "Email"
              onFocus={()=>setEmailFocused(true)}
              onBlur={()=>setEmailFocused(false)}/>
              <View style={styles.secondBorder}/>
              <Animated.View style={[styles.email,
              {width:emailAnim.interpolate({inputRange: [0,1], outputRange: ["0%", "95%"]}) }] }/>
            </View>

            <View style={styles.item}>
              <TextInput
              style = {styles.input}          
              onChangeText = {setPassword}
              secureTextEntry={true}
              value = {password}
              placeholder = "Password"
              onFocus={()=>setPasswordFocused(true)}
              onBlur={()=>setPasswordFocused(false)}/>
              <View style={styles.secondBorder}/>
              <Animated.View style={[styles.password,
              {width:passwordAnim.interpolate({inputRange: [0,1], outputRange: ["0%", "95%"]}) }] }/>
            </View>
              
            <View>
                <Button
                style = {styles.button}
                onPress = {()=>{signup(email, password, firstName, lastName)}}
                title = "Enter" />
                <Button
                style = {styles.button}
                onPress = {toggleMethod}
                title = "I Already Have An Account." />
            </View>
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
            <Text style={styles.displayMessage}>{displayMessage}</Text>
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>
            <View style = {styles.loginInputs}>
              <Text style = {styles.header3}>{header.header3}</Text>
              <TextInput 
                style = {styles.loginInput1}
                onChangeText = {setEmail}
                value = {email}
                placeholder = "Email"/>
                <View style={styles.line}/>
              <TextInput 
                style = {styles.loginInput2}          
                onChangeText = {setPassword}
                secureTextEntry={true}
                value = {password}
                placeholder = "Password"/>
            </View>
            <Button
              style = {styles.button}
              onPress = {()=>{login(email, password)}}
              title = "Enter" />
            <Button
              style = {styles.button}
              onPress = {toggleMethod}
              title = "Create Account"  />
        </View>
      )
    }
}
