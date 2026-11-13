// Lista de ejemplo que la pantalla principal copia al iniciarse.
// export permite importar estos datos desde otros archivos.
// Cada objeto entre llaves representa una tarea:
// - id: número que la identifica y permite encontrarla, cambiarla o eliminarla.
// - title: texto que se muestra en la lista.
// - completed: true significa completada; false significa pendiente.
// Todos los objetos usan la misma estructura, por eso no repetimos la explicación.
export const data = [
  { id: 1, title: 'Finish reading book', completed: true },
  { id: 2, title: 'Finish DSA project', completed: false },
  { id: 3, title: 'Write a blog post', completed: true },
  { id: 4, title: 'Do exercise', completed: false },
  { id: 5, title: 'Go to the supermarket', completed: true },
  { id: 6, title: 'Study with Alvaro', completed: false },
];
