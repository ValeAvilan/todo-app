// Cada import trae una herramienta o un componente que esta pantalla necesita.
// TodoItem dibuja una fila; useTodos administra los datos y las acciones de las tareas.
import { TodoItem } from "@/components/TodoItem";
import { ThemeContext } from "@/context/ThemeContext";
import { useTodos } from "@/hooks/useTodos";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Pantalla principal: permite agregar, completar, eliminar y abrir tareas.
export default function Index() {
  // router contiene las herramientas para cambiar de pantalla.
  const router = useRouter();

  // El hook guarda el texto y las tareas, y nos entrega las funciones para cambiarlos.
  const { text, setText, todos, addTodo, toggleTodo, removeTodo } = useTodos();

  const { colorSheme, setColorSheme, theme } = useContext(ThemeContext); //recibe el themeContext de context
  const styles = createStyles(theme, colorSheme); //se le pasa a styles

  // La navegación queda en la pantalla: el hook solo se encarga de las tareas.
  // Por ejemplo, el ID 3 abre la ruta /details/3.
  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  // Esta función se ejecuta al tocar Add y conecta el campo de texto con el hook.
  const handleAddTodo = () => {
    // Pasamos el texto a addTodo. El bloque solo se ejecuta si devuelve true.
    if (addTodo(text)) {
      // Limpiamos el campo únicamente cuando se pudo agregar la tarea.
      setText("");
    }
  };

  // return describe los elementos que aparecen en la pantalla usando JSX.
  return (
    // Respeta los espacios de la cámara y las barras del teléfono.
    <SafeAreaView style={styles.container}>
      {/* Agrupa el campo de texto y el botón en una misma fila. */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text holder"
          placeholderTextColor="gray"
          // El campo muestra el texto guardado en el estado.
          value={text}
          // Cada vez que escribimos o borramos, se actualiza text.
          onChangeText={setText}
        />

        {/* Al tocar este botón, handleAddTodo intenta agregar la tarea y luego limpia el campo si se agregó. */}
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>

        {/* boton que cambie el tema de light a dark o al reves */}
        <Pressable
          onPress={() =>
            setColorSheme(colorSheme === "light" ? "dark" : "light")
          }
        >
          {
            colorSheme === 'light' ? (
            <MaterialCommunityIcons name="weather-sunny" size={32} color={theme.themeicon}/>
          ) : (
            <MaterialCommunityIcons name="moon-waxing-crescent" size={32} color={theme.themeicon}/>
          )}
        </Pressable>
      </View>

      {/* FlatList dibuja las filas según se necesitan al recorrer la lista. */}
      <FlatList
        // La lista que se va a mostrar.
        data={todos}
        // item es una tarea. Pasamos sus datos y las funciones para interactuar con ella.
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        // Cada fila necesita una clave única; convertimos su ID en texto.
        keyExtractor={(todo) => todo.id.toString()}
        // Permite que el contenido ocupe al menos el espacio disponible de la lista.
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

// funcion que regrese styles sheet
function createStyles(theme, colorSheme) {
  return StyleSheet.create({
    // Fondo de la pantalla. flex: 1 ocupa el espacio disponible.
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    // Campo y botón uno junto al otro, con espacio interior y un ancho máximo.
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      alignSelf: "center",
      // Define el color del borde; para verlo también se necesitaría un grosor.
      borderColor: "white",
    },

    // El campo usa el espacio que queda junto al botón.
    input: {
      flex: 1,
      borderWidth: 1,
      color: theme.color, //usar el tema de theme
      borderRadius: 5, // Redondea las esquinas.
      padding: 10, // Separa el texto del borde del campo.
      marginRight: 10, // Deja espacio entre el campo y el botón.
      fontSize: 10,
      minWidth: 0, // Permite reducir el ancho del campo cuando hay poco espacio.
      borderColor: theme.text,
    },

    // Apariencia del botón; justifyContent centra su contenido en vertical.
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
      justifyContent: "center",
    },

    // Color y tamaño de las letras del botón.
    buttonText: {
      color: "white",
      fontSize: 10,
    },
    themeicon: {
      color : 'themeicon'
    }
  });
}
