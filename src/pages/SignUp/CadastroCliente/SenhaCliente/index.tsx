import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity,ImageBackground, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../../../routes/auth.routes"; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from "../..";
import { AuthContext } from "../../../../contexts/AuthContext";
import notifee, {AndroidImportance} from '@notifee/react-native'
import { TypeEnderecoCliente } from "../EnderecoCliente";


export default function SenhaCliente(){
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const { signUp } = useContext(AuthContext);


    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpfOrCnpj, setCpfOrCnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')

    const [endereco, setEndereco] = useState<TypeEnderecoCliente>({
        bairro: '',
        cep:'',
        cidade:'',
        estado:'',
        nomeRua:'',
        numeroResidencia:'',
        pais:'',
        complemento:'',
        email:'',
        numeroTelefone:''
    })

    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const nivel_id = 1;
    const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\s]/g;

/*     async function displayNotification() {
        await notifee.requestPermission();
    
        const channelId = await notifee.createChannel({
          id: 'teste',
          name: 'sales',
          vibration: true,
          importance: AndroidImportance.HIGH
        });
    
        await notifee.displayNotification({
          id: '7',
          title: 'Bem vindo ao Tá Marcado',
          body: 'Esse é um app especial para pessoas especiais!',
          android: {
            channelId
          }
        });
      } */
    
      useEffect(() => {
        AsyncStorage.getItem('ObjEnderecoCliente')
          .then((obj: any) => {
            if (obj) {
              const objRec: TypeEnderecoCliente = JSON.parse(obj);
              setEndereco(objRec);
            }
          })
          .catch((error: any) => {
            // Lide com erros de AsyncStorage aqui
          });
      }, []); // Dependências vazias para executar apenas uma vez
    AsyncStorage.getItem('ObjDadosPessoais').then((obj:any) => {
        const objRec = JSON.parse(obj)
        setNome(objRec.nome)
        setSobrenome(objRec.sobrenome)
        setEmail(objRec.email)
        setCpfOrCnpj(objRec.cpf)
        setTelefone(objRec.telefone)
    })
    console.log(nome)
    console.log(sobrenome)
    console.log(cpfOrCnpj.replace(regex, ''))
    console.log(telefone.replace(regex, ''))
    console.log(email)
    console.log(endereco)
    
 
    async function handleCadastro(){
        if(senha !== confirmSenha){
            Alert.alert('Senha','As senhas não são iguais')
            return;
        }
        if(senha === '' || confirmSenha === ''){
            Alert.alert('Senha','Preencha todos os campos de senha para avançar')
            return;
        }
        await signUp({ nome, sobrenome, cpfOrCnpj, email, endereco, telefone, senha, nivel_id }).then((res:any)=>{
            console.log('res..::'+res.status)
            if(res === false || res === 'false'){
                Alert.alert('Erro ao Cadastrar','Já existe cadastro em nosso sistema com essas informações! Por favor, tente cadastrar com um novo e-mail e documento diferente.')
            }else{
                navigation.navigate("SignIn")
            }
        })
    }
    function handleBackEndereco(){
        navigation.navigate("EnderecoCliente")
    }

    return(
        <ImageBackground 
        source={require('../../../../assets/imgfundo2.png')}
        resizeMode="cover"
        style={styles.container}
        >
                <Text style={styles.h2}>Senha</Text>
                
                <View style={styles.inputContainer}>

                <TextInput value={senha} onChangeText={setSenha} placeholder="Senha*" style={styles.input} placeholderTextColor="#fff" secureTextEntry={true}/>
                <TextInput value={confirmSenha} onChangeText={setConfirmSenha} placeholder="Repetir Senha*" style={styles.input} placeholderTextColor="#fff" secureTextEntry={true}/>

                </View>
                <TouchableOpacity onPress={handleCadastro} style={styles.button} >
                        <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBackEndereco} style={styles.button} >
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