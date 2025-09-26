import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, CitasIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearCitas, editarCitas } from '../../Src/Services/CitasService';

export default function EditarCitas() {
    const navigate = useRoute();
    const route = useRoute();

    const citas = route.params?.citas;

    const [pacientes, setPacientes] = useState(citas ? citas.pacientes : "");
    const [medicos, setMedicos] = useState(citas ? citas.medicos : "");
    const [fecha, setFechaEvento] = useState(citas ? citas.fecha : "");
    const [hora, setHora] = useState(citas ? citas.hora : "");
    const [observaciones, setObservaciones] = useState(citas ? citas.observaciones : "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!citas;

    const handleGuardar = async () => {
        if ( !pacientes || !medicos || !fecha || !hora || !observaciones) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarCitas(citas.id, {
                    
                    pacientes,
                    medicos,
                    fecha,
                    hora,
                    observaciones
                });
            } else {
                result = await crearCitas({
                   
                    pacientes,
                    medicos,
                    fecha,
                    hora,
                    observaciones
                });
            }
            if (result.success) {
                Alert.alert('Exito', esEdicion ? 'Cita editada exitosamente' : 'Cita creada exitosamente');
                navigate.goBack(); // se devuelve a la pantlla anterior 
            } else {
                Alert.alert('Error', result.message || 'No se pudo guardar la cita');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo guardar la cita");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{esEdicion ? 'Editar Citas' : 'Crear Citas'}</Text>
                <TextInput
                style={styles.input}
                placeholder="Pacientes"
                value={pacientes}
                onChangeText={setPacientes}
                />

                <TextInput
                style={styles.input}
                placeholder="Medicos"
                value={medicos}
                onChangeText={setMedicos}
                />

                <TextInput
                style={styles.input}
                placeholder="Fecha (YYYY-MM-DD)"
                value={fechaEvento}
                onChangeText={setFechaEvento}
                />

                <TextInput
                style={styles.input}
                placeholder="Hora"
                value={hora}
                onChangeText={setHora}
                />

                <TextInput
                style={styles.input}
                placeholder="Observaciones"
                value={observaciones}
                onChangeText={setObservaciones}
                />

                <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}disabled={loading}>
                    <Text style={styles.textBoton}>{esEdicion ? 'Guardar Cambios' : 'Crear citas'}</Text>
                </TouchableOpacity>
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#f4f7fb",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
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
    textArea: {
        height: 100,
        textAlignVertical: "top",
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
