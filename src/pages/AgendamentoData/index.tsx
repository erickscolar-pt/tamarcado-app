import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Button,
    Platform,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable
} from 'react-native'
import { api } from '../../services/api'
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Card, Icon, FlatList, Box } from 'native-base';
import CardProfessionals from '../../Components/cardProfissionals';
import { FontAwesome } from '@expo/vector-icons';


type RouteDetailParams = {
    AgendamentoData: {
        cnpj: string;
        idUsuario: string;
    }
}
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
type Cnpj = RouteProp<RouteDetailParams, 'AgendamentoData'>

export default function AgendamentoData() {

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const route = useRoute<Cnpj>();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Converta a data atual para o formato 'YYYY-MM-DD'
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleConfirmAgendamento, setModalVisibleConfirmAgendamento] = useState(false);
    const tasks = [
        { label: 'Corte', id: 1 },
        { label: 'Barba', id: 2 },
        { label: 'Corte + Barba', id: 4 },
        { label: 'Sombrancenlha', id: 5 },
        { label: 'Completo', id: 6 },
    ];

    const professionals = [
        { id: 1, name: 'Robert', image: require('../../assets/exemplo_p1.png') },
        { id: 2, name: 'Carlos', image: require('../../assets/exemplo_p2.png') },
        { id: 3, name: 'João', image: require('../../assets/exemplo_p3.png') },
        { id: 4, name: 'Paulo', image: require('../../assets/exemplo_p1.png') },
        { id: 5, name: 'Cezar', image: require('../../assets/exemplo_p2.png') },
        { id: 6, name: 'Lino', image: require('../../assets/exemplo_p3.png') },
        { id: 7, name: 'Chico', image: require('../../assets/exemplo_p1.png') },
        { id: 8, name: 'Rafael', image: require('../../assets/exemplo_p2.png') },
        { id: 9, name: 'Sandro', image: require('../../assets/exemplo_p3.png') },
        { id: 10, name: 'Vitor', image: require('../../assets/exemplo_p1.png') },
        { id: 11, name: 'Leonardo', image: require('../../assets/exemplo_p2.png') },
        { id: 12, name: 'Felipe', image: require('../../assets/exemplo_p3.png') },
        // Adicione mais profissionais conforme necessário
    ];

    const handleTaskSelection = (taskId: any) => {
        setSelectedTask(taskId);
    };

    const [id, setId] = useState(0)

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || selectedTime;
        setShowPicker(false)
        setSelectedTime(currentDate);
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date.dateString);
    };

    useEffect(() => {
        async function loadUser() {
            const response: any = await api.get('/users/cpfOrCnpj/' + route?.params.idUsuario)
            setId(+response.data[0].data.id)
        }
        loadUser()
    }, [])

    const handleAgendar = async () => {
        console.log(selectedDate + " " + selectedTime.toLocaleTimeString() + ".000")
        await api.post('/agendamentos', {
            
            "data_hora": selectedDate + " " + selectedTime.toLocaleTimeString() + ".000",
            "servico_id": 1, // setar o tipo de serviço
            "status_id": 1, // setar o status do serviço
            "unidade_id": 3, // setar a unidade 
            "atendente_id": 2, //setar o atendente da lista
            "usuario_id": id
        }).then((res) => {
            if (res.status === 201) {
                setModalVisible(false)
                setModalVisibleConfirmAgendamento(true)
            }
        }).catch((err) => {
            console.log("Erro..::" + err)
        })


    }

    const handleOkAgendamento = () => {
        setModalVisibleConfirmAgendamento(false)
        navigation.navigate('Agendamentos')
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
                <SafeAreaView style={styles.scroll}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Calendar
                                style={{ backgroundColor: 'transparent' }} // Define o fundo do calendário como transparente
                                theme={{
                                    backgroundColor: 'transparent',
                                    calendarBackground: 'transparent',
                                    textSectionTitleColor: 'black',
                                    selectedDayBackgroundColor: 'black',
                                    textDisabledColor: '#dfdfdf',
                                    arrowColor: 'black', // Define a cor das setas para preto
                                    todayTextColor: '#998028', // Define a cor do texto da data atual para preto
                                    dayTextColor: 'black', // Define a cor do texto dos dias para preto
                                    textDayFontSize: 16, // Tamanho do texto dos dias
                                    textMonthFontSize: 16, // Tamanho do texto do mês
                                    textDayHeaderFontSize: 16, // Tamanho do texto do cabeçalho dos dias
                                }}
                                markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: '#998028' } }}
                                minDate={minDate}
                                onDayPress={handleDateChange}
                            />

                            <TouchableOpacity
                                onPress={() => setShowPicker(true)}
                                style={styles.button}
                            >
                                <Text style={styles.textbtn}>Escolher Horário</Text>
                            </TouchableOpacity>

                            <View style={styles.listButton}>
                                {tasks.map((task) => (
                                    <TouchableOpacity
                                        key={task.id}
                                        style={[
                                            styles.taskButton,
                                            selectedTask === task.id ? styles.selectedTaskButton : null,
                                        ]}
                                        onPress={() => handleTaskSelection(task.id)}
                                    >
                                        <Text style={selectedTask === task.id ? styles.selectedTaskText : styles.taskText}>
                                            {task.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Container>
                                <View style={styles.carouselContainer}>
                                    <FlatList
                                        horizontal={true}
                                        data={professionals}
                                        renderItem={({ item, index }) => (
                                            <CardProfessionals data={item} index={index} selectedProfessional={selectedProfessional} onPress={setSelectedProfessional} />
                                        )}
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>

                            </Container>


                            {showPicker && (
                                <DateTimePicker
                                    testID="timePicker"
                                    value={selectedTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChange}
                                />
                            )}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.titleModal}>Informações do Agendamento</Text>
                                        <Text>Dia escolhido: {selectedDate}</Text>
                                        <Text>Horario escolhido: {selectedTime.toLocaleTimeString()}</Text>
                                        <Text>Id usuario: {id}</Text>
                                        <Text>{route?.params.cnpj}</Text>
                                        <Text>{route?.params.idUsuario}</Text>
                                        <Text style={styles.modalText}>Confirmar Agendamento?</Text>
                                        <View style={styles.viewButtonsModal}>
                                            <Pressable
                                                style={[styles.button, styles.buttonAgendar]}
                                                onPress={() => handleAgendar()}>
                                                <Text style={styles.textStyle}>Sim</Text>

                                            </Pressable>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => setModalVisible(!modalVisible)}>

                                                <Text style={styles.textStyle}>Não</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisibleConfirmAgendamento}

                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisibleConfirmAgendamento(!modalVisibleConfirmAgendamento);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.titleModal}>Agendamento Confirmado!</Text>
                                        <FontAwesome style={styles.icon} name="check-circle" size={60} color="#333" />
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => handleOkAgendamento()}>

                                            <Text style={styles.textStyle}>Ok</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={styles.button}
                            >
                                <Text style={styles.textbtn}>Agendar</Text>
                            </TouchableOpacity>
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
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll: {
        flex: 1,
        marginBottom: 60,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleModal: {
        textAlign: 'center',
        fontSize: 24
    },
    modalText: {
        marginBottom: 2,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewButtonsModal: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonClose: {
        width: '40%',
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 0,
        backgroundColor: '#563D3D',
    },
    buttonAgendar: {
        width: '40%',
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 0,
        backgroundColor: '#998028',
    },
    timePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    timePickerItem: {
        flex: 1,
    },
    button: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: '#998028',
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 15,
        padding: 15
    },
    textbtn: {
        padding: 3,
        textAlign: 'center',
        fontSize: 24,
        color: '#FFF'
    },
    listButton: {
        maxWidth: '80%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    taskButton: {
        backgroundColor: '#998028',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    selectedTaskButton: {
        backgroundColor: '#B99410', // Cor quando selecionado
        borderRadius: 5,
        shadowColor: '#998028',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2, // Elevação para criar uma sombra (para Android)
    },
    taskText: {
        color: 'white', // Cor do texto quando selecionado
    },
    selectedTaskText: {
        color: 'white', // Cor do texto quando selecionado
    },
    carouselContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 15,
        color: '#148D00'
    }
});