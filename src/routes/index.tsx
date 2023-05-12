import React,{useContext} from 'react';

import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../contexts/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){
    const { isAuthenticated } = useContext(AuthContext);
    const loading = false;
    console.log(isAuthenticated)
    if(loading){
        return(
            <LinearGradient 
                    colors={['#D6AE20', '#998028']}
                    style={{
                    flex:1,
                    backgroundColor: '#998028',
                    justifyContent: 'center',
                    alignItems:'center'
                }}
            >
                <ActivityIndicator size={60} color="#F5f7fb"/>
            </LinearGradient>
        )
    }

    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;