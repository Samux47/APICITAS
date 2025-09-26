import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantallaPacientes = ({ navigation }) => {
  const TarjetaPaciente = ({ paciente }) => (
    <TouchableOpacity style={estilos.cartaPaciente} activeOpacity={0.9}>
      {/* Cabecera */}
      <View style={estilos.cabeceraCarta}>
        <MaterialCommunityIcons name="account-circle" size={28} color="#2563EB" />
        <Text style={estilos.nombrePaciente}>{paciente.nombre}</Text>
        <View style={[
          estilos.estadoBadge,
          { backgroundColor: paciente.estado === 'Activo' ? '#DCFCE7' : '#FEF9C3' }
        ]}>
          <Text style={[
            estilos.textoEstado,
            { color: paciente.estado === 'Activo' ? '#15803D' : '#CA8A04' }
          ]}>
            {paciente.estado}
          </Text>
        </View>
      </View>

      {/* Datos */}
      <View style={estilos.contenidoPaciente}>
        <View style={estilos.filaDato}>
          <Text style={estilos.etiquetaDato}>CC:</Text>
          <Text style={estilos.valorDato}>{paciente.cedula}</Text>
        </View>
        <View style={estilos.filaDato}>
          <Text style={estilos.etiquetaDato}>EPS:</Text>
          <Text style={estilos.valorDato}>{paciente.eps}</Text>
        </View>
        <View style={estilos.filaDato}>
          <Text style={estilos.etiquetaDato}>Edad:</Text>
          <Text style={estilos.valorDato}>{paciente.edad}</Text>
        </View>

        <View style={estilos.infoContacto}>
          <View style={estilos.itemContacto}>
            <Ionicons name="call-outline" size={16} color="#6B7280" />
            <Text style={estilos.textoContacto}>{paciente.telefono}</Text>
          </View>
          <View style={estilos.itemContacto}>
            <Ionicons name="mail-outline" size={16} color="#6B7280" />
            <Text style={estilos.textoContacto} numberOfLines={1}>{paciente.correo}</Text>
          </View>
        </View>

        {paciente.proximaCita && (
          <View style={estilos.proximaCita}>
            <Ionicons name="calendar-outline" size={14} color="#2563EB" />
            <Text style={estilos.textoProximaCita}>{`Próxima: ${paciente.proximaCita}`}</Text>
          </View>
        )}
      </View>

      {/* Acciones */}
      <View style={estilos.accionesPaciente}>
        <TouchableOpacity style={[estilos.botonAccion, { borderColor: '#22C55E' }]}>
          <Ionicons name="create-outline" size={18} color="#22C55E" />
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botonAccion, { borderColor: '#2563EB' }]}>
          <Ionicons name="eye-outline" size={18} color="#2563EB" />
        </TouchableOpacity>
        <TouchableOpacity style={[estilos.botonAccion, { borderColor: '#EF4444' }]}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar style="dark" />

      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <View style={estilos.logoContainer}>
          <MaterialCommunityIcons name="account-group" size={32} color="#fff" />
        </View>
        <View>
          <Text style={estilos.nombreApp}>Pacientes</Text>
          <Text style={estilos.sloganApp}>Gestión de pacientes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        {/* Acciones rápidas */}
        <View style={estilos.gridAcciones}>
          <TouchableOpacity style={estilos.cartaAccion}>
            <Ionicons name="add-circle-outline" size={28} color="#2563EB" />
            <Text style={estilos.textoAccion}>Nuevo Paciente</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={estilos.contenedorBusqueda}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput style={estilos.inputBusqueda} placeholder="Buscar por nombre o documento..." placeholderTextColor="#9CA3AF" />
        </View>

        {/* Estadísticas */}
        <View style={estilos.estadisticas}>
          <View style={estilos.estadItem}>
            <Text style={estilos.estadNumero}>45</Text>
            <Text style={estilos.estadTexto}>Total</Text>
          </View>
          <View style={estilos.estadItem}>
            <Text style={estilos.estadNumero}>32</Text>
            <Text style={estilos.estadTexto}>Activos</Text>
          </View>
          <View style={estilos.estadItem}>
            <Text style={estilos.estadNumero}>12</Text>
            <Text style={estilos.estadTexto}>Con Citas</Text>
          </View>
        </View>

        {/* Lista */}
        <Text style={estilos.tituloLista}>Lista de Pacientes</Text>
        {[1, 2, 3].map((i) => (
          <TarjetaPaciente
            key={i}
            paciente={{
              nombre: `Paciente ${i}`,
              estado: i % 2 === 0 ? 'Activo' : 'Inactivo',
              cedula: `10${i}23`,
              eps: 'SURA',
              edad: 25 + i,
              telefono: '3001234567',
              correo: `paciente${i}@correo.com`,
              proximaCita: i % 2 === 0 ? '15 Oct 2025' : null
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContenido: { padding: 20 },
  encabezado: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logoContainer: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  nombreApp: { fontSize: 20, fontWeight: '700', color: '#111827' },
  sloganApp: { fontSize: 13, color: '#6B7280' },

  gridAcciones: { marginBottom: 16 },
  cartaAccion: { backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, alignItems: 'center', elevation: 2 },
  textoAccion: { marginTop: 6, fontSize: 13, fontWeight: '600', color: '#111827' },

  contenedorBusqueda: { flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 14, borderRadius: 12, elevation: 2, marginBottom: 16 },
  inputBusqueda: { flex: 1, fontSize: 15, marginLeft: 8, color: '#111827' },

  estadisticas: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 20, elevation: 2 },
  estadItem: { alignItems: 'center' },
  estadNumero: { fontSize: 22, fontWeight: '700', color: '#2563EB' },
  estadTexto: { fontSize: 12, color: '#6B7280' },

  tituloLista: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },

  cartaPaciente: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, elevation: 2 },
  cabeceraCarta: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  nombrePaciente: { flex: 1, fontSize: 15, fontWeight: '700', color: '#111827', marginLeft: 10 },
  estadoBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  textoEstado: { fontSize: 11, fontWeight: '700' },

  contenidoPaciente: { marginBottom: 12 },
  filaDato: { flexDirection: 'row', marginBottom: 6 },
  etiquetaDato: { fontSize: 13, fontWeight: '600', color: '#6B7280', width: 60 },
  valorDato: { fontSize: 13, color: '#111827' },

  infoContacto: { marginTop: 8, gap: 4 },
  itemContacto: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  textoContacto: { fontSize: 12, color: '#4B5563', flex: 1 },

  proximaCita: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DBEAFE', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginTop: 10 },
  textoProximaCita: { fontSize: 11, fontWeight: '600', color: '#2563EB', marginLeft: 4 },

  accionesPaciente: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 10 },
  botonAccion: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1.4, elevation: 1 },
});

export default PantallaPacientes;
