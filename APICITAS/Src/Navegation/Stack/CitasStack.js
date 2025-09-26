import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import editarCitas from "../../../Screen/Citas/editarCitas";
import detalleCitas from "../../../Screen/Citas/detalleCitas";

const Stack = createNativeStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator> 
      <Stack.Screen 
        name="ListarCitas"
        component={ListarCitas}
        options={{ title: "Citas" }}
      />
      <Stack.Screen 
        name="editarCitas"
        component={editarCitas}
        options={{ title: "Editar Cita" }}
      />
      <Stack.Screen 
        name="detalleCitas"
        component={detalleCitas}
        options={{ title: "Detalle Cita" }}
      />
    </Stack.Navigator>
  );
}
