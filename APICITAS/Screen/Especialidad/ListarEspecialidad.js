import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { listarEspecialidades, eliminarEspecialidades } from '../../Src/Services/EspecialidadesService';
import { useNavigation } from '@react-navigation/native';
import EspecialidadCard from '../../components/EspecialidadCard';
import { useEffect, useState } from 'react';

export default function ListarEspecialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleEspecialidades = async () => {
        setLoading(true);
        try {
            const response = await listarEspecialidades();
            if (response.success) {
                setEspecialidades(response.data);
            } else {
                Alert.alert('Error', response.message || 'No se pudieron cargar las especialidades');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudieron cargar las especialidades");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        return unsubscribe;
    }, [navigation]);

    const handleEditar = (especialidad) => {
        navigation.navigate('EditarEspecialidad', { especialidad });
    };

    const handleCrear = () => {
        navigation.navigate('crearEspecialidad');
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmación eliminación",
            "¿Está seguro de eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEspecialidades(id);
                            if (result.success) {
                                handleEspecialidades(); // recargar lista
                            } else {
                                Alert.alert(
                                    "Error",
                                    result.message || "No se pudo eliminar la especialidad"
                                );
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la especialidad");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Cargando especialidades...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EspecialidadCard
                        especialidad={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay especialidades registradas.</Text>
                }
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* ✅ Botón flotante de nueva especialidad */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>➕ Nueva Especialidad</Text>
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
