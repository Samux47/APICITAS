import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearHorarios, editarHorarios } from '../../Src/Services/HorariosService';

export default function EditarHorario() {
    const navigation = useNavigation();
    const route = useRoute();

    const horario = route.params?.horario;

    const [dia, setDia] = useState(horario ? horario.dia : "");
    const [horaInicio, setHoraInicio] = useState(horario ? horario.hora_inicio : "");
    const [horaFin, setHoraFin] = useState(horario ? horario.hora_fin : "");
    const [medicoId, setMedicoId] = useState(horario ? horario.medico_id?.toString() : "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!horario;

    const handleGuardar = async () => {
        if (!dia || !horaInicio || !horaFin) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarHorarios(horario.id, {
                    dia,
                    hora_inicio: horaInicio,
                    hora_fin: horaFin,
                    medico_id: medicoId ? parseInt(medicoId) : null,
                });
            } else {
                result = await crearHorarios({
                    dia,
                    hora_inicio: horaInicio,
                    hora_fin: horaFin,
                    medico_id: medicoId ? parseInt(medicoId) : null,
                });
            }

            if (result.success) {
                Alert.alert('Éxito', esEdicion ? 'Horario editado exitosamente' : 'Horario creado exitosamente');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'No se pudo guardar el horario');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo guardar el horario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{esEdicion ? 'Editar Horario' : 'Crear Horario'}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Día (ej: Lunes)"
                    value={dia}
                    onChangeText={setDia}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Hora Inicio (HH:MM)"
                    value={horaInicio}
                    onChangeText={setHoraInicio}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Hora Fin (HH:MM)"
                    value={horaFin}
                    onChangeText={setHoraFin}
                />

                <TextInput
                    style={styles.input}
                    placeholder="ID Médico (opcional)"
                    value={medicoId}
                    onChangeText={setMedicoId}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar} disabled={loading}>
                    <Text style={styles.textBoton}>{esEdicion ? 'Guardar Cambios' : 'Crear Horario'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        margin: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 25,
        color: "#1e3c72",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        color: "#333",
    },
    botonGuardar: {
        backgroundColor: "#1e90ff",
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#1e90ff",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        elevation: 3,
    },
    textBoton: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    },
});
