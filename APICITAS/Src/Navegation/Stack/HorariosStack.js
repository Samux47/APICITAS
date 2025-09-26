import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarHorarios from "../../../Screen/Horarios/ListarHorarios";
import Crear_EditarHorarios from "../../../Screen/Horarios/CrearHorarios";
import EliminarHorarios from "../../../Screen/Horarios/EliminarHorarios";
import DetalleHorarios from "../../../Screen/Horarios/DetalleHorarios";

const Stack = createNativeStackNavigator();

export default function HorariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListarHorarios"
        component={ListarHorarios}
        options={{ title: "Horarios " }}
      />
      <Stack.Screen 
        name="Crear_EditarHorarios"
        component={Crear_EditarHorarios}
        options={{ title: "Crear/Editar Horario" }}
      />
      <Stack.Screen 
        name="EliminarHorarios"
        component={EliminarHorarios}
        options={{ title: "Eliminar Horario" }}
      />
      <Stack.Screen 
        name="DetalleHorarios"
        component={DetalleHorarios}
        options={{ title: "Detalles Horario" }}
      />
    </Stack.Navigator>
  );
}
