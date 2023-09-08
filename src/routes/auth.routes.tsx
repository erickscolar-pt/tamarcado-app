import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DadosPessoaisCliente from "../pages/SignUp/CadastroCliente/DadosPessoaisCliente";
import EnderecoCliente from "../pages/SignUp/CadastroCliente/EnderecoCliente";
import SenhaCliente from "../pages/SignUp/CadastroCliente/SenhaCliente";
import TypeDadosPessoaisCliente from "../pages/SignUp/CadastroCliente/DadosPessoaisCliente";

export type StackPramsList = {
    SignUp: undefined;
    SignIn: undefined;
    DadosPessoaisCliente: undefined;
    EnderecoCliente: undefined;
    SenhaCliente: undefined;
  };

const Stack = createNativeStackNavigator<StackPramsList>();

function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn}/>
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp}/>
            {/* Tela de Cadastro de Cliente */}
           <Stack.Screen options={{ headerShown: false }} name="DadosPessoaisCliente" component={DadosPessoaisCliente}/>
            <Stack.Screen options={{ headerShown: false }} name="EnderecoCliente" component={EnderecoCliente}/>
            <Stack.Screen options={{ headerShown: false }} name="SenhaCliente" component={SenhaCliente}/>
        </Stack.Navigator>
    )
}

export default AuthRoutes;