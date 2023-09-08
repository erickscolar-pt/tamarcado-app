import React, {useState, useContext} from "react";
import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../../../routes/auth.routes"; 
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TypeDadosPessoaisCliente = {
    nome?:string;
    sobrenome?:string;
    cpf?:string;
    telefone?:string;
    email?:string;
}

export default function DadosPessoaisCliente(){

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    
    

    function hadleNext(){
        if(
            nome === '' ||
            sobrenome === '' ||
            cpf === '' ||
            telefone === '' ||
            email === ''
            ){
            Alert.alert('Dados Pessoais','Preencha todos os campos obrigatorios')
            return;
        }


        navigation.navigate('EnderecoCliente')
        const obj: TypeDadosPessoaisCliente = {nome:nome, sobrenome: sobrenome,cpf: cpf, email: email, telefone: telefone};
        AsyncStorage.setItem('ObjDadosPessoais',JSON.stringify(obj))
    }

    return(
        <ImageBackground 
        source={require('../../../../assets/imgfundo2.png')}
        resizeMode="cover"
        style={styles.container}
        >
                <Text style={styles.h2}>Dados Pessoais</Text>
                
                <View style={styles.inputContainer}>

                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome*" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={sobrenome} onChangeText={setSobrenome} placeholder="Sobrenome*" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInputMask
                        type={'cpf'}
                        value={cpf}
                        onChangeText={setCpf}
                        style={styles.input}
                        placeholder="CPF*"
                        placeholderTextColor={'white'}
                    />
                    
                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                        }}
                        value={telefone} // Valor do telefone
                        onChangeText={setTelefone}
                        style={styles.input}
                        placeholder="Telefone*"
                        placeholderTextColor={'white'}
                    />
                    
                    <TextInput value={email} onChangeText={setEmail} placeholder="E-mail address*" style={styles.input} placeholderTextColor="#fff"/>

                </View>
                <TouchableOpacity onPress={hadleNext} style={styles.button} >
                        <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
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
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14
    },
    input:{
        width:'100%',
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
        width:'93%',
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
    },
    h2:{
        color:'#FFF',
        fontSize:32,
        fontStyle:"normal",
        fontWeight:"400",
        lineHeight: 42,
        height:48,
        display:"flex",
        alignItems:"center",
        textAlign:"center"
    }
})