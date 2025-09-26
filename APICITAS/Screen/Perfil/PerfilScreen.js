import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("UserToken");

        const response = await axios.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación manejado por el interceptor, redirigiendo al login");
          Alert.alert("No se encontró el token de usuario, redirigiendo al login");
          return;
        }
        if (error.response) {
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${error.response.data.message || "Ocurrió un error al cargar el perfil"}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("UserToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor, por favor intente más tarde",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("UserToken");
                },
              },
            ]
          );
        }
      }
    };
    cargarPerfil();
  }, []);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Perfil de usuario</Text>
        <Text style={styles.errorText}>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
    </View>
  );
}
