import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CardProfessionals({ data, selectedProfessional, onPress }: any) {
    return (
            <TouchableOpacity
                style={[
                    styles.card,
                    selectedProfessional === data.id ? styles.selectedCard : null,
                ]}
                onPress={() => onPress(data.id)}
            >
                <Image source={data.image} style={styles.professionalImage} />
                <Text style={styles.professionalName}>{data.name}</Text>
            </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DDAC00',
        width: 80,
        height: 102,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    selectedCard: {
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#D3B445', // Cor quando selecionado

        shadowColor: "#ffc700",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    professionalImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignSelf: 'center',
        flexShrink: 0,
    },
    professionalName: {
        alignSelf: 'center',
        color: '#E0E0E0',
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '400',
    },
});
