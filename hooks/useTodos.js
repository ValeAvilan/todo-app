import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { data } from "../data/todos";

// Este hook reúne los datos y las acciones de las tareas para usarlos desde la pantalla.
export function useTodos() {
  // text guarda lo escrito; setText permite actualizarlo desde el campo de texto.
  const [text, setText] = useState("");

  // Copiamos las tareas iniciales y las ordenamos de mayor a menor ID.
  // Los cambios quedan en memoria; todavía no se guardan al reiniciar la app.
  const [todos, setTodos] = useState(() =>
    [...data].sort((a, b) => b.id - a.id),
  );

  // Recibe el título desde la pantalla y agrega una tarea al principio de la lista.
  // Devuelve true si la agregó o false si el texto estaba vacío.
  const addTodo = (title) => {
    // trim quita los espacios de los extremos. Si no queda texto, no agregamos nada.
    if (!title.trim()) return false;

    // La lista está ordenada de mayor a menor ID: tomamos el primero y sumamos uno.
    // Si no hay tareas, el primer ID será 1.
    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    // Creamos la tarea pendiente con el título sin espacios en los extremos.
    // ...todos coloca las tareas anteriores después de la nueva.
    setTodos([{ id: newId, title: title.trim(), completed: false }, ...todos]);
    // Avisamos a la pantalla que sí se agregó, para que pueda limpiar el campo.

    return true;
  };

  //estado incial de load
  const [loaded, setLoaded] = useState(false);

  //efecto para leer datos al inicia
  useEffect(() => {
    const cargarTodos = async () => {
      try {
        const guardados = await AsyncStorage.getItem("todos");

        if (guardados !== null) {
          setTodos(JSON.parse(guardados));
        }

        setLoaded(true); //actualizar estado cuando ya lo cargó
      } catch (error) {
        console.error("No se pudieron cargar las tareas:", error);
      }
    };

    cargarTodos();
  }, []); //ejecuta cuando renderiza

  //efecto para guardar cuando cambie la lista
  useEffect(() => {
    if (!loaded) return;

    const guardarTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("No se pudieron guardar las tareas:", error);
      }
    };

    guardarTodos();
  }, [todos, loaded]); //se ejecuta cunado cambie uno u el otro

  // Cambia únicamente la tarea cuyo ID coincide con el recibido.
  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        // Copiamos la tarea e invertimos completed; las demás siguen iguales.
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Conserva todas las tareas excepto la que queremos eliminar.
  const removeTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  // La pantalla recibe estos valores y funciones al llamar useTodos().
  return { text, setText, todos, addTodo, toggleTodo, removeTodo };
}
