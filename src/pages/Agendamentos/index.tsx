import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function Agendamentos() {
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
        <Text>Pagina de agendamento</Text>

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
});