import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AuthService from '../../Src/Services/AuthService';

export default function IniciarSession({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setLoading(true);

    try {
      const result = await AuthService.login({ email, password });

      if (result.success) {
        const userRole = result.data.user.role;

        switch (userRole) {
          case 'admin':
            navigation.reset({
              index: 0,
              routes: [{ name: 'AdminInicio' }]
            });
            break;
          case 'medico':
            navigation.reset({
              index: 0,
              routes: [{ name: 'MedicoInicio' }]
            });
            break;
          case 'paciente':
            navigation.reset({
              index: 0,
              routes: [{ name: 'PacienteInicio' }]
            });
            break;
          default:
            Alert.alert('Error', 'Rol de usuario no reconocido');
        }
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Botón volver */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1E88E5" />
          </TouchableOpacity>
        </View>

        {/* Logo */}

        <View style={styles.logoContainer}>
          <Ionicons name="person-circle" size={80} color="#d30606ff" />
        </View>

        {/* Títulos */}
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons size={20} color="#005BAC" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons size={20} color="#005BAC" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#b6b6b6ff"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#d10a0aff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerLine} />
          </View>

          {/* Botón registro */}
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registrar')}>
            <Text style={styles.registerButtonText}>Haz clik para registrarte </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    position: "absolute",
    top: 25,          // baja un poco para no chocar con la status bar
    left: 9,
    zIndex: 15,       // asegura que quede arriba de todo
  },
  backButton: {
    padding: 8,
    backgroundColor: "#FFFFFF", // opcional, fondo blanco redondeado
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  container: {
    flex: 1,
    backgroundColor: "#E6F2FA", // fondo suave EPS
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logoContainer: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  logoImage: {
    width: 80,
    height: 80,
  },

  logoContainer: {
    marginBottom: 12,
    backgroundColor: "#1E88E5",
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  logoText: {
    fontSize: 40,
    color: "#FFF",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    padding: 6,
  },
  loginButton: {
    width: "60%",
    height: 48,
    backgroundColor: "#1E88E5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#030303ff",
  },
  loginButtonDisabled: {
    backgroundColor: "#93C5FD",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: "#64748B",
  },
  registerButton: {
    marginTop: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#1E88E5",
    fontSize: 15,
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
});