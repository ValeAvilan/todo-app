// Stack permite abrir pantallas y regresar a la pantalla anterior.
import { Stack } from "expo-router";
// Comparte con las pantallas los espacios que ocupan la cámara y las barras del teléfono.
import { ThemeProvider } from "@/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Este archivo define la navegación general de la aplicación.
export default function RootLayout() {
  return (
    //envuelve el ThemeProvider a las pantallas para que sea tema light o dark
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          {/* index es la pantalla principal. headerShown: false oculta el encabezado. */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* [id] es una parte variable de la ruta: identifica la tarea que se abrió. */}
          <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
