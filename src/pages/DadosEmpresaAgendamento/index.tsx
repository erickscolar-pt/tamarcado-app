import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    TextInput
} from 'react-native'
import { api } from '../../services/api'
import { useEffect, useState } from 'react';
import { TypeEnderecoCliente } from '../SignUp/CadastroCliente/EnderecoCliente';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';
import Swiper from 'react-native-swiper';

export type UnidadesProps = {
    nomeempresa: string;
    cnpj: string;
    telefone: string;
    social_instagram: string;
    social_facebook: string;
    descricao: string;
    endereco: TypeEnderecoCliente;
    usuario: {
        nome: string;
        sobrenome: string;
        cpfOrCnpj: string;
        email: string
        telefone: string;
        endereco?: TypeEnderecoCliente;
        senha: string;
        nivel_id: number;
    }
}
type RouteDetailParams = {
    DadosEmpresaAgendamento: {
        nomeempresa: string;
        cnpj: string;
        telefone: string;
        social_instagram: string;
        social_facebook: string;
        descricao: string;
        endereco: TypeEnderecoCliente;
        idUsuario:string;
        usuario: {
            nome: string;
            sobrenome: string;
            cpfOrCnpj: string;
            email: string
            telefone: string;
            endereco?: TypeEnderecoCliente;
            senha: string;
            nivel_id: number;
        }
    }
}
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
type DadosEmpresaAgendamentoRouteProp = RouteProp<RouteDetailParams, 'DadosEmpresaAgendamento'>

export default function DadosEmpresaAgendamento() {

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const route = useRoute<DadosEmpresaAgendamentoRouteProp>();



    const [empresas, setEmpresas] = useState<UnidadesProps[] | []>([]);
    const [search, setSearch] = useState('')


    useEffect(() => {
        async function loadUnidades() {
            const response = await api.get('/unidades')
            setEmpresas(response.data)

        }
        loadUnidades()
    }, [])

    /* 
        "data_hora": "2023-09-06 12:10:00.000",
        "servico_id": 1, na tela de agendamento
        "status_id": 1, status de agendamento
        "unidade_id": 3, unidade
        "atendente_id": 2, qual atendente
        "usuario_id": 3 usuario 
     */
    function handleAgendar(){
        navigation.navigate('AgendamentoData',{cnpj:route?.params?.cnpj, idUsuario:route?.params?.idUsuario})
    }

    return (
        <LinearGradient
            colors={['#E1ADAA', 'rgba(255, 255, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', '#D09234']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <SafeAreaView style={styles.scroll}>
                    <ScrollView>
                        <View style={styles.card}>
                            <Text style={styles.dadosEmpresa}>{route?.params?.nomeempresa}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.dadosEmpresa}>{route?.params?.descricao}</Text>
                        </View>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.instagram}>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.facebook}>Instagram</Text>
                        </TouchableOpacity>

                        <Swiper style={styles.wrapper} showsButtons={false}>
                            <View style={styles.slide}>
                                <Image
                                    source={require('../../assets/imgOff.png')}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.slide}>
                                <Image
                                    source={require('../../assets/imgOff.png')}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.slide}>
                                <Image
                                    source={require('../../assets/imgOff.png')}
                                    style={styles.image}
                                />
                            </View>
                        </Swiper>


                        <View style={styles.cardEndereco}>
                            <Text style={styles.endereco}>{
                                route?.params.endereco === null || route?.params.endereco === undefined ?
                                    'Sem endereço' :
                                    route?.params.endereco.nomeRua
                            }</Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                onPress={handleAgendar}
                                style={styles.buttonAgendar}
                            >
                                <Text style={styles.clock}>
                                    <FontAwesome style={styles.icon} name="calendar" size={35} color="#333" />

                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll: {
        flex: 1,
        marginBottom: 60,
    },
    card: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        width: '90%',
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,

    },
    dadosEmpresa: {
        color: '#9F744C',
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '400',
    },
    button: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#998028',
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 15,
        padding: 15
    },
    instagram: {
        padding: 3,
        textAlign: 'center',
        fontSize: 24,
        color: '#FFF'
    },
    facebook: {
        padding: 3,
        textAlign: 'center',
        fontSize: 24,
        color: '#FFF'
    },
    cardEndereco: {
        width: '90%',
        backgroundColor: 'rgba(153, 128, 40, 0.23)',
        borderRadius: 5,
        marginTop: 5,
        marginHorizontal: 15,
        padding: 15
    },
    wrapper: {
        height: HEIGHT - 500
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    endereco: {
        fontSize: 13,
        textAlign: 'center',
        color: '#1F1903',
        fontStyle: 'normal',
        fontWeight: '400'
    },
    buttonAgendar:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    clock:{
        margin:10,
        padding:25,
        backgroundColor:'#998028',
        borderRadius:100
    },
    icon:{
        color:'#FFF'
    }
});