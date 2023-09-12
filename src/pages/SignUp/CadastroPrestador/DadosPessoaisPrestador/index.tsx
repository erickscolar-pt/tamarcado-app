import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../../../routes/auth.routes";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../../contexts/AuthContext";
import axios from 'axios';

export type TypeDadosPessoaisCliente = {
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    telefone?: string;
    email?: string;
}
export type DadosEmpresa = {
    cnpj: string,
    tipo: string,
    porte: string,
    nome: string,
    fantasia: string,
    abertura: string,
    atividade_principal: [
      {
        code: string,
        text: string
      }
    ],
    atividades_secundarias: [
      {
        code: string,
        text: string
      }
    ],
    natureza_juridica: string,
    logradouro: string,
    numero: string,
    complemento: string,
    cep: string,
    bairro: string,
    municipio: string,
    uf: string,
    email: string,
    telefone: string,
    efr: string,
    situacao: string,
    data_situacao: string,
    motivo_situacao: string,
    situacao_especial: string,
    data_situacao_especial: string,
    capital_social: string,
    qsa: [
      {
        nome: string,
        qual: string,
        pais_origem: string,
        nome_rep_legal: string,
        qual_rep_legal: string
      }
    ]
  }
export default function DadosPessoaisPrestador() {

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const { consultaCnpj } = useContext(AuthContext);

    const [nomeEmpresa, setNomeEmpresa] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [descricao, setDescricao] = useState('')

    const limparCaracteresEspeciais = (cnpj: any) => {
        // Use uma expressão regular para remover todos os caracteres não numéricos
        return cnpj.replace(/\D/g, '');
    };
    
    async function consultarCnpj () {
        const cnpjLimpo = limparCaracteresEspeciais(cnpj);

        try {
            await consultaCnpj(cnpjLimpo).then( (res)=>{
                if (res) {
                    const dadosEmpresa: DadosEmpresa = JSON.parse(res);
                    console.log(dadosEmpresa)
    
                    setNomeEmpresa(dadosEmpresa.fantasia);
                    setCnpj(dadosEmpresa.cnpj);
                    setTelefone(dadosEmpresa.telefone);
                    setEmail(dadosEmpresa.email);
        
                } else {
                    console.error('CNPJ não encontrado.');
                }
            }); 

            
        } catch (error) {
            console.error('Erro ao consultar o CNPJ:', error);
        }
    };

    function hadleNext() {
        if (
            nomeEmpresa === '' ||
            cnpj === '' ||
            telefone === '' ||
            email === ''
        ) {
            Alert.alert('Dados Pessoais', 'Preencha todos os campos obrigatorios')
            return;
        }


        navigation.navigate('EnderecoPrestador')
        const obj: TypeDadosPessoaisCliente = { nome: nomeEmpresa, sobrenome: "", cpf: cnpj, email: email, telefone: telefone };
        AsyncStorage.setItem('ObjDadosPessoais', JSON.stringify(obj))
    }

    return (
        <ImageBackground
            source={require('../../../../assets/imgfundo2.png')}
            resizeMode="cover"
            style={styles.container}
        >
            <Text style={styles.h2}>Dados Pessoais</Text>

            <View style={styles.inputContainer}>
                <TextInputMask
                    type={'cnpj'}
                    value={cnpj}
                    onChangeText={setCnpj}
                    style={styles.input}
                    placeholder="CNPJ*"
                    placeholderTextColor={'white'}
                    onBlur={consultarCnpj}
                />
                <TextInput value={nomeEmpresa} onChangeText={setNomeEmpresa} placeholder="Nome da Empresa*" style={styles.input} placeholderTextColor="#fff" />
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

                <TextInput value={email} onChangeText={setEmail} placeholder="E-mail address*" style={styles.input} placeholderTextColor="#fff" />
                <TextInput value={descricao} onChangeText={setDescricao} placeholder="Descricao da empresa" style={styles.input} placeholderTextColor="#fff" />

            </View>
            <TouchableOpacity onPress={hadleNext} style={styles.button} >
                <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9F8D4C'
    },
    logo: {
        marginBottom: 14
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: '100%',
        height: 40,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center'
    },
    button: {
        width: '93%',
        height: 40,
        backgroundColor: '#78610F',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    buttonBack: {
        width: '90%',
        height: 40,
        backgroundColor: '#998028',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    h2: {
        color: '#FFF',
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 42,
        height: 48,
        display: "flex",
        alignItems: "center",
        textAlign: "center"
    }
})