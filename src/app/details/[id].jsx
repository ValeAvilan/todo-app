// Lee los valores incluidos en la ruta de la pantalla.
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

// Pantalla de detalles. Por ahora solo muestra el ID, no el título ni el estado.
export default function Details() {
  // El nombre [id].jsx permite recibir un ID distinto en cada visita.
  // Por ejemplo, al abrir /details/3, id contiene el texto "3".
  const { id } = useLocalSearchParams();

  return (
    // Mantiene el contenido dentro de la zona segura del teléfono.
    <SafeAreaView>
      {/* Las llaves permiten mostrar el valor de una variable dentro del texto. */}
      <Text>{id}</Text>
    </SafeAreaView>
  );
}
