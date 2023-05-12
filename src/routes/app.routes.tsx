import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Dashboard}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;