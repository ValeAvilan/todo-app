// Trae la colección de iconos; aquí usamos el icono de una papelera.
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

// Componente reutilizable: dibuja una tarea de la lista.
// Recibe item (los datos) y tres funciones que le pasa la pantalla principal.
// memo puede evitar volver a dibujarlo si los datos y las funciones recibidas no cambian.
export const TodoItem = React.memo(function TodoItem({ item, onToggle, onRemove, onDetails }) {
  const { theme } = useContext(ThemeContext);
  return (
    // Agrupa el título y el botón de eliminar en una fila.
    <View style={styles.itemRow}>
      <Text
        // Siempre aplica todoItem; si está completada, también aplica completedText.
        style={[
          styles.todoItem,
          { color: theme.text },
          item.completed && styles.completedText,
        ]}
        // Un toque cambia la tarea entre pendiente y completada.
        onPress={() => onToggle(item.id)}
        // Mantener presionado el título abre la pantalla de detalles de esta tarea.
        onLongPress={() => onDetails(item.id)}
      >
        {item.title}
      </Text>
      {/* La función se ejecuta al tocar la papelera y recibe el ID que debe eliminar. */}
      <Pressable onPress={() => onRemove(item.id)}>
        <MaterialCommunityIcons name="delete" size={24} color={theme.icon} />
      </Pressable>
    </View>
  );
});

// Estilos que solo se usan para mostrar una fila de la lista.
const styles = StyleSheet.create({
  // Coloca el título y la papelera lado a lado y los centra en vertical.
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4, // Espacio entre los elementos.
    padding: 10, // Espacio dentro de la fila.
    borderBottomColor: "black",
    borderBottomWidth: 1, // Línea que separa esta fila de la siguiente.
    width: "100%",
    maxWidth: 1024, // Evita que la fila sea demasiado ancha en pantallas grandes.
    marginHorizontal: "auto", // Centra la fila horizontalmente.
  },
  // El título toma el espacio disponible antes de la papelera.
  todoItem: {
    flex: 1,
    fontSize: 18,
  },
  // Una tarea completada aparece en gris y con una línea sobre el texto.
  completedText: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  // Este estilo todavía no se usa: el icono recibe su color directamente arriba.
  icon: {
    color: "red",
  },
});
