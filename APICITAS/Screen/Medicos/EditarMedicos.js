import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { editarMedicos } from "../../Src/Services/MedicosService";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const { medico } = route.params; // viene desde ListarMedicos

    const [nombre, setNombre] = useState(medico.nombre || "");
    const [especialidad, setEspecialidad] = useState(medico.especialidad || "");
    const [telefono, setTelefono] = useState(medico.telefono || "");
    const [email, setEmail] = useState(medico.email || "");

    const handleGuardar = async () => {
        if (!nombre || !especialidad || !telefono || !email) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        try {
            const result = await editarMedicos(medico.id, {
                nombre,
                especialidad,
                telefono,
                email,
            });

            if (result.success) {
                Alert.alert("Éxito", "Médico actualizado correctamente", [
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert("Error", result.message || "No se pudo actualizar el médico");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al actualizar el médico");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Editar Médico</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad"
                value={especialidad}
                onChangeText={setEspecialidad}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
                <Text style={styles.textBoton}>💾 Guardar Cambios</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F9FAFB",
        flexGrow: 1,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#1E88E5",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    boton: {
        backgroundColor: "#1E88E5",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    textBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
