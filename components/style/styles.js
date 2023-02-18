import { StyleSheet } from "react-native"

const colors = {
    blue: "#8CBBF1",
    yellow: "#FDEDCB",
    pink: "#F9CEDF",
    grey: "#e6e6e6",
    darkGrey: "#474747",
    background: {
        dark: "grey",
        light: "white"
    },
    input:{
        dark: ""
    }
}
const fonts = {
    // medium: "MPLUSRounded1c-Medium",
    // extraBold: "MPLUSRounded1c-ExtraBold",
    // light: "MPLUSRounded1c-Light",
    // regular: "MPLUSRounded1c-Regular",
    // thin: "MPLUSRounded1c-Thin",
    // semiBold: "MPLUSRounded1c-Bold"
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
        backgroundColor:"grey "
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
        flex:  .7,
        margin: 20
    },
    inputField: {
        borderRadius: 7,
        padding: 15,
        margin: 17.5,
        shadowOffset: {width:.5, height:.5},
    },
    inputFieldContainer: {
        flexDirection: "column",
        alignContent: "space-around",
        justifyContent:"center",
    },
    inputFieldText:{
        color: "grey",
        fontFamily: fonts.thin,
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
        backgroundColor: colors.grey,
    },
    submitButtontext: {
        fontFamily: fonts.extraBold,
        fontSize: 15,
        padding: 17.5,
        color: colors.blue
    }
})

//NEXT TRY AND FIGURE OUT THE CUSTOM FONTS

export default styles


