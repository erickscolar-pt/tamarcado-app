import React, { useState, createContext, ReactNode, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, consultarCep, consultarCnpj } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../routes/auth.routes";
import { TypeEnderecoCliente } from "../pages/SignUp/CadastroCliente/EnderecoCliente";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loading: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<any>;
    signOut: () => Promise<void>;
    consultaCnpj: (credentials: any) => Promise<any>
    consultaCep: (credentials: any) => Promise<any>
}

export type UserProps = {
    id:number;
    email: string;
    nome: string;
    sobrenome: string;
    telefone: string;
    endereco: Endereco
    cpfOrCnpj: string;
    token: string;
    empresa?: EmpresaProps[]
}

type Endereco = {
    nomeRua:string
    numeroResidencia:string
    complemento?:string
    bairro:string
    cidade:string
    estado:string
    cep:string
    pais: string
    numeroTelefone?:string
    email?: string
}

type SignUpProps = {
    nome: string,
    sobrenome: string,
    cpfOrCnpj: string,
    email: string,
    telefone: string,
    endereco: TypeEnderecoCliente,
    senha: string,
    nivel_id: number
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

function AuthProvider({ children }: AuthProviderProps) {



    const [user, setUser] = useState<UserProps>({
        id:0,
        email: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        endereco: {
            bairro:'',
            cep:'',
            cidade:'',
            estado:'',
            nomeRua:'',
            numeroResidencia:'',
            pais:'',
            complemento:'',
            email:'',
            numeroTelefone:''
        },
        cpfOrCnpj: '',
        token: '',
        empresa: []
    })
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    const isAuthenticated = user.cpfOrCnpj === null || user.cpfOrCnpj === '' ? false : true;

    useEffect(() => {

        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@tamarcado');
            let hasUser: [UserProps] = JSON.parse(userInfo || '{}')

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser[0].token}`
                setUser({
                    id: hasUser[0].id,
                    nome: hasUser[0].nome,
                    sobrenome: hasUser[0].sobrenome,
                    telefone: hasUser[0].telefone,
                    endereco: hasUser[0].endereco,
                    cpfOrCnpj: hasUser[0].cpfOrCnpj,
                    email: hasUser[0].email,
                    empresa: hasUser[0].empresa,
                    token: hasUser[0].token
                })
            }

            setLoading(false);

        }


        getUser();

    }, [])

    async function signIn({ username, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/auth/signin', {
                username,
                password
            })
            console.log(response.data)

            const { id, nome, sobrenome, telefone, endereco ,email, cpfOrCnpj, token, empresa } = response.data;


            const data = {
                ...response.data
            };

            await AsyncStorage.setItem('@tamarcado', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                nome,
                sobrenome,
                telefone,
                endereco,
                email,
                cpfOrCnpj,
                token,
                empresa,
            })

            setLoadingAuth(false)
            return data;
        } catch (err) {
            console.log('erro ao acessar..::', err);
            setLoadingAuth(false)
            return false;
        }
    }

    async function signUp({ nome, sobrenome, cpfOrCnpj, email, endereco, telefone, senha, nivel_id }: SignUpProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/users', {
                nome,
                sobrenome,
                cpfOrCnpj,
                email,
                telefone,
                endereco,
                senha,
                nivel_id
            })
            console.log('retorno api..::' + response)
            //navigation.navigate("SignIn")
            setLoadingAuth(false)
            return JSON.stringify(response.data.status);
        } catch (err) {
            console.log('error..::' + err)
            setLoadingAuth(false)
            return false;
        }

    }

    async function consultaCnpj(cnpj: any) {
        try {
            const response = await consultarCnpj(cnpj)
            return JSON.stringify(response);
        } catch (err) {
            console.log('error..::' + err)
            return false;
        }
    }

    async function consultaCep(cep: any) {
        try {
            const response = await consultarCep(cep)
            return JSON.stringify(response);
        } catch (err) {
            console.log('error..::' + err)
            return false;
        }
    }


    

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id:0,
                    email: '',
                    nome:'',
                    sobrenome:'',
                    telefone:'',
                    endereco: {
                        bairro:'',
                        cep:'',
                        cidade:'',
                        estado:'',
                        nomeRua:'',
                        numeroResidencia:'',
                        pais:'',
                        complemento:'',
                        email:'',
                        numeroTelefone:''
                    },
                    cpfOrCnpj: '',
                    token: '',
                    empresa: []
                })
            })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut, loading, consultaCnpj, consultaCep }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider.');
    }
  
    return context;
  }
  
  export {AuthProvider, useAuth};