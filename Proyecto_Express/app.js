const { menu, pause, leerInput, borrarUsuario, completarUsuario } = require("./helpers/menu");

const Usuarios = require("./models/listar"); // Cambiado de Tareas a Usuarios

const main = async () => {
  let opt = "";
  const usuarios = new Usuarios(); // Instanciado Usuarios en lugar de Tareas

  do {
    opt = await menu();
    switch (opt) {
      case "1":
        // Crear un nuevo usuario
        const nombre = await leerInput("Nombre: ");
        const email = await leerInput("Email: ");
        usuarios.crearUsuario(nombre, email);
        break;
      case "2":
        // Listar todos los usuarios
        await usuarios.listadoArr();
        break;
      case "3":
        // Listar solo los usuarios activos
        await usuarios.listarActivos();
        break;
      case "4":
        // Listar solo los usuarios desactivados
        await usuarios.listarDesactivados();
        break;
      case "5":
        // Completar usuarios (Agregar nombre o email y activar)
        await completarUsuario(usuarios);  // Llamar a la función de completar usuario
        break;
      case "6":
        // Llamar a la función para borrar un usuario
        await borrarUsuario(usuarios); // Pasa el objeto `usuarios`
        break;
      default:
        break;
    }
    await pause();
  } while (opt !== "0");
};

main();
