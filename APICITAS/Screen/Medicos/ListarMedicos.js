import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { listarMedicos, eliminarMedicos } from '../../Src/Services/MedicosService';
import { useNavigation } from '@react-navigation/native';
import MedicoCard from '../../components/MedicoCard';
import { useEffect, useState } from 'react';

export default function ListarMedicos() {
    const [medicos, setMedicos] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleMedicos = async () => {
        setLoading(true);
        try {
            const response = await listarMedicos();
            if (response.success) {
                setMedicos(response.data);
            } else {
                Alert.alert('Error', response.message || 'No se pudieron cargar los médicos');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudieron cargar los médicos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleMedicos);
        return unsubscribe;
    }, [navigation]);

    const handleEditar = (medico) => {
        navigation.navigate('EditarMedico', { medico });
    };

    const handleCrear = () => {
        navigation.navigate('crearMedico');
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmación eliminación",
            "¿Está seguro de eliminar este médico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarMedicos(id);
                            if (result.success) {
                                handleMedicos(); // recargar lista
                            } else {
                                Alert.alert(
                                    "Error",
                                    result.message || "No se pudo eliminar el médico"
                                );
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el médico");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Cargando médicos...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MedicoCard
                        medico={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay médicos registrados.</Text>
                }
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* ✅ Botón flotante de nuevo médico */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>➕ Nuevo Médico</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    empty: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        color: "#777",
    },
    botonCrear: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#1E88E5",
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    textBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
