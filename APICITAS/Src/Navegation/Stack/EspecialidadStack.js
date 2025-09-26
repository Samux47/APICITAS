import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarEspecialidad from "../../../Screen/Especialidad/ListarEspecialidad";
import Crear_EditarEspecialidad from "../../../Screen/Especialidad/CrearEspecialidad";
import EliminarEspecialidad from "../../../Screen/Especialidad/EliminarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidad/DetalleEspecialidad";

const Stack = createNativeStackNavigator();

export default function EspecialidadStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListarEspecialidad"
        component={ListarEspecialidad}
        options={{ title: "Especialidad" }}
      />
      <Stack.Screen 
        name="Crear_EditarEspecialidad"
        component={Crear_EditarEspecialidad}
        options={{ title: "Crear/Editar Especialidad" }}
      />
      <Stack.Screen 
        name="EliminarEspecialidad"
        component={EliminarEspecialidad}
        options={{ title: "Eliminar Especialidad" }}
      />
      <Stack.Screen 
        name="DetalleEspecialidad"
        component={DetalleEspecialidad}
        options={{ title: "Detalle Especialidad" }}
      />
    </Stack.Navigator>
  );
}
