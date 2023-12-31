import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Search from "../pages/Search";
import Agendamentos from "../pages/Agendamentos";
import DadosEmpresaAgendamento from "../pages/DadosEmpresaAgendamento";
import { TypeEnderecoCliente } from "../pages/SignUp/CadastroCliente/EnderecoCliente";
import AgendamentoData from "../pages/AgendamentoData";


export type StackPramsList = {
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
    };
    Home: undefined;
    Search: undefined;
    Agendamentos: undefined;
    Perfil: undefined;
    AgendamentoData: {
        idUsuario:string;
        cnpj:string;
    };
};

const Tab = createBottomTabNavigator<StackPramsList>();


function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: '#9F744C',
                    height: 60,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                },
            }}

        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Image source={require('../assets/iconhome.png')} />
                        }
                        return <Image source={require('../assets/iconhome.png')} />
                    }

                }}


                name="Home" component={Home}
            />



            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Image source={require('../assets/iconsearch.png')} />
                        }
                        return <Image source={require('../assets/iconsearch.png')} />
                    }
                }}
                name="Search"
                component={Search}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Image source={require('../assets/iconagendamento.png')} />
                        }
                        return <Image source={require('../assets/iconagendamento.png')} />
                    }
                }}
                name="Agendamentos"
                component={Agendamentos}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Image source={require('../assets/iconperfil.png')} />
                        }
                        return <Image source={require('../assets/iconperfil.png')} />
                    }
                }}
                name="Perfil"
                component={Perfil}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarButton: () => null
                }}
                name="DadosEmpresaAgendamento"
                component={DadosEmpresaAgendamento}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarButton: () => null
                }}
                name="AgendamentoData"
                component={AgendamentoData}
            />
        </Tab.Navigator>
    )
}

export default AppRoutes;