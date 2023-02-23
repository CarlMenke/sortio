import { StyleSheet } from "react-native"

const colors = {
    blue: "#8CBBF1",
    yellow: "#FDEDCB",
    pink: "#F9CEDF",
    lightGrey: "#e6e6e6",
    darkGrey: "#6e6e6e",
    background: {
        dark: "grey",
        light: "white"
    },
    input:{
        dark: ""
    }
}
const fonts = {
    medium: "Nunito-Medium",
    extraBold: "Nunito-ExtraBold",
    regular: "Nunito-Regular",
    semiBold: "Nunito-Semibold",
    light: "Nunito-Light",
    extraLight: "Nunito-ExtraLight"
}

const shadow = {
    shadowColor:"grey",
    shadowOffset:{width: .7, height: .7},
    shadowOpacity:.9,
    shadowRadius:.6
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    title:{
        fontFamily:fonts.semiBold,
        color: colors.darkGrey,
        fontSize:20,
        margin: 10
    },
    buisnessCardHeader:{
        fontFamily: fonts.extraBold,
        fontSize: 40,
        color: colors.darkGrey
    },
    homeScreen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"space-between",
    },
    homeScreenBusinesses: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 30
    },
    homeScreenBusinessesArea:{
        justifyContent: "flex-start",
        marginLeft: 60,
        marginRight: 40,
    },
    businessCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        width:"100%",
        backgroundColor: colors.lightGrey,
        marginTop: 10,
        padding: 10,
        borderRadius: 10
    },
    startScreen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    startScreenLogo: {
        marginTop: 20,
        width: 150,
        height: 100,
        objectFit: "fill"
    },
    header:{
        width: "80%",
        marginLeft: 40,
        marginTop: 35,
    },
    header1:{
        fontFamily:fonts.extraBold,
        color: colors.blue,
        fontSize: 40,
    },
    header2: {
        fontFamily:fonts.regular,
        color: colors.blue,
        fontSize: 15,
    },
    item : {
        width:"98%",
        marginTop: 20,
        marginBottom: 20,
        flex: .2
    },
    user: {
        backgroundColor: colors.lightGrey
    },
    bottomTab:{
        marginBottom: 10
    },
    scrollView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    inputArea: {
        width: "80%",
        flex:.8,
        margin: 30,
        justifyContent: "center"
    },
    inputField: {
        borderRadius: 7,
        padding: 15,
        margin: 27.5,
        shadowOffset: {width:.5, height:.5},
    },
    inputFieldContainer: {
        flexDirection: "column",
        alignContent: "space-around",
        justifyContent:"center",
    },
    inputFieldText:{
        color: colors.darkGrey,
        fontFamily: fonts.light,
    },
    inputFieldMove:{
        position:"absolute",
        zIndex:-1,
    },
    inputFieldUsed: {
        position: "absolute",
        top: -20,
        left: 5,
    },
    buttonsArea: {
        flex:.15,
        alignItems: "center",
        justifyContent: "space-between"
    },
    resetPassword: {
        fontFamily: fonts.extraLight,
        color: colors.darkGrey,
        textAlign: "center"
    },
    switchButton: {

    },
    switchButtonText: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.blue,
        paddingTop: 50
    },
    submitButton: {
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    submitButtontext: {
        fontFamily: fonts.extraBold,
        fontWeight: "bold",
        fontSize: 15,
        padding: 17.5,
        color: colors.blue
    },
    formButton: {
        backgroundColor: colors.lightGrey,
        padding: 15,
        margin: 10,
        borderRadius: 10
    },
    detailsButton:{
        fontFamily:fonts.extraLight
    },
    detailsButtonText:{
        fontFamily:fonts.extraLight
    },
    formButtonText: {
        fontFamily: fonts.semiBold,
        color: colors.blue,
        fontSize:15
    }
})

//NEXT TRY AND FIGURE OUT THE CUSTOM FONTS

export default styles


