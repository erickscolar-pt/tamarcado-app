import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, UserProps } from '../../contexts/AuthContext';
import fb from '../../contexts/FireBaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function Perfil() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { signOut } = useContext(AuthContext);
  const [user, setUser] = useState<UserProps>()
  const [isLoading, setIsLoading] = useState(true); // Adiciona um estado de carregamento
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\s]/g;
  const storage = getStorage(fb);
  const metadata = {
    contentType: 'image/jpeg'
  };

  useEffect( () => {
    const fetchImage = async () => {
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

        if (hasUser[0] && hasUser[0].cpfOrCnpj) {
          const storageRef = ref(storage, `imagens/${hasUser[0].cpfOrCnpj.replace(regex, '')}`);
          const metadata = await getDownloadURL(storageRef);
          setImageURL(metadata);
        } else {
          //console.warn('Aviso: user ou user.cpfOrCnpj é indefinido.');
        }
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user?.cpfOrCnpj) {
      fetchImage();
    } else {
      setIsLoading(false);
    }

    fetchImage();
    const intervalId = setInterval(() => {
      fetchImage();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);


  const fetchImage = async () => {
    try {
      const storageRef = ref(storage, 'imagens/' + user?.cpfOrCnpj.replace(regex, ''));
      getDownloadURL(storageRef)
        .then((metadata) => {
          setImageURL(metadata)
        })
        .catch((error) => {
        });
    } catch (err) {
      console.log(err)
    }
  }


  async function handleUpload() {

    if (!permission?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [8, 8],
        base64: true
      });

      if (!result.canceled) {
        const storageRef = ref(storage, 'imagens/' + user?.cpfOrCnpj.replace(regex, ''));
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();


        uploadBytes(storageRef, blob, metadata).then((res) => {
        }).catch(err => {
          console.log(err)
        })

        fetchImage();
      }
    } else {
      console.log('Permissão negada para acessar a galeria');
    }
  }


  async function handleSignOut() {
    await signOut();
  }

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
        <Text style={styles.title}>Perfil</Text>
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : (
          <Button title="Carregar Imagem" onPress={() => { handleUpload() }} />
        )}
        {imageURL ?
          <Button color={"#563D3D"} title="Carregar Imagem" onPress={() => { handleUpload() }} />
          : ""
        }

        <Text style={styles.infoPerfil}>{user?.nome}</Text>
        <Text style={styles.infoPerfil}>{user?.sobrenome}</Text>
        <Text style={styles.infoPerfil}>{user?.cpfOrCnpj}</Text>
        <Text style={styles.infoPerfil}>{user?.email}</Text>
        <Text style={styles.infoPerfil}>{user?.telefone}</Text>
        <Text style={styles.infoPerfil}>{user?.endereco?.nomeRua === 'undefined' ? "Sem endereço cadastrado" : user?.endereco?.nomeRua}</Text>

        <TouchableOpacity style={styles.button} onPress={(() => { handleSignOut() })}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>




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
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoPerfil: {
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    width: '60%',
    margin: 5,
    padding: 15
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 20,
  },
});