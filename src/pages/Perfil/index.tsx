import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Perfil() {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut(){
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
        <Text>Pagina Perfil</Text>
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