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
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default function Search() {
  const [empresas, setEmpresas] = useState<UnidadesProps[] | []>([]);
  const [search, setSearch] = useState('')

  async function handleLogin(id: string) {
    console.log('Empresa..::' + id)

  }


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
        <Text style={styles.titlePage}>Search</Text>

        <View style={styles.search}>
          <FontAwesome style={styles.icon} name="search" size={24} color="#333" />
          <TextInput
            style={styles.input}
            value={search} onChangeText={setSearch}
            placeholder="Pesquisar..."
          />
        </View>
        <SafeAreaView style={styles.scroll}>
          <ScrollView>
            {
              empresas.map((item, index) => (
                <View style={styles.card} key={index}>
                  <Image
                    source={require('../../assets/imgOff.png')}
                    style={styles.imagem}
                  />
                  <View style={styles.info}>
                    <Text style={styles.title}>Estabelecimento</Text>
                    <Text style={styles.nomeEmpresa}>{item?.nomeempresa}</Text>

                    <Text style={styles.nomeEmpresa}>{
                      item?.endereco === null || item?.endereco === undefined ?
                      'Sem endereço' :
                      item?.endereco.nomeRua
                    }</Text>

                    <View style={styles.boxAgendarAvaliable}>
                      <Image
                        source={require('../../assets/avaliable.png')}
                        style={styles.imagem}
                      />
                      <TouchableOpacity style={styles.button} onPress={(() => { handleLogin(item?.cnpj) })}>
                        <Text style={styles.buttonText}>AGENDAR</Text>
                      </TouchableOpacity>
                    </View>


                  </View>
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
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  titlePage:{
    justifyContent:'center',
    textAlign:'center',
    color:'#FFF',
    fontSize:24,
    marginTop:20
  },
  search: {
    width: '95%',
    height: 40,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    color: '#000',
    textAlign: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },
  input: {
    width: '90%',
    alignContent: 'center',
  },

  icon: {
    width: '10%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: {
    flex: 1,
    marginBottom: 60,
  },
  card: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
    height: HEIGHT / 4.5,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(155, 135, 27, 0.72)',
    justifyContent: 'space-between',
    borderRadius: 6,
    flexDirection: 'row'
  },
  imagem: {
    marginLeft: 10,
    width: WIDTH - 280,
    resizeMode: 'contain', // Como a imagem se ajustará ao espaço disponível (pode ser 'cover', 'contain', etc.)
  },
  info: {
    margin: 10,
    width: '80%',
    height: HEIGHT / 6
  },
  title: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400'
  },
  nomeEmpresa: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400'
  },
  boxAgendarAvaliable: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'baseline'
  },
  button: {
    width: '40%',
    height: 30,
    backgroundColor: '#9F744C',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold'
  }
});