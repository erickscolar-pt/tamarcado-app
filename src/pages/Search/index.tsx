import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import { api } from '../../services/api'
import { useEffect, useState } from 'react';
import { TypeEnderecoCliente } from '../SignUp/CadastroCliente/EnderecoCliente';
import { SafeAreaView } from 'react-native-safe-area-context';

export type UnidadesProps = {
  nomeempresa: string;
  cnpj: string;
  telefone: string;
  social_instagram: string;
  social_facebook: string;
  descricao: string;
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
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default function Search() {
  const [empresas, setEmpresas] = useState<UnidadesProps[] | []>([]);



  useEffect(() => {
    async function loadUnidades() {
      const response = await api.get('/unidades')
      setEmpresas(response.data)

    }
    loadUnidades()
  }, [])

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
            {
              empresas.map((item, index) => (
                <View style={styles.content} key={index}>
                  <Text>{item?.nomeempresa}</Text>
                </View>
              ))
            }
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>

    /*  */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'

  },
  scroll: {
    flex: 1
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    width: '90%',
    height: 120,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderRadius:5
  }
});