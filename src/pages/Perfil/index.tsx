import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import fb from '../../contexts/FireBaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function Perfil() {
  const { signOut } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~\s]/g;
  const { user } = useContext(AuthContext);
  const storage = getStorage(fb);
  const metadata = {
    contentType: 'image/jpeg'
  };

  console.log(user.endereco)

  useEffect(()=>{
    const storageRef = ref(storage, 'imagens/' + user.cpfOrCnpj.replace(regex, ''));
    getDownloadURL(storageRef)
    .then((metadata) => {
      setImageURL(metadata)
    })
    .catch((error) => {
    });
  },[])

  async function handleUpload() {

    if (!permission?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [8, 8],
        base64: true
      });

      if (!result.canceled) {
        const storageRef = ref(storage, 'imagens/' + user.cpfOrCnpj.replace(regex, ''));
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();


        uploadBytes(storageRef, blob, metadata).then((res) => {
          //console.log(res.ref)
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      console.log('Permissão negada para acessar a galeria');
    }
  }


  async function handleSignOut() {
    await signOut();
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
        <Button color={"#563D3D"} title="Carregar Imagem" onPress={() => { handleUpload() }} />

        <Text style={styles.infoPerfil}>{user.nome}</Text>
        <Text style={styles.infoPerfil}>{user.sobrenome}</Text>
        <Text style={styles.infoPerfil}>{user.cpfOrCnpj}</Text>
        <Text style={styles.infoPerfil}>{user.email}</Text>
        <Text style={styles.infoPerfil}>{user.telefone}</Text>
        <Text style={styles.infoPerfil}>{user.endereco?.nomeRua === 'undefined' ? "Sem endereço cadastrado": user.endereco?.nomeRua}</Text>

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
  title:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    color:'#FFF',
    textAlign:'center',
    fontSize:24,
    fontStyle:'normal',
    fontWeight:'400',
  },
  infoPerfil:{
    color:'#000',
    fontSize:16,
    textAlign:'left',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#000',
    borderStyle:'solid',
    width:'60%',
    margin:5,
    padding:15
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
    borderRadius:15,
    marginTop: 20,
  },
});