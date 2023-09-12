import React, {useState, useContext} from "react";
import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from '../../routes/auth.routes';
import { useNavigation } from "@react-navigation/native";

export default function SignUp(){

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const sendImmediateNotification = async () => {
        const notificationContent = {
          title: 'Título da notificação',
          body: 'Corpo da notificação',
        };
      

      };

    function handleBackLogin(){
        navigation.navigate("SignIn")
    }

    function handleStartCadastroCliente(){
        sendImmediateNotification()
        navigation.navigate("DadosPessoaisCliente");
    }

    function handleStartCadastroPrestador(){
        sendImmediateNotification()
        navigation.navigate("DadosPessoaisPrestador");
    }

    return(
        <ImageBackground 
        source={require('../../assets/imgfundo2.png')}
        resizeMode="cover"
        style={styles.container}
        >
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={handleStartCadastroCliente} style={styles.button}>
                        <Text style={styles.buttonText}>Cliente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleStartCadastroPrestador}>
                        <Text style={styles.buttonText}>Prestador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBack} onPress={handleBackLogin}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9F8D4C'
    },
    logo:{
        marginBottom:14
    },
    inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14
    },
    input:{
        width:'90%',
        height: 40,
        borderStyle:'solid',
        borderColor: '#fff',
        borderWidth:1,
        borderRadius:6,
        paddingHorizontal:8,
        color:'#fff',
        marginBottom:12,
        textAlign:'center'
    },
    button:{
        width:'90%',
        height: 40,
        backgroundColor: '#78610F',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        margin:4
    },
    buttonBack:{
        width:'90%',
        height: 40,
        backgroundColor: '#998028',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        margin:4
    },
    buttonText:{
        fontSize: 20,
        color:'#fff',
        fontWeight:'bold'
    }
})