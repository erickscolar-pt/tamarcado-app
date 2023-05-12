import React, {useState, createContext, ReactNode} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    email: string;
    cpfOrCnpj: string;
    token: string;
    empresa?: EmpresaProps[]
}


type EmpresaProps = {
    id: number
    nomeempresa: string;
    telefone: string;
    endereco: string;
    cnpj: string;
    social_instagram: string;
    social_facebook: string;
    descricao: string;
    created_at: string;
    updated_at: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    username: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){
    
    const [user, setUser] = useState<UserProps>({
        email: '',
        cpfOrCnpj: '',
        token: '',
        empresa: []
    })

    const [loadingAuth, setLoadingAuth]= useState(false)

    const isAuthenticated = user.cpfOrCnpj === null || user.cpfOrCnpj === '' ? false : true;

    async function signIn({username, password}: SignInProps) {
        setLoadingAuth(true);

        try{
            const response = await api.post('/auth/signin',{
                username,
                password
            })
            console.log(response.data)

            const {email,cpfOrCnpj, token, empresa} =response.data;


            const data = {
                ...response.data
            };

            await AsyncStorage.setItem('@tamarcado',JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                email,
                cpfOrCnpj,
                token,
                empresa,
            })

            setLoadingAuth(false)

        }catch(err){
            console.log('erro ao acessar..::',err);
            setLoadingAuth(false)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}