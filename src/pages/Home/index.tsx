import React from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, Platform, StatusBar } from 'react-native'
const statusBarHeight = StatusBar.currentHeight;


export default function Home() {
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
            <View style={styles.content}>
              <Text>Conteúdo</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>

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
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

