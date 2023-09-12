import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DadosPessoaisCliente from "../pages/SignUp/CadastroCliente/DadosPessoaisCliente";
import EnderecoCliente from "../pages/SignUp/CadastroCliente/EnderecoCliente";
import SenhaCliente from "../pages/SignUp/CadastroCliente/SenhaCliente";
import TypeDadosPessoaisCliente from "../pages/SignUp/CadastroCliente/DadosPessoaisCliente";
import DadosPessoaisPrestador from "../pages/SignUp/CadastroPrestador/DadosPessoaisPrestador";
import EnderecoPrestador from "../pages/SignUp/CadastroPrestador/EnderecoPrestador";
import SenhaPrestador from "../pages/SignUp/CadastroPrestador/SenhaPrestador";

export type StackPramsList = {
    SignUp: undefined;
    SignIn: undefined;
    DadosPessoaisCliente: undefined;
    EnderecoCliente: undefined;
    SenhaCliente: undefined;
    DadosPessoaisPrestador: undefined;
    EnderecoPrestador: undefined;
    SenhaPrestador: undefined;
};

const Stack = createNativeStackNavigator<StackPramsList>();

function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            {/* Tela de Cadastro de Cliente */}
            <Stack.Screen options={{ headerShown: false }} name="DadosPessoaisCliente" component={DadosPessoaisCliente} />
            <Stack.Screen options={{ headerShown: false }} name="EnderecoCliente" component={EnderecoCliente} />
            <Stack.Screen options={{ headerShown: false }} name="SenhaCliente" component={SenhaCliente} />
            {/* Tela de Cadastro de Prestador */}
            <Stack.Screen options={{ headerShown: false }} name="DadosPessoaisPrestador" component={DadosPessoaisPrestador} />
            <Stack.Screen options={{ headerShown: false }} name="EnderecoPrestador" component={EnderecoPrestador} />
            <Stack.Screen options={{ headerShown: false }} name="SenhaPrestador" component={SenhaPrestador} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;