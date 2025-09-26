import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import IniciarSession from "./Screen/Auth/iniciarSession";
import Registrar from "./Screen/Auth/registrar";
import PacientesStack from "./Src/Navegation/Stack/PacientesStack.js";
import MedicosStack from "./Src/Navegation/Stack/MedicosStack.js";
import horariosDisponiblesStack from "./Src/Navegation/Stack/horariosDisponiblesStack.js";
import EspecialidadesStack from "./Src/Navegation/Stack/EspecialidadesStack.js";
import CitasStack from "./Src/Navegation/Stack/CitasStack.js";

const Stack = createNativeStackNavigator();

function PantallaInicio({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContenido} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={styles.encabezado}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoTexto}>🏥</Text>
          </View>
          <View style={styles.textoEncabezado}>
            <Text style={styles.nombreApp}>Citas Médicas</Text>
            <Text style={styles.sloganApp}>Tu salud en tus manos</Text>
          </View>
        </View>

        {/* Saludo */}
        <View style={styles.cajaSaludo}>
          <Text style={styles.textoSaludo}>¡Hola! 👋</Text>
          <Text style={styles.subSaludo}>¿Cómo te encuentras hoy?</Text>
        </View>

        {/* Próxima Cita */}
        <View style={styles.cartaCita}>
          <View style={styles.cabeceraCarta}>
            <Ionicons name="calendar-outline" size={22} color="#1E88E5" />
            <Text style={styles.tituloCarta}>Próxima Cita</Text>
          </View>
          <Text style={styles.nombreDoctor}>Dr. Carlos Mendoza</Text>
          <Text style={styles.especialidad}>Cardiología</Text>
          <View style={styles.filaFecha}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.textoFecha}>15 Dic 2024</Text>
            <Ionicons name="time-outline" size={16} color="#6B7280" style={{ marginLeft: 14 }} />
            <Text style={styles.textoFecha}>10:30 AM</Text>
          </View>
          <View style={styles.estado}>
            <Text style={styles.textoEstado}>Confirmada</Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <Text style={styles.tituloAcciones}>Acciones Rápidas</Text>
        <View style={styles.gridAcciones}>
          <TouchableOpacity style={[styles.cartaAccion, { backgroundColor: "#E3F2FD" }]} onPress={() => navigation.navigate("Citas")}>
            <Ionicons name="add-circle-outline" size={32} color="#1E88E5" />
            <Text style={styles.textoAccion}>Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cartaAccion, { backgroundColor: "#E8F5E9" }]} onPress={() => navigation.navigate("Medicos")}>
            <MaterialCommunityIcons name="doctor" size={32} color="#4CAF50" />
            <Text style={styles.textoAccion}>Médicos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cartaAccion, { backgroundColor: "#F3E5F5" }]} onPress={() => navigation.navigate("Pacientes")}>
            <Ionicons name="people-outline" size={32} color="#8E24AA" />
            <Text style={styles.textoAccion}>Pacientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cartaAccion, { backgroundColor: "#FCE4EC" }]} onPress={() => navigation.navigate("Especialidades")}>
            <Ionicons name="medkit-outline" size={32} color="#EC407A" />
            <Text style={styles.textoAccion}>Especialidades</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cartaAccion, { backgroundColor: "#FFF9C4" }]} onPress={() => navigation.navigate("HorariosDisponibles")}>
            <Ionicons name="time-outline" size={32} color="#FBC02D" />
            <Text style={styles.textoAccion}>Horarios</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={PantallaInicio}
          options={({ navigation }) => ({
            title: "Citas Médicas",
            headerStyle: { backgroundColor: "#1E88E5" },
            headerTintColor: "#fff",
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate("IniciarSesion")}>
                  <Text style={styles.botonLogin}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Registrar")}>
                  <Text style={styles.botonLogin}>Registrar</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen name="IniciarSesion" component={IniciarSession} options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="Registrar" component={Registrar} options={{ title: "Registro" }} />
        <Stack.Screen name="Pacientes" component={PacientesStack} options={{ headerShown: false }} />
        <Stack.Screen name="Medicos" component={MedicosStack} options={{ headerShown: false }} />
        <Stack.Screen name="HorariosDisponibles" component={horariosDisponiblesStack} options={{ headerShown: false }} />
        <Stack.Screen name="Especialidades" component={EspecialidadesStack} options={{ headerShown: false }} />
        <Stack.Screen name="Citas" component={CitasStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContenido: { paddingHorizontal: 20, paddingTop: 20 },
  encabezado: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1E88E5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoTexto: { fontSize: 32, color: "#fff" },
  textoEncabezado: { flexDirection: "column" },
  nombreApp: { fontSize: 22, fontWeight: "700", color: "#1A1A1A" },
  sloganApp: { fontSize: 14, color: "#6B7280" },
  cajaSaludo: {
    backgroundColor: "#E3F2FD",
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
  },
  textoSaludo: { fontSize: 24, fontWeight: "700", color: "#1A1A1A" },
  subSaludo: { fontSize: 15, color: "#4B5563", marginTop: 6 },
  cartaCita: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  cabeceraCarta: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  tituloCarta: { marginLeft: 8, fontSize: 18, fontWeight: "600", color: "#1E88E5" },
  nombreDoctor: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
  especialidad: { fontSize: 14, color: "#6B7280", marginBottom: 10 },
  filaFecha: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  textoFecha: { fontSize: 14, color: "#4B5563", marginLeft: 6 },
  estado: { alignSelf: "flex-start", backgroundColor: "#E8F5E9", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  textoEstado: { fontSize: 12, fontWeight: "700", color: "#2E7D32" },
  tituloAcciones: { fontSize: 18, fontWeight: "700", color: "#1A1A1A", marginBottom: 14 },
  gridAcciones: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 14, columnGap: 14 },
  cartaAccion: {
    width: "48%",
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  textoAccion: { marginTop: 10, fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  botonLogin: { marginRight: 15, color: "#fff", fontWeight: "700", fontSize: 14 },
});
