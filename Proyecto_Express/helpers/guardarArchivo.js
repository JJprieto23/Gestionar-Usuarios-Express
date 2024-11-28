const fs = require("fs");

const guardarDB = (data, data2) => {
  const archivo1 = "./db/data.txt";
  const archivo2 = "./db/data.json";
  const archivoCSV = "./db/data.csv";

  const st =
    "--------------------------------------------------------------------------------\n|                                       |                                      |\n|             Id del Usuario           |               Detalles               |\n|                                       |                                      |\n--------------------------------------------------------------------------------\n";

  const csv = [
    ["id", "nombre", "email", "activo"]
  ];

  const csvInfo = [
    [`${data2.id}`, `${data2.nombre}`, `${data2.email || "No proporcionado"}`, `${data2.activo ? 'Sí' : 'No'}`]
  ];

  const convertirACSV = (datos) => {
    return datos.map((fila) => fila.join(","));
  };

  if (
    !fs.existsSync(archivo1) ||
    !fs.existsSync(archivo2) ||
    !fs.existsSync(archivoCSV)
  ) {
    try {
      const cvsData = `${convertirACSV(csv)}\n`;
      fs.writeFileSync(archivo1, st);
      fs.writeFileSync(archivo2, JSON.stringify({ usuarios: [] }, null, 2));
      fs.writeFileSync(archivoCSV, cvsData, "utf8");
    } catch (err) {
      console.error("Error al crear el archivo:", err);
    }
  }

  fs.readFile(archivo2, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    const contenido = JSON.parse(data);

    contenido.usuarios.push(data2);  // Agregar el nuevo usuario

    fs.writeFile(archivo2, JSON.stringify(contenido, null, 2), function (err) {
      if (err) throw err;
    });
  });

  if (data) {
    fs.appendFile(archivo1, data, function (err) {
      if (err) throw err;
    });
  }

  const csvDataIn = `${convertirACSV(csvInfo)}\n`;
  fs.appendFile(archivoCSV, csvDataIn, function (err) {
    if (err) throw err;
  });
};

module.exports = guardarDB;
