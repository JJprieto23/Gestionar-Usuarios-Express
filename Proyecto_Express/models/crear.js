const { v4: uuidv4 } = require("uuid");

class Usuario {
  id = "";
  nombre = "";
  email = "";
  activo = false; // Representa si el usuario está activo

  constructor(nombre, email = "") {
    this.id = uuidv4();
    this.nombre = nombre;
    this.email = email || ""; // Si no hay correo, asigna un string vacío

    // Si alguno de los campos está vacío, se considera que el usuario no está activo
    if (!nombre || !email) {
      this.activo = false;
    } else {
      this.activo = true;
    }
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      activo: this.activo,
    };
  }
}

module.exports = Usuario;
