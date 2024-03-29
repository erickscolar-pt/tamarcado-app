import React, {useState, useContext} from "react";
import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../../../routes/auth.routes"; 
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import SenhaPrestador from "../SenhaPrestador";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../../contexts/AuthContext";

export type TypeEnderecoPrestador = {
    nomeRua:string
    numeroResidencia:string
    complemento?:string
    bairro:string
    cidade:string
    estado:string
    cep:string
    pais: string
    numeroTelefone?:string
    email?: string
}

interface Endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }

export default function EnderecoPrestador(){

    const { consultaCep } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    

    const [rua, setRua] = useState('')
    const [numeroResidencial, setNumeroResidencial] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [cep, setCep] = useState('')
    const [pais, setPais] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    AsyncStorage.getItem('ObjDadosPessoais').then((obj:any) => {
        const objRec = JSON.parse(obj)
        setEmail(objRec.email)
        setTelefone(objRec.telefone)
    })

    const obj: TypeEnderecoPrestador = {
        nomeRua: rua, 
        numeroResidencia: numeroResidencial, 
        complemento: complemento, 
        bairro: bairro, 
        cidade: cidade, 
        estado: estado, 
        cep:cep.replace(/\-|\-/g, ''), 
        pais: pais, 
        numeroTelefone: telefone, 
        email: email
    };

    const limparCaracteresEspeciais = (cnpj: any) => {
        // Use uma expressão regular para remover todos os caracteres não numéricos
        return cnpj.replace(/\D/g, '');
    };

    async function consultarCnpj () {
        const cepLimpo = limparCaracteresEspeciais(cep);

        try {
            await consultaCep(cepLimpo).then( (res)=>{
                if (res) {
                    const dadosEndereco: Endereco = JSON.parse(res);

                    setRua(dadosEndereco.logradouro)
                    setBairro(dadosEndereco.bairro)
                    setCidade(dadosEndereco.localidade)
                    setEstado(dadosEndereco.uf)
                    setPais("Brasil")
                    
    
        
                } else {
                    console.error('CEP não encontrado.');
                }
            }); 

            
        } catch (error) {
            console.error('Erro ao consultar o CNPJ:', error);
        }
    };

    function hadleNext(){
        if(
            cep === '' ||
            rua === '' ||
            numeroResidencial === ''
            ){
            Alert.alert('Endereço', 'Preencha os campos obrigatorios de endereço')
            return;
        }
        AsyncStorage.setItem('ObjEnderecoPrestador',JSON.stringify(obj))
        navigation.navigate('SenhaPrestador')
    }

    function handleBack(){
        AsyncStorage.setItem('ObjEnderecoPrestador',JSON.stringify(obj))
        navigation.navigate('DadosPessoaisPrestador')
    }
    

    return(
        <ImageBackground 
        source={require('../../../../assets/imgfundo2.png')}
        resizeMode="cover"
        style={styles.container}
        >
                <Text style={styles.h2}>Endereço</Text>
                
                <View style={styles.inputContainer}>

                    <TextInputMask
                        type="custom"
                        options={{
                            mask: '99999-999'
                        }}
                        value={cep} onChangeText={setCep} keyboardType={'numeric'} placeholder="CEP*" style={styles.input} placeholderTextColor="#fff"
                        onBlur={consultarCnpj}
                    />
                    <TextInput value={rua} onChangeText={setRua} placeholder="Nome da Rua*" style={styles.input} placeholderTextColor="#fff"/>

                    <TextInput value={numeroResidencial} onChangeText={setNumeroResidencial} keyboardType={'numeric'} placeholder="N° Residencial*" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={complemento} onChangeText={setComplemento} placeholder="Complemento" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={bairro} onChangeText={setBairro} placeholder="Bairro" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={cidade} onChangeText={setCidade} placeholder="Cidade" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={estado} onChangeText={setEstado} placeholder="Estado" style={styles.input} placeholderTextColor="#fff"/>
                    <TextInput value={pais} onChangeText={setPais} placeholder="País" style={styles.input} placeholderTextColor="#fff"/>

                </View>
                <TouchableOpacity onPress={hadleNext} style={styles.button} >
                        <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBack} style={styles.button} >
                        <Text style={styles.buttonText}>Voltar</Text>
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