import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";

const Stack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    )
}

export default AuthRoutes;