import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { crearEspecialidades, editarEspecialidades } from '../../Src/Services/EspecialidadesService';

export default function EditarEspecialidad() {
    const navigation = useNavigation();
    const route = useRoute();

    const especialidad = route.params?.especialidad;

    const [nombre, setNombre] = useState(especialidad ? especialidad.nombre : "");
    const [descripcion, setDescripcion] = useState(especialidad ? especialidad.descripcion : "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!especialidad;

    const handleGuardar = async () => {
        if (!nombre || !descripcion) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarEspecialidades(especialidad.id, {
                    nombre,
                    descripcion,
                });
            } else {
                result = await crearEspecialidades({
                    nombre,
                    descripcion,
                });
            }
            if (result.success) {
                Alert.alert('Éxito', esEdicion ? 'Especialidad editada exitosamente' : 'Especialidad creada exitosamente');
                navigation.goBack(); // volver a la lista
            } else {
                Alert.alert('Error', result.message || 'No se pudo guardar la especialidad');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo guardar la especialidad");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{esEdicion ? 'Editar Especialidad' : 'Crear Especialidad'}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la especialidad"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                />

                <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar} disabled={loading}>
                    <Text style={styles.textBoton}>{esEdicion ? 'Guardar Cambios' : 'Crear Especialidad'}</Text>
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
