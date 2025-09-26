import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MedicoCard({ medico, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{medico.nombre}</Text>
                <Text style={styles.detalle}>Especialidad: {medico.especialidad}</Text>
                <Text style={styles.detalle}>Teléfono: {medico.telefono}</Text>
                <Text style={styles.detalle}>Correo: {medico.email}</Text>
            </View>

            <View style={styles.acciones}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1E88E5" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#F44336" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 6,
    },
    detalle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    acciones: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    iconBtn: {
        marginLeft: 10,
        padding: 6,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },
});
