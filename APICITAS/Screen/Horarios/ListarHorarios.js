import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { listarHorarios, eliminarHorarios } from '../../Src/Services/HorariosService';
import { useNavigation } from '@react-navigation/native';
import HorarioCard from '../../components/HorarioCard';
import { useEffect, useState } from 'react';

export default function ListarHorarios() {
    const [horarios, setHorarios] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleHorarios = async () => {
        setLoading(true);
        try {
            const response = await listarHorarios();
            if (response.success) {
                setHorarios(response.data);
            } else {
                Alert.alert('Error', response.message || 'No se pudieron cargar los horarios');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudieron cargar los horarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleHorarios);
        return unsubscribe;
    }, [navigation]);

    const handleEditar = (horario) => {
        navigation.navigate('EditarHorario', { horario });
    };

    const handleCrear = () => {
        navigation.navigate('crearHorario');
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmación eliminación",
            "¿Está seguro de eliminar este horario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarHorarios(id);
                            if (result.success) {
                                handleHorarios(); // recargar lista
                            } else {
                                Alert.alert(
                                    "Error",
                                    result.message || "No se pudo eliminar el horario"
                                );
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el horario");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text>Cargando horarios...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={horarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HorarioCard
                        horario={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay horarios registrados.</Text>
                }
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* ✅ Botón flotante de nuevo horario */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>➕ Nuevo Horario</Text>
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
