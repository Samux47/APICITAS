import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { listarCitas, eliminarCitas } from '../../Src/Services/CitasService';
import { useNavigation } from '@react-navigation/native';
import CitasCard from '../../components/CitasCard';
import { useEffect, useState } from 'react';


export default function ListarCitas() {
    const [citas, setCitas] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleCitas = async () => {
        setLoading(true);
        try {
            const response = await listarCitas();
            if (result.success) {
                setCitas(response.data);
            } else {
                Alert.alert('Error', response.message || 'No se pudo cargar las citas');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo cargar las citas");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEditar = (citas) => {
        navigation.navigate('EditarCitas', { citas });
    }

    const handlCrear = () => {
        navigation.navigate('EditarCitas');
    }

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmación eliminación",
            "¿Está seguro de eliminar esta cita?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCitas(id);
                            if (result.success) {
                                handleCitas(); // recargar lista
                            } else {
                                Alert.alert(
                                    "Error",
                                    result.message || "No se pudo eliminar la cita"
                                );
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la cita");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <CitasIndicator size="large" color="#1E88E5" />
            </View>
        )
    }

    // función para crear cita
    const handleCrear = () => {
        navigation.navigate('crearCitas'); 
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitasCard
                        citas={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay Citas Registradas.</Text>
                }
                contentContainerStyle={{ paddingBottom: 80 }} 
            />

            {/* ✅ Botón flotante de nueva cita */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textBoton}>➕ Nueva Cita</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB", // gris claro suave
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