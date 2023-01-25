import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState  } from 'react';
import { useDispatch } from 'react-redux'
import { setAuthentication } from '../redux/actions'
import { signup, login } from '../firebaseFunctions'
import { auth }   from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

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

  const dispatch = useDispatch()
  const setAuthenticationAction = (isAuthenticated) => dispatch(setAuthentication(isAuthenticated))

  useEffect(()=> {
    onAuthStateChanged(auth,(user) => {
      //you can set loading animation to start here
      if(user){
        setAuthenticationAction(true)
      }else{
        setAuthenticationAction(false)
      }
    })
  }, [])

//the functions above are good but you need to think about why it doesnt automatically store a user in the firestore and look into using firebases preset methods for handeling a users
//information. Use the get user profile and stuff, then only store the busniess, menu and inventory items in the first store.

  const toggleMethod = () => {
    if(header.method === "signup"){
      setHeader({
        header1: "Welcome,",
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
        flexDirection: "column",
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 50
      },
      displayMessage: {
        fontWeight:'bold',
        position:"absolute",
        top:35
      },
      header:{
        alignSelf:"flex-start",
        paddingLeft:30
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
        shadowOpacity: .8,
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
      input:{
        backgroundColor:"grey",
        fontFamily: "Arial Rounded MT Bold"
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
      signupButton: {

      },
    });

    if(header.method === "signup"){
      return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>

            <View>
                <Text>First Name: </Text>
                <TextInput 
                style = {styles.input}
                onChangeText = {setFirstName}
                value = {firstName}
                placeholder = "First Name"/>
            </View>

            <View>
                <Text>Last Name: </Text>
                <TextInput 
                style = {styles.input}
                onChangeText = {setLastName}
                value = {lastName}
                placeholder = "Last Name"/>
            </View>

            <View>
                <Text>Email: </Text>
                <TextInput 
                style = {styles.input}
                onChangeText = {setEmail}
                value = {email}
                placeholder = "Email"/>
            </View>

            <View>
                <Text>Password: </Text>
                <TextInput 
                style = {styles.input}          
                onChangeText = {setPassword}
                secureTextEntry={true}
                value = {password}
                placeholder = "Password"/>
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
