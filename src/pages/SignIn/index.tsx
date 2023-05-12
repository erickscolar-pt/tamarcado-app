import React, {useState, useContext} from "react";
import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn(){

    const { signIn } = useContext(AuthContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(){
        if(username === '' || password === ''){
            return;
        }

        await signIn({username, password})
    }

    return(
        <ImageBackground 
        source={require('../../assets/imgfundo.png')}
        resizeMode="cover"
        style={styles.container}
        >
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')} 
            />
                <View style={styles.inputContainer}>
                    <TextInput value={username} onChangeText={setUsername} placeholder="E-mail address" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={password} onChangeText={setPassword} placeholder="Password" style={styles.input} placeholderTextColor="#fff" secureTextEntry={true}/>
                    
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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