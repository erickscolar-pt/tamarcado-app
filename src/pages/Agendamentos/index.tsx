import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../services/api'
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UserProps } from '../../contexts/AuthContext';
import { TypeEnderecoCliente } from '../SignUp/CadastroCliente/EnderecoCliente';
import { ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UnidadesProps = {
  nomeempresa: string;
  telefone: string;
  cnpj: string;
  social_instagram: string;
  social_facebook: string;
  descricao: string;
  endereco: TypeEnderecoCliente;
  idUsuario: string;
}
type AgendamentoProps = {
  id: number
  data_hora: Date,
  servico_id: number,
  status_id: number,
  unidade_id: number,
  atendente_id: number,
  usuario_id: number,
  agendado?: boolean,
  unidade?: UnidadesProps,
  endereco?: TypeEnderecoCliente
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export default function Agendamentos() {
  const dataAtual = new Date();
  const [agendamento, setAgendamento] = useState<AgendamentoProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true); // Adiciona um estado de carregamento
  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    const loadAgendamentos = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('@tamarcado');
        let hasUser: [UserProps] = JSON.parse(userInfo || '{}')
        
        if (Object.keys(hasUser).length > 0) {
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

        const response: any = await api.get('/agendamentos/' + JSON.stringify(hasUser[0].id));

        const agendamentosData = response.data[0]?.data?.map((agendamento: AgendamentoProps) => {
          const dataHora = new Date(agendamento.data_hora);

          return {
            ...agendamento,
            data_hora: dataHora,
            agendado: dataHora >= dataAtual,
          };
        }) || [];

        setAgendamento(agendamentosData);
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    }

    
    if (user && user?.cpfOrCnpj) {
      loadAgendamentos();
      setIsLoading(false);
    }
    
    const intervalId = setInterval(() => {
      loadAgendamentos();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);


  if (isLoading) {
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
          <View>
            <ActivityIndicator size={60} color="#F5f7fb" />
          </View>
        </LinearGradient>
      </LinearGradient>

    );
  }

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
        <Text style={styles.titlePage}>Agendamentos</Text>
        <SafeAreaView style={styles.scroll}>
          <ScrollView>
            {
              agendamento.map((item, index) => (
                item.agendado === true ?
                  <View style={styles.card} key={index}>
                    <Image
                      source={require('../../assets/imgOff.png')}
                      style={styles.imagem}
                    />
                    <View style={styles.info}>
                      <Text style={styles.title}>Estabelecimento</Text>
                      <Text style={styles.infoAgendamento}>{item?.unidade?.nomeempresa}</Text>
                      <Text style={styles.infoAgendamento}>
                        {item?.data_hora === undefined ? 'Sem data agendada' :
                          item?.data_hora.toLocaleDateString('pr-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric'
                          })
                        }
                      </Text>
                      <Text style={styles.infoAgendamento}>
                        {item?.data_hora === undefined ? 'Sem data agendada' :
                          item?.data_hora.toLocaleTimeString('pr-BR', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })
                        }
                      </Text>

                      <Text style={styles.infoAgendamento}>{
                        item?.endereco === null || item?.endereco === undefined ?
                          'Sem endereço' :
                          item?.endereco.nomeRua
                      }</Text>

                      <View style={styles.boxAgendarAvaliable}>

                        <TouchableOpacity style={styles.button}
                          onPress={(() => { })}>
                          <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>


                    </View>
                  </View>
                  : ""

              ))
            }
          </ScrollView>
        </SafeAreaView>

      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  scroll: {
    flex: 1,
    marginBottom: 60,
  },
  titlePage: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 24,
    marginTop: 20
  },
  card: {
    alignSelf: 'center',
    width: '95%',
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(155, 135, 27, 0.72)',
    justifyContent: 'space-between',
    borderRadius: 6,
    flexDirection: 'row'
  },
  imagem: {
    width: WIDTH - 210,
    resizeMode: 'contain', // Como a imagem se ajustará ao espaço disponível (pode ser 'cover', 'contain', etc.)
  },
  info: {
    margin: 10,
    width: '80%',
  },
  title: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400'
  },
  infoAgendamento: {
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
    alignItems: 'baseline',
    maxWidth: WIDTH - 200
  },
  button: {
    width: '40%',
    height: 30,
    backgroundColor: '#FF2E00',
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
  },
});