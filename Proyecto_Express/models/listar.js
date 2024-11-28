const guardarDB = require("../helpers/guardarArchivo");
const Usuario = require("./crear");
const archivo2 = "./db/data.json";
const { leerInput } = require("../helpers/menu");
const fs = require("fs").promises;
var colors = require("colors");

class Usuarios {
  async listadoArr() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Usuario".yellow.padEnd(46)} ${"|".yellow}  ${"Nombre".yellow.padEnd(38)} ${"|".yellow}  ${"Email".yellow.padEnd(38)} ${"|".yellow}  ${"Activo".yellow.padEnd(0)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      contenido.usuarios.forEach((usuario) => {
        console.log(
          `${"|".yellow}  ${usuario.id.toString().padEnd(18)} ${"|".yellow}  ${usuario.nombre.padEnd(28)} ${"|".yellow}  ${usuario.email.padEnd(28)} ${"|".yellow}  ${usuario.activo ? "Sí".green.padEnd(16) : "No".red.padEnd(16)} ${"|".yellow}`
        );
      });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  

  async listarActivos() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Usuario".yellow.padEnd(46)} ${"|".yellow}  ${"Nombre".yellow.padEnd(38)} ${"|".yellow}  ${"Email".yellow.padEnd(38)} ${"|".yellow}  ${"Activo".yellow.padEnd(0)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      contenido.usuarios
        .filter((usuario) => usuario.activo) // Filtra usuarios activos
        .forEach((usuario) => {
          console.log(
            `${"|".yellow}  ${usuario.id.toString().padEnd(18)} ${"|".yellow}  ${usuario.nombre.padEnd(28)} ${"|".yellow}  ${usuario.email.padEnd(28)} ${"|".yellow}  ${"Sí".green.padEnd(16)} ${"|".yellow}`
          );
        });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  
  
  // Nuevo método para listar los usuarios desactivados
  async listarDesactivados() {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      console.log(
        `${"=".repeat(115)}\n` +
        `${"|".yellow}  ${"Id de Usuario".yellow.padEnd(46)} ${"|".yellow}  ${"Nombre".yellow.padEnd(38)} ${"|".yellow}  ${"Email".yellow.padEnd(38)} ${"|".yellow}  ${"Activo".yellow.padEnd(0)} ${"|".yellow}\n` +
        `${"=".repeat(115)}`
      );
  
      contenido.usuarios
        .filter((usuario) => !usuario.activo) // Filtra usuarios desactivados
        .forEach((usuario) => {
          console.log(
            `${"|".yellow}  ${usuario.id.toString().padEnd(18)} ${"|".yellow}  ${usuario.nombre.padEnd(28)} ${"|".yellow}  ${usuario.email.padEnd(28)} ${"|".yellow}  ${"No".red.padEnd(16)} ${"|".yellow}`
          );
        });
  
      console.log(`${"=".repeat(115)}`);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }
  
  
  crearUsuario(nombre, email) {
    const usuario = new Usuario(nombre, email);
    
    // Generar un string con la información del nuevo usuario para el archivo TXT
    const userDetails = `|  ${usuario.id}  |   Nombre: ${usuario.nombre}  |   Email: ${usuario.email || "No proporcionado"}  |   Activo: ${usuario.activo ? 'Sí' : 'No'}   |\n`;
  
    // Llamar a guardarDB con los parámetros adecuados
    guardarDB(userDetails, usuario);
    console.log(`Usuario ${nombre} creado con éxito.`.green);
  }
  
  async completarUsuario() {
    const id = await leerInput("Ingrese el ID del usuario a completar: ");
    
    const data = await fs.readFile(archivo2, "utf8");
    const contenido = JSON.parse(data);
  
    // Buscar el usuario por ID
    const usuario = contenido.usuarios.find((usuario) => usuario.id === id);
  
    if (!usuario) {
      console.log("Usuario no encontrado.".red);
      return;
    }
  
    console.log(`Usuario encontrado: ${usuario.nombre}`);
    
    // Pedir nuevos datos
    const nombre = await leerInput(`Nuevo nombre (dejar vacío para no cambiar): `);
    const email = await leerInput(`Nuevo email (dejar vacío para no cambiar): `);
  
    let cambios = false;
  
    if (nombre) {
      usuario.nombre = nombre;
      cambios = true;
    }
  
    if (email) {
      usuario.email = email;
      cambios = true;
    }
  
    // Cambiar el estado a activo si se completaron ambos campos
    if (nombre && email && !usuario.activo) {
      usuario.activo = true;  // Actualizamos el estado solo si ambos campos están completos
      console.log("Estado del usuario actualizado a activo.".green);
    }
  
    // Si se hicieron cambios, guardar la información
    if (cambios) {
      await fs.writeFile(archivo2, JSON.stringify({ usuarios: contenido.usuarios }, null, 2));
      console.log(`Usuario actualizado exitosamente.`.green);
    } else {
      console.log(`No se hicieron cambios en el usuario.`.yellow);
    }
  }
  

  async borrarUsuario(id) {
    try {
      const data = await fs.readFile(archivo2, "utf8");
      const contenido = JSON.parse(data);
  
      // Buscar el usuario por ID
      const usuarioIndex = contenido.usuarios.findIndex(
        (usuario) => usuario.id === id
      );
  
      if (usuarioIndex === -1) {
        console.log("Usuario no encontrado.".red);
        return;
      }
  
      // Eliminar el usuario del arreglo
      contenido.usuarios.splice(usuarioIndex, 1);
  
      // Guardar los cambios en el archivo
      await fs.writeFile(archivo2, JSON.stringify({ usuarios: contenido.usuarios }, null, 2));
  
      console.log(`Usuario con ID ${id} ha sido borrado.`.green);
    } catch (err) {
      console.error("Error al borrar el usuario:", err);
    }
  }

}

module.exports = Usuarios;
